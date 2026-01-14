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

CRITICAL: You MUST respond with ONLY a valid JSON array. No additional text before or after.

FORMAT REQUIREMENTS:
1. Start your response with [ and end with ]
2. Each object must have exactly two keys: "question" and "answer"
3. Use proper JSON escaping for quotes and special characters
4. Do NOT include markdown code blocks (no ```json or ```)
5. Do NOT include any explanatory text

STRUCTURE:
[
  {{
    "question": "Your question text here",
    "answer": "Your detailed answer text here"
  }},
  {{
    "question": "Second question text",
    "answer": "Second answer text"
  }}
]

Generate exactly {num_questions} questions and answers that are:
- Relevant to the given topic
- Clear and well-structured
- Educational and informative
- Progressively increasing in complexity

REMEMBER: Return ONLY the JSON array with no additional text, markdown formatting, or explanation."""

config = Config()
