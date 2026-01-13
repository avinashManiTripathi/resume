# AI Interview API

A FastAPI-based service that provides AI-powered interview question generation and answer evaluation using Ollama with Llama 3.1.

## Features

- 🤖 AI-powered interview question generation (20-25 questions per interview)
- ✅ Batch answer evaluation
- 📝 Job description analysis
- 🎯 Final interview report generation
- 🔄 Async processing with streaming support
- 🚀 Fast response times with local AI

---

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Python 3.8+**
   ```bash
   python3 --version  # Should show 3.8 or higher
   ```

2. **Ollama** - Local AI runtime
   - **macOS**: 
     ```bash
     brew install ollama
     ```
   - **Linux**:
     ```bash
     curl -fsSL https://ollama.com/install.sh | sh
     ```
   - **Windows**: Download from [ollama.com](https://ollama.com)

3. **Llama 3.1 Model**
   ```bash
   # After installing Ollama, download the model (this may take a few minutes)
   ollama pull llama3.1
   ```

---

## Installation & Setup

### Step 1: Navigate to Project Directory
```bash
cd ai-api
```

### Step 2: Create Python Virtual Environment
```bash
python3 -m venv venv
```

### Step 3: Activate Virtual Environment

**macOS/Linux:**
```bash
source venv/bin/activate
```

**Windows:**
```bash
venv\Scripts\activate
```

You should see `(venv)` in your terminal prompt.

### Step 4: Install Dependencies
```bash
pip install -r requirements.txt
```

This installs:
- FastAPI (web framework)
- Uvicorn (ASGI server)
- Ollama client
- Pydantic (data validation)
- python-dotenv (environment management)

### Step 5: Configure Environment (Optional)
```bash
# Copy example config
cp .env.example .env

# Edit if needed (defaults work fine)
nano .env
```

**Default Configuration** (`.env` file):
```env
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3.1
API_HOST=0.0.0.0
API_PORT=8000
NUM_QUESTIONS=1
```

---

## Starting the API Server

### Quick Start (Recommended)
```bash
# 1. Make sure Ollama is running (in separate terminal)
ollama serve

# 2. Activate virtual environment
source venv/bin/activate  # or venv\Scripts\activate on Windows

# 3. Start the API server
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

**Expected Output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [xxxxx]
INFO:     Started server process [xxxxx]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

🎉 **API is now running at `http://localhost:8000`**

### Alternative: Production Mode
```bash
# Without auto-reload (for production)
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Alternative: Custom Port
```bash
# Run on a different port
uvicorn main:app --host 0.0.0.0 --port 8080 --reload
```

---

## Verification & Testing

### 1. Check API Health
```bash
curl http://localhost:8000/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "ollama_connected": true,
  "ollama_host": "http://localhost:11434",
  "model": "llama3.1"
}
```

✅ If you see `"ollama_connected": true`, everything is working!

### 2. Test Question Generation
```bash
curl -X POST http://localhost:8000/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Senior React Developer with Node.js and MongoDB experience",
    "num_questions": 3
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "qa_pairs": [
    {
      "question": "Q1: Tell me about your experience with React...",
      "answer": "A1: React is a JavaScript library..."
    }
  ],
  "model": "llama3.1",
  "timestamp": "2024-01-14T02:00:00.000Z"
}
```

### 3. Interactive API Documentation
Open in your browser:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

---

## API Endpoints

### `GET /health`
Check API and Ollama connection status.

**Response:**
```json
{
  "status": "healthy",
  "ollama_connected": true,
  "ollama_host": "http://localhost:11434",
  "model": "llama3.1"
}
```

---

### `POST /generate`
Generate interview questions and answers.

**Request Body:**
```json
{
  "prompt": "Job description or topic",
  "num_questions": 5
}
```

**Parameters:**
- `prompt` (string, required): Job description or topic
- `num_questions` (integer, optional): Number of Q&A pairs (default: 1)

**Response:**
```json
{
  "success": true,
  "qa_pairs": [
    {
      "question": "Question text here",
      "answer": "Detailed answer here"
    }
  ],
  "model": "llama3.1",
  "timestamp": "2024-01-14T..."
}
```

---

## Troubleshooting

### ❌ Issue: "Connection refused" or "Ollama not available"

**Symptoms:**
- `"ollama_connected": false` in health check
- Connection errors in API logs

**Solutions:**

1. **Start Ollama service:**
   ```bash
   ollama serve
   ```

2. **Verify Ollama is running:**
   ```bash
   curl http://localhost:11434/api/tags
   ```

3. **Check if port 11434 is in use:**
   ```bash
   lsof -i :11434  # macOS/Linux
   netstat -ano | findstr :11434  # Windows
   ```

---

### ❌ Issue: "Model not found" or Model Errors

**Solution:**
```bash
# Pull Llama 3.1 model
ollama pull llama3.1

