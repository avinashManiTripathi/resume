import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    # Ollama Configuration
    OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://localhost:11434")
    OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.1")
    
    # API Configuration
    API_HOST = os.getenv("API_HOST", "0.0.0.0")
    API_PORT = int(os.getenv("API_PORT", "8000"))
    
    # Q&A Generation Configuration
    NUM_QUESTIONS = int(os.getenv("NUM_QUESTIONS", "5"))
    
    # System Prompt Template
    SYSTEM_PROMPT = """You are an expert question and answer generator. 
Given a topic or prompt, you will generate high-quality questions and their corresponding detailed answers.

Format your response as a JSON array of objects with the following structure:
[
  {{
    "question": "The question text here",
    "answer": "The detailed answer text here"
  }}
]

Generate exactly {num_questions} questions and answers that are:
- Relevant to the given topic
- Clear and well-structured
- Educational and informative
- Progressively increasing in complexity

Return ONLY the JSON array, no additional text or explanation."""

config = Config()
