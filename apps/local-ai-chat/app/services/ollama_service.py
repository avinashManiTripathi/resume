"""
Ollama integration service for local LLM inference.
Provides both standard and streaming response generation.
"""

import ollama
from typing import List, Dict, Generator
from app.config import get_settings


class OllamaService:
    """Service for interacting with Ollama LLM."""
    
    def __init__(self):
        self.settings = get_settings()
        self.client = ollama.Client(host=self.settings.ollama_host)
        self.model = self.settings.model_name
    
    def generate_response(
        self, 
        messages: List[Dict[str, str]], 
        stream: bool = False
    ) -> str | Generator[str, None, None]:
        """
        Generate a response from the LLM.
        
        Args:
            messages: List of messages in {'role': str, 'content': str} format.
            stream: Whether to stream the response.
            
        Returns:
            Complete response string (if stream=False) or generator of chunks (if stream=True).
            
        Raises:
            Exception: If Ollama service is unavailable or response generation fails.
        """
        try:
            # Add system prompt as the first message if not already present
            if not messages or messages[0].get('role') != 'system':
                messages = [
                    {"role": "system", "content": self.settings.system_prompt},
                    *messages
                ]
            
            response = self.client.chat(
                model=self.model,
                messages=messages,
                stream=stream
            )
            
            if stream:
                # Return generator for streaming
                return self._stream_response(response)
            else:
                # Return complete response
                return response['message']['content']
                
        except ollama.ResponseError as e:
            raise Exception(f"Ollama response error: {str(e)}")
        except Exception as e:
            raise Exception(f"Failed to generate response: {str(e)}")
    
    def _stream_response(self, response) -> Generator[str, None, None]:
        """
        Stream response chunks from Ollama.
        
        Args:
            response: Streaming response from Ollama client.
            
        Yields:
            Response chunks as they become available.
        """
        try:
            for chunk in response:
                if 'message' in chunk and 'content' in chunk['message']:
                    yield chunk['message']['content']
        except Exception as e:
            raise Exception(f"Streaming error: {str(e)}")
    
    def check_health(self) -> bool:
        """
        Check if Ollama service is accessible.
        
        Returns:
            True if service is healthy, False otherwise.
        """
        try:
            # Try to list available models as a health check
            self.client.list()
            return True
        except Exception:
            return False
    
    def get_model_info(self) -> Dict:
        """
        Get information about the active model.
        
        Returns:
            Model information dictionary.
        """
        try:
            models = self.client.list()
            active_model = next(
                (m for m in models.get('models', []) if m['name'].startswith(self.model)),
                None
            )
            return active_model or {"name": self.model, "status": "unknown"}
        except Exception as e:
            return {"name": self.model, "error": str(e)}


# Global Ollama service instance
ollama_service = OllamaService()