# Verify it's installed
ollama list
# Should show: llama3.1
```

---

### ❌ Issue: Slow Response Times

**Causes:**
- First request is always slower (model loading into memory)
- Large `num_questions` value
- Insufficient system resources

**Solutions:**
- **First request**: Wait 10-30 seconds for model to load
- **Reduce questions**: Use smaller `num_questions` values
- **System resources**: Ensure 8GB+ RAM available
- **Close apps**: Free up system memory

**Performance Tips:**
- First request: ~15-30 seconds (model loading)
- Subsequent requests: ~5-10 seconds per question
- Optimal: `num_questions` between 1-5

---

### ❌ Issue: Port 8000 Already in Use

**Solution 1: Use Different Port**
```bash
uvicorn main:app --host 0.0.0.0 --port 8080 --reload
```

**Solution 2: Kill Process**

**macOS/Linux:**
```bash
lsof -ti:8000 | xargs kill -9
```

**Windows:**
```bash
netstat -ano | findstr :8000
# Note the PID, then:
taskkill /PID <PID> /F
```

---

### ❌ Issue: JSON Parsing Errors

**Symptoms:**
- "Invalid control character" errors
- JSON decode errors

**Solution:**
- Already handled in code with `strict=False` JSON parsing
- If persists, check Ollama logs: `ollama logs`
- Try re-pulling the model: `ollama pull llama3.1`

---

## Development

### Project Structure
```
ai-api/
├── main.py                 # FastAPI application entry point
├── config.py              # Configuration settings
├── requirements.txt       # Python dependencies
├── .env                   # Environment variables (create from .env.example)
├── .env.example           # Example environment config
├── .gitignore            # Git ignore rules
├── services/
│   ├── __init__.py       # Package init
│   └── ollama_service.py # Ollama AI integration
└── README.md             # This file
```

### Running in Development
The `--reload` flag automatically restarts on code changes:
```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### Testing
```bash
# Run debug test script
python test_debug.py
```

---

## Configuration Options

Edit `.env` to customize:

| Variable | Description | Default |
|----------|-------------|---------|
| `OLLAMA_HOST` | Ollama server URL | `http://localhost:11434` |
| `OLLAMA_MODEL` | AI model to use | `llama3.1` |
| `API_HOST` | API bind address | `0.0.0.0` |
| `API_PORT` | API port number | `8000` |
| `NUM_QUESTIONS` | Default Q&A count | `1` |

---

## Integration with Interview System

This API is designed to work with the main interview application at `/apps/api`:

1. **Interview app** calls this API for question generation
2. **Batch processing** generates 20-25 questions at once
3. **Answer evaluation** processes all answers together
4. **Fallback support** to Google Gemini if Ollama unavailable

See `/apps/api/OLLAMA_SETUP.md` for integration details.

---

## Performance Benchmarks

**Hardware**: MacBook Pro M1, 16GB RAM

| Operation | Time | Notes |
|-----------|------|-------|
| First request | 15-30s | Model loading |
| Generate 1 Q&A | 5-8s | Cached model |
| Generate 5 Q&As | 15-25s | Cached model |
| Generate 20 Q&As | 45-60s | Batch mode |
| Health check | <100ms | No AI call |

---

## Common Use Cases

### 1. Interview Question Generation
```bash
curl -X POST http://localhost:8000/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Full Stack Developer with React, Node.js, PostgreSQL",
    "num_questions": 1
  }'
```

### 2. Batch Question Set
```bash
curl -X POST http://localhost:8000/generate \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Python Data Scientist with ML experience",
    "num_questions": 1
  }'
```

### 3. Health Monitoring
```bash
# Check if service is ready
curl http://localhost:8000/health | jq '.ollama_connected'
```

---

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Verify Ollama is running: `ollama list`
3. Check API logs in terminal
4. Review Ollama logs: `ollama logs`

---

## License

MIT License

---

## Quick Reference

**Start everything:**
```bash
# Terminal 1: Start Ollama
ollama serve

# Terminal 2: Start API
cd ai-api
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

**Test it works:**
```bash
curl http://localhost:8000/health
```

**Stop everything:**
- Press `Ctrl+C` in each terminal
- Or: `pkill -f uvicorn` and `pkill -f ollama`

---

**🎉 You're all set! The AI Interview API is ready to use.**
