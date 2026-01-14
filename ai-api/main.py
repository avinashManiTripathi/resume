from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Dict, Optional
from services.ollama_service import OllamaService
from config import config

# Initialize FastAPI app
app = FastAPI(
    title="AI Q&A Generator API",
    description="Generate questions and answers using Ollama with Llama 3.1",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Modify this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Ollama service
ollama_service = OllamaService()


# Request/Response Models
class GenerateRequest(BaseModel):
    prompt: str = Field(..., description="The topic or prompt for Q&A generation", min_length=1)
    num_questions: Optional[int] = Field(None, description="Number of Q&A pairs to generate (default: 5)", ge=1, le=20)
    
    class Config:
        json_schema_extra = {
            "example": {
                "prompt": "Python programming",
                "num_questions": 5
            }
        }


class QAPair(BaseModel):
    question: str
    answer: str


class GenerateResponse(BaseModel):
    success: bool
    prompt: str
    qa_pairs: List[QAPair]
    count: int
    
    class Config:
        json_schema_extra = {
            "example": {
                "success": True,
                "prompt": "Python programming",
                "qa_pairs": [
                    {
                        "question": "What is Python?",
                        "answer": "Python is a high-level, interpreted programming language..."
                    }
                ],
                "count": 1
            }
        }


class HealthResponse(BaseModel):
    status: str
    ollama_connected: bool
    model: str


# API Endpoints
@app.get("/", tags=["Root"])
async def root():
    """Root endpoint with API information."""
    return {
        "message": "AI Q&A Generator API",
        "version": "1.0.0",
        "docs": "/docs",
        "endpoints": {
            "generate": "/generate",
            "health": "/health"
        }
    }


@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """Check API and Ollama service health."""
    ollama_connected = ollama_service.check_connection()
    
    return HealthResponse(
        status="healthy" if ollama_connected else "degraded",
        ollama_connected=ollama_connected,
        model=config.OLLAMA_MODEL
    )


@app.post("/generate", response_model=GenerateResponse, tags=["Generation"])
async def generate_qa(request: GenerateRequest):
    """
    Generate questions and answers based on the provided prompt.
    
    - **prompt**: The topic or subject for Q&A generation
    - **num_questions**: Optional number of Q&A pairs to generate (1-20, default: 5)
    """
    try:
        # Generate Q&A pairs
        qa_pairs = ollama_service.generate_qa(
            prompt=request.prompt,
            num_questions=request.num_questions
        )
        
        return GenerateResponse(
            success=True,
            prompt=request.prompt,
            qa_pairs=[QAPair(**pair) for pair in qa_pairs],
            count=len(qa_pairs)
        )
        
    except Exception as e:
        # Log the full error for debugging
        import traceback
        print(f"❌ Error generating Q&A: {str(e)}")
        print(f"📋 Traceback:\n{traceback.format_exc()}")
        
        raise HTTPException(
            status_code=500,
            detail=f"Failed to generate Q&A: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=config.API_HOST,
        port=config.API_PORT,
        reload=True
    )
