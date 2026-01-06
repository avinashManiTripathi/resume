#!/bin/bash

# Quick Start Script for Local AI Chat
# This script sets up and runs the local AI chat server

echo "🚀 Local AI Chat - Quick Start"
echo "================================"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.10 or higher."
    exit 1
fi

echo "✅ Python $(python3 --version) detected"

# Check if Ollama is installed
if ! command -v ollama &> /dev/null; then
    echo "❌ Ollama is not installed."
    echo ""
    # Detect OS and provide appropriate instructions
    if [[ "$OSTYPE" == "darwin"* ]]; then
        echo "   For macOS, install Ollama using one of these methods:"
        echo "   1. Download from: https://ollama.com/download"
        echo "   2. Or use Homebrew: brew install ollama"
    else
        echo "   For Linux, install with: curl -fsSL https://ollama.com/install.sh | sh"
    fi
    echo ""
    exit 1
fi

echo "✅ Ollama detected"

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
    echo "✅ Virtual environment created"
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "📥 Installing dependencies..."
pip install -q --upgrade pip
pip install -q -r requirements.txt
echo "✅ Dependencies installed"

# Check if model is available
echo "🔍 Checking for LLaMA 3.1 model..."
if ! ollama list | grep -q "llama3.1"; then
    echo "⚠️  LLaMA 3.1 model not found."
    echo "📥 Downloading model (this may take a few minutes)..."
    ollama pull llama3.1
    echo "✅ Model downloaded"
else
    echo "✅ LLaMA 3.1 model found"
fi

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created"
fi

echo ""
echo "================================"
echo "🎉 Setup complete!"
echo "================================"
echo ""
echo "Starting server..."
echo ""

# Start the server
python -m app.main
