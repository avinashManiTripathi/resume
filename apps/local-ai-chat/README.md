# Local AI Chat 🤖

A production-ready ChatGPT-like AI that runs **100% locally** without any third-party APIs. Built with FastAPI and Ollama using the LLaMA 3.1 model.

## ✨ Features

- 🔒 **Fully Offline** - Works completely offline after initial setup
- 💬 **ChatGPT-like Interface** - Conversational AI with context awareness
- 🔄 **Session Management** - Maintains conversation history per session
- 📡 **Streaming Responses** - Real-time response streaming via Server-Sent Events
- 🚀 **Production Ready** - Clean, modular, and well-documented code
- 🌐 **Frontend Ready** - CORS-enabled API for React/mobile frontend integration

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

1. **Python 3.10+**
   ```bash
   python --version
   ```

2. **Ollama** - Local LLM runtime
   ```bash
   # Install Ollama (macOS/Linux)
   curl -fsSL https://ollama.com/install.sh | sh
   
   # For Windows, download from: https://ollama.com/download
   ```

3. **LLaMA 3.1 Model** - Download the model
   ```bash
   ollama pull llama3.1
   ```

## 🚀 Installation

### 1. Clone or Navigate to Project Directory
```bash
cd /Users/avinashmanitripathi/Documents/projects/resume/apps/local-ai-chat
```

### 2. Create Virtual Environment
```bash
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure Environment (Optional)
```bash
# Copy example env file
cp .env.example .env

# Edit .env to customize settings if needed
```

## 🎯 Usage

### Starting the Server

Make sure Ollama is running (it starts automatically on most systems), then:

```bash
# From project root
python -m app.main
```

The API will be available at:
- **API Base**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### API Endpoints

#### 1. Standard Chat (JSON Response)

**Endpoint**: `POST /api/chat`

**Request**:
```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is the capital of France?"
  }'
```

**Response**:
```json
{
  "reply": "The capital of France is Paris.",
  "session_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Continue Conversation**:
```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What is its population?",
    "session_id": "550e8400-e29b-41d4-a716-446655440000"
  }'
```

#### 2. Streaming Chat (Server-Sent Events)

**Endpoint**: `POST /api/chat/stream`

**Request**:
```bash
curl -N -X POST http://localhost:8000/api/chat/stream \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Tell me a short story"
  }'
```

**Response** (streamed):
```
data: {"chunk": "Once"}
data: {"chunk": " upon"}
data: {"chunk": " a"}
data: {"chunk": " time"}
...
data: {"done": true, "session_id": "550e8400-..."}
```

#### 3. Health Check

**Endpoint**: `GET /api/health`

```bash
curl http://localhost:8000/api/health
```

**Response**:
```json
{
  "status": "healthy",
  "ollama_connected": true,
  "model": "llama3.1"
}
```

## 🔌 Frontend Integration

### JavaScript/React Example

```javascript
// Standard chat
async function sendMessage(message, sessionId = null) {
  const response = await fetch('http://localhost:8000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, session_id: sessionId })
  });
  
  const data = await response.json();
  return data; // { reply: "...", session_id: "..." }
}

// Streaming chat
function streamChat(message, sessionId = null) {
  const eventSource = new EventSource(
    `http://localhost:8000/api/chat/stream?message=${encodeURIComponent(message)}&session_id=${sessionId || ''}`
  );
  
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    
    if (data.done) {
      console.log('Stream complete. Session:', data.session_id);
      eventSource.close();
    } else if (data.chunk) {
      console.log('Chunk:', data.chunk);
      // Append chunk to UI
    } else if (data.error) {
      console.error('Error:', data.error);
      eventSource.close();
    }
  };
  
  return eventSource;
}
```

### React Native Example

```javascript
// Using fetch for standard chat
const chat = async (message, sessionId) => {
  try {
    const response = await fetch('http://localhost:8000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        message, 
        session_id: sessionId 
      })
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Chat error:', error);
  }
};
```

## 📁 Project Structure

```
local-ai-chat/
├── app/
│   ├── __init__.py           # Package initialization
│   ├── main.py               # FastAPI app entry point
│   ├── config.py             # Configuration management
│   ├── models/
│   │   ├── __init__.py
│   │   └── schemas.py        # Pydantic request/response models
│   ├── services/
│   │   ├── __init__.py
│   │   ├── ollama_service.py # Ollama LLM integration
│   │   └── session_manager.py # Conversation session management
│   └── api/
│       ├── __init__.py
│       └── routes.py         # API endpoints
├── requirements.txt          # Python dependencies
├── .env.example              # Environment variables template
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## 🏗️ Architecture

