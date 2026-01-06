"""
Configuration management for the Local AI Chat application.
Uses environment variables with sensible defaults.
"""

from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""
    
    # Ollama Configuration
    ollama_host: str = "http://localhost:11434"
    model_name: str = "llama3.1"
    
    # Session Management
    session_timeout_minutes: int = 30
    
    # Server Configuration
    host: str = "0.0.0.0"
    port: int = 8000
    
    # System Prompt for ChatGPT-like behavior
    system_prompt: str = """You are a helpful, intelligent, and friendly AI assistant. 
You provide accurate, thoughtful, and detailed responses to user queries. 
You are conversational and can maintain context throughout the conversation.
You acknowledge when you don't know something rather than making up information.
You are respectful, professional, and aim to be as helpful as possible."""
    
    class Config:
        env_file = ".env"
        case_sensitive = False


@lru_cache()
def get_settings() -> Settings:
    """
    Get cached settings instance.
    Using lru_cache ensures only one Settings instance is created.
    """
    return Settings()
