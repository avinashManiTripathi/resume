import json
from typing import List, Dict
import ollama
from config import config


class OllamaService:
    """Service for interacting with Ollama to generate Q&A pairs."""
    
    def __init__(self):
        self.client = ollama.Client(host=config.OLLAMA_HOST)
        self.model = config.OLLAMA_MODEL
    
    def generate_qa(self, prompt: str, num_questions: int = None) -> List[Dict[str, str]]:
        """
        Generate questions and answers based on the given prompt.
        
        Args:
            prompt: The topic or subject for Q&A generation
            num_questions: Number of Q&A pairs to generate (default from config)
            
        Returns:
            List of dictionaries containing 'question' and 'answer' keys
            
        Raises:
            Exception: If Ollama communication fails or response parsing fails
        """
        if num_questions is None:
            num_questions = config.NUM_QUESTIONS
        
        # Format the system prompt with the number of questions
        system_prompt = config.SYSTEM_PROMPT.format(num_questions=num_questions)
        
        # Create the user message
        user_message = f"Topic: {prompt}\n\nGenerate {num_questions} questions and answers about this topic."
        
        try:
            # Call Ollama API
            response = self.client.chat(
                model=self.model,
                messages=[
                    {
                        "role": "system",
                        "content": system_prompt
                    },
                    {
                        "role": "user",
                        "content": user_message
                    }
                ]
            )
            
            # Extract the response content
            content = response['message']['content']
            
            # Parse JSON response
            qa_pairs = self._parse_response(content)
            
            return qa_pairs
            
        except Exception as e:
            raise Exception(f"Failed to generate Q&A: {str(e)}")
    
    def _parse_response(self, content: str) -> List[Dict[str, str]]:
        """
        Parse the JSON response from Ollama.
        
        Args:
            content: Raw response content from Ollama
            
        Returns:
            List of Q&A dictionaries
            
        Raises:
            ValueError: If JSON parsing fails
        """
        try:
            # Clean the content - remove markdown code blocks if present
            cleaned_content = content.strip()
            
            # Remove markdown code blocks (```json ... ``` or ``` ... ```)
            if cleaned_content.startswith('```'):
                # Find the first newline after ```
                first_newline = cleaned_content.find('\n')
                # Find the closing ```
                last_backticks = cleaned_content.rfind('```')
                if first_newline != -1 and last_backticks > first_newline:
                    cleaned_content = cleaned_content[first_newline+1:last_backticks].strip()
            
            # Try to find JSON array in the response
            start_idx = cleaned_content.find('[')
            end_idx = cleaned_content.rfind(']') + 1
            
            if start_idx == -1 or end_idx == 0:
                raise ValueError(f"No JSON array found in response. Content: {content[:200]}")
            
            json_str = cleaned_content[start_idx:end_idx]
            
            # Try parsing with strict=False to handle control characters
            try:
                qa_pairs = json.loads(json_str, strict=False)
            except json.JSONDecodeError:
                # If that fails, try to fix common issues
                # Replace literal newlines within quoted strings with escaped newlines
                import re
                # This regex finds content within double quotes and replaces newlines
                def fix_string(match):
                    return match.group(0).replace('\n', '\\n').replace('\r', '\\r').replace('\t', '\\t')
                
                # Find all quoted strings and fix control characters in them
                fixed_json = re.sub(r'"[^"]*"', fix_string, json_str)
                qa_pairs = json.loads(fixed_json, strict=False)
            
            # Validate the structure
            if not isinstance(qa_pairs, list):
                raise ValueError("Response is not a list")
            
            for item in qa_pairs:
                if not isinstance(item, dict) or 'question' not in item or 'answer' not in item:
                    raise ValueError("Invalid Q&A pair structure")
            
            return qa_pairs
            
        except json.JSONDecodeError as e:
            # Log the error with full content for debugging
            print(f"❌ JSON Parse Error: {str(e)}")
            print(f"📄 Full Response Content:\n{content}")
            raise ValueError(f"Failed to parse JSON response: {str(e)}. Content preview: {content[:500]}")

    
    def check_connection(self) -> bool:
        """
        Check if Ollama is accessible and the model is available.
        
        Returns:
            True if connection is successful, False otherwise
        """
        try:
            # List available models
            response = self.client.list()
            
            # The newer ollama client (0.6+) returns pydantic models
            # response.models is a list of Model objects
            if hasattr(response, 'models'):
                model_list = response.models
            elif isinstance(response, dict) and 'models' in response:
                model_list = response['models']
            else:
                model_list = response
            
            # Extract model names
            model_names = []
            for model in model_list:
                if hasattr(model, 'model'):
                    # Pydantic Model object
                    model_names.append(model.model)
                elif isinstance(model, dict):
                    # Dictionary format
                    name = model.get('name') or model.get('model') or ''
                    model_names.append(name)
            
            # Check for exact match or partial match (e.g., "llama3.1:latest")
            for model_name in model_names:
                if self.model in model_name or model_name.startswith(self.model):
                    return True
            
            # If no match found but we got a response, Ollama is at least running
            return False
            
        except Exception as e:
            print(f"Error checking Ollama connection: {str(e)}")
            return False