### Components

1. **FastAPI Application** (`main.py`)
   - CORS middleware for frontend integration
   - Global error handling
   - Startup/shutdown lifecycle management

2. **Ollama Service** (`services/ollama_service.py`)
   - Connects to local Ollama instance
   - Handles both standard and streaming responses
   - Health check functionality

3. **Session Manager** (`services/session_manager.py`)
   - Thread-safe in-memory session storage
   - Automatic cleanup of expired sessions
   - Conversation history management

4. **API Routes** (`api/routes.py`)
   - `/api/chat` - Standard JSON chat
   - `/api/chat/stream` - Streaming SSE chat
   - `/api/health` - Service health check
   - `/api/sessions/count` - Active session statistics

## ⚙️ Configuration

Edit `.env` to customize settings:

```env
# Ollama Configuration
OLLAMA_HOST=http://localhost:11434
MODEL_NAME=llama3.1

# Session Management
SESSION_TIMEOUT_MINUTES=30

# Server Configuration
HOST=0.0.0.0
PORT=8000
```

## 🐛 Troubleshooting

### Ollama Connection Failed

**Problem**: `Cannot connect to Ollama service`

**Solutions**:
1. Check if Ollama is running:
   ```bash
   ollama list
   ```

2. Start Ollama if not running:
   ```bash
   ollama serve
   ```

3. Verify model is downloaded:
   ```bash
   ollama pull llama3.1
   ```

### Model Not Found

**Problem**: `Model 'llama3.1' not found`

**Solution**:
```bash
# Download the model
ollama pull llama3.1

# Or use a different model
ollama pull llama3.2
# Then update MODEL_NAME in .env
```

### Port Already in Use

**Problem**: `Address already in use: 8000`

**Solution**:
```bash
# Change PORT in .env to a different value
PORT=8001
```

## 🚦 Testing

### Using the Interactive API Docs

1. Start the server
2. Navigate to http://localhost:8000/docs
3. Try out the endpoints directly in the browser

### Using curl

```bash
# Test health
curl http://localhost:8000/api/health

# Test chat
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello!"}'

# Test streaming
curl -N -X POST http://localhost:8000/api/chat/stream \
  -H "Content-Type: application/json" \
  -d '{"message": "Count to 10"}'
```

## 📝 Notes

- **Memory Usage**: Session data is stored in-memory. For production with many users, consider Redis or database storage.
- **Model Performance**: Response time depends on your hardware. GPU acceleration significantly improves speed.
- **Privacy**: All data stays on your machine. No external API calls are made.
- **Customization**: Modify the system prompt in `config.py` to change AI behavior.

## 🎓 Advanced Usage

### Custom System Prompt

Edit `app/config.py` to customize the AI's behavior:

```python
system_prompt: str = """Your custom system prompt here..."""
```

### Using Different Models

```bash
# List available models
ollama list

# Pull a different model
ollama pull codellama

# Update .env
MODEL_NAME=codellama
```

### Deployment

For production deployment:
1. Set `allow_origins` in CORS to specific domains
2. Use a production ASGI server (uvicorn with workers)
3. Implement rate limiting
4. Add authentication if needed
5. Use a process manager (systemd, supervisor, PM2)

## 📄 License

This project is provided as-is for educational and personal use.

## 🤝 Contributing

This is a standalone project. Feel free to modify and adapt to your needs!

---

**Happy Chatting! 🎉**
