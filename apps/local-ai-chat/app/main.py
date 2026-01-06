"""
Main FastAPI application entry point.
Configures CORS, error handling, and routes.
"""

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from app.api.routes import router
from app.config import get_settings
import uvicorn

# Initialize settings
settings = get_settings()

# Create FastAPI app
app = FastAPI(
    title="Local AI Chat",
    description="A ChatGPT-like AI that runs 100% locally using Ollama and LLaMA 3.1",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Global exception handler
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Handle uncaught exceptions gracefully."""
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "detail": str(exc)
        }
    )


# Include API routes
app.include_router(router, prefix="/api", tags=["chat"])


@app.get("/", tags=["root"])
async def root():
    """Root endpoint with API information."""
    return {
        "name": "Local AI Chat API",
        "version": "1.0.0",
        "description": "ChatGPT-like AI running locally with Ollama",
        "endpoints": {
            "chat": "/api/chat",
            "stream": "/api/chat/stream",
            "health": "/api/health",
            "docs": "/docs"
        }
    }


@app.on_event("startup")
async def startup_event():
    """Run on application startup."""
    print("=" * 60)
    print("🚀 Local AI Chat API Starting...")
    print(f"📝 Model: {settings.model_name}")
    print(f"🔌 Ollama Host: {settings.ollama_host}")
    print(f"🌐 Server: http://{settings.host}:{settings.port}")
    print(f"📚 API Docs: http://{settings.host}:{settings.port}/docs")
    print("=" * 60)
    
    # Check Ollama connection
    from app.services.ollama_service import ollama_service
    if ollama_service.check_health():
        print("✅ Ollama service connected successfully")
    else:
        print("⚠️  WARNING: Cannot connect to Ollama service")
        print(f"   Make sure Ollama is running at {settings.ollama_host}")
        print(f"   And model '{settings.model_name}' is available")


@app.on_event("shutdown")
async def shutdown_event():
    """Run on application shutdown."""
    print("\n👋 Local AI Chat API shutting down...")


if __name__ == "__main__":
    # Run the application
    uvicorn.run(
        "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=True,  # Enable auto-reload during development
        log_level="info"
    )
