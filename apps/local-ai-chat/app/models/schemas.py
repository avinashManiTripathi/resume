"""
Pydantic models for request/response validation.
Defines the API contract for the chat endpoints.
"""

from pydantic import BaseModel, Field
from typing import Optional
from uuid import uuid4


class ChatRequest(BaseModel):
    """Request model for chat endpoints."""
    
    message: str = Field(
        ..., 
        min_length=1,
        description="User message input",
        example="What is the capital of France?"
    )
    session_id: Optional[str] = Field(
        default=None,
        description="Session ID for conversation continuity. Auto-generated if not provided.",
        example="550e8400-e29b-41d4-a716-446655440000"
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "message": "What is the capital of France?",
                "session_id": "550e8400-e29b-41d4-a716-446655440000"
            }
        }


class ChatResponse(BaseModel):
    """Response model for standard chat endpoint."""
    
    reply: str = Field(
        ...,
        description="AI-generated response",
        example="The capital of France is Paris."
    )
    session_id: str = Field(
        ...,
        description="Session ID for this conversation",
        example="550e8400-e29b-41d4-a716-446655440000"
    )
    
    class Config:
        json_schema_extra = {
            "example": {
                "reply": "The capital of France is Paris.",
                "session_id": "550e8400-e29b-41d4-a716-446655440000"
            }
        }


class ErrorResponse(BaseModel):
    """Error response model."""
    
    error: str = Field(
        ...,
        description="Error message",
        example="Failed to connect to Ollama service"
    )
    detail: Optional[str] = Field(
        default=None,
        description="Additional error details"
    )


class HealthResponse(BaseModel):
    """Health check response model."""
    
    status: str = Field(
        default="healthy",
        description="Service status"
    )
    ollama_connected: bool = Field(
        ...,
        description="Whether Ollama service is accessible"
    )
    model: str = Field(
        ...,
        description="Active LLM model name"
    )
