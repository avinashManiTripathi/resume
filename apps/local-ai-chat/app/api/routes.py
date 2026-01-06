"""
API routes for chat endpoints.
Provides both standard JSON and streaming (SSE) chat interfaces.
"""

from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from app.models.schemas import ChatRequest, ChatResponse, HealthResponse, ErrorResponse
from app.services.ollama_service import ollama_service
from app.services.session_manager import session_manager
from app.config import get_settings
import json

router = APIRouter()


@router.post(
    "/chat",
    response_model=ChatResponse,
    responses={
        500: {"model": ErrorResponse, "description": "Internal server error"}
    },
    summary="Standard chat endpoint",
    description="Send a message and receive a complete AI response in JSON format"
)
async def chat(request: ChatRequest) -> ChatResponse:
    """
    Process a chat message and return the AI's response.
    
    This endpoint maintains conversation context using session IDs.
    If no session_id is provided, a new session will be created.
    
    Args:
        request: ChatRequest containing the user message and optional session_id
        
    Returns:
        ChatResponse with the AI's reply and session_id
        
    Raises:
        HTTPException: If there's an error generating the response
    """
    try:
        # Create or retrieve session
        session_id = session_manager.create_session(request.session_id)
        
        # Add user message to session history
        session_manager.add_message(session_id, "user", request.message)
        
        # Get conversation history
        messages = session_manager.get_conversation_history(session_id)
        
        # Generate response from Ollama
        ai_response = ollama_service.generate_response(messages, stream=False)
        
        # Add AI response to session history
        session_manager.add_message(session_id, "assistant", ai_response)
        
        # Cleanup expired sessions periodically
        session_manager.cleanup_expired_sessions()
        
        return ChatResponse(reply=ai_response, session_id=session_id)
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate response: {str(e)}"
        )


@router.post(
    "/chat/stream",
    summary="Streaming chat endpoint",
    description="Send a message and receive AI response as Server-Sent Events (SSE) stream"
)
async def chat_stream(request: ChatRequest):
    """
    Process a chat message and stream the AI's response in real-time.
    
    This endpoint uses Server-Sent Events (SSE) to stream the response as it's generated.
    Each chunk is sent as a JSON object with the format: {"chunk": "text"}
    The final event is {"done": true}
    
    Args:
        request: ChatRequest containing the user message and optional session_id
        
    Returns:
        StreamingResponse with text/event-stream content type
        
    Raises:
        HTTPException: If there's an error generating the response
    """
    try:
        # Create or retrieve session
        session_id = session_manager.create_session(request.session_id)
        
        # Add user message to session history
        session_manager.add_message(session_id, "user", request.message)
        
        # Get conversation history
        messages = session_manager.get_conversation_history(session_id)
        
        # Generator function for streaming
        async def event_generator():
            try:
                full_response = ""
                
                # Get streaming response from Ollama
                stream = ollama_service.generate_response(messages, stream=True)
                
                # Stream each chunk
                for chunk in stream:
                    full_response += chunk
                    # Send chunk as SSE event
                    yield f"data: {json.dumps({'chunk': chunk})}\n\n"
                
                # Add complete response to session history
                session_manager.add_message(session_id, "assistant", full_response)
                
                # Send completion event with session_id
                yield f"data: {json.dumps({'done': True, 'session_id': session_id})}\n\n"
                
                # Cleanup expired sessions
                session_manager.cleanup_expired_sessions()
                
            except Exception as e:
                # Send error event
                yield f"data: {json.dumps({'error': str(e)})}\n\n"
        
        return StreamingResponse(
            event_generator(),
            media_type="text/event-stream",
            headers={
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "X-Accel-Buffering": "no"  # Disable buffering for nginx
            }
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to start streaming: {str(e)}"
        )


@router.get(
    "/health",
    response_model=HealthResponse,
    summary="Health check endpoint",
    description="Check if the service and Ollama are running properly"
)
async def health_check() -> HealthResponse:
    """
    Check the health status of the service.
    
    Returns:
        HealthResponse with service status and Ollama connection state
    """
    settings = get_settings()
    ollama_connected = ollama_service.check_health()
    
    return HealthResponse(
        status="healthy" if ollama_connected else "degraded",
        ollama_connected=ollama_connected,
        model=settings.model_name
    )


@router.get(
    "/sessions/count",
    summary="Get active session count",
    description="Get the number of active conversation sessions"
)
async def get_session_count():
    """
    Get statistics about active sessions.
    
    Returns:
        Dictionary with active session count
    """
    return {
        "active_sessions": session_manager.get_active_session_count()
    }
