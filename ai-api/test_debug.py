#!/usr/bin/env python3
"""
Test script to debug Ollama Q&A generation with full traceback
"""
import sys
import traceback
sys.path.insert(0, '/Users/avinashmanitripathi/Documents/projects/resume/ai-api')

from services.ollama_service import OllamaService

def test_generation():
    service = OllamaService()
    
    print("Testing Ollama connection...")
    connected = service.check_connection()
    print(f"Connected: {connected}\n")
    
    if not connected:
        print("Ollama is not connected or llama3.1 model is not available")
        return
    
    print("Generating Q&A...")
    try:
        qa_pairs = service.generate_qa("Python programming", num_questions=2)
        print(f"\nSuccess! Generated {len(qa_pairs)} Q&A pairs:\n")
        
        for i, qa in enumerate(qa_pairs, 1):
            print(f"Q{i}: {qa['question']}")
            print(f"A{i}: {qa['answer']}\n")
            
    except Exception as e:
        print(f"\nFull error traceback:")
        print("="*60)
        traceback.print_exc()
        print("="*60)

if __name__ == "__main__":
    test_generation()
