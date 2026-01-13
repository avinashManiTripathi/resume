# Ollama AI Integration - Setup Instructions

## Quick Setup

Your interview system now uses **Ollama AI** as the primary AI provider with Google Gemini as fallback!

### 1. Add Environment Variables

Add these variables to `/Users/avinashmanitripathi/Documents/projects/resume/apps/api/.env`:

```bash
# AI Configuration
USE_OLLAMA=true
OLLAMA_API_URL=http://localhost:8000
```

Your existing `GENAI_API_KEY` will continue to work as a fallback.

### 2. Ensure Services are Running

Make sure both services are running:

**Ollama AI API:**
```bash
cd /Users/avinashmanitripathi/Documents/projects/resume/ai-api
source venv/bin/activate
uvicorn main:app --host 0.0.0.0 --port 8000
```

**Interview API:**
```bash
cd /Users/avinashmanitripathi/Documents/projects/resume
npm start
```

### 3. How It Works

The system now follows this flow:

1. **Primary**: Tries Ollama AI first (Llama 3.1)
   - Health check → Generate/Evaluate → Return result
   
2. **Fallback**: If Ollama fails, uses Google Gemini
   - Ensures interview never fails even if Ollama is down

3. **Logging**: Console shows which AI is being used:
   - 🤖 = Attempting with Ollama
   - ✅ = Successfully used Ollama
   - ⚠️ = Ollama unavailable, falling back
   - 🔄 = Using Gemini as fallback

### 4. Testing

Start an interview and watch the console logs to see Ollama in action!

**Example Test:**
```bash
curl -X POST http://localhost:4000/api/interview/start \
  -H "Content-Type: application/json" \
  -d '{
    "jobDescription": "Senior Python Developer with FastAPI and AI experience",
    "userId": "guest"
  }'
```

You should see:
```
🤖 Attempting JD analysis with Ollama AI...
✅ JD analyzed successfully with Ollama
🤖 Generating intro question with Ollama AI...
✅ Question generated successfully with Ollama
```

### 5. Switching Providers

To temporarily disable Ollama and use only Gemini:
```bash
USE_OLLAMA=false
```

To re-enable:
```bash
USE_OLLAMA=true
```

## What Changed

- **New File**: `apps/api/src/services/ollama-ai.service.ts` - Ollama AI integration
- **Updated**: `apps/api/src/services/interview.service.ts` - Dual-provider support
- **Installed**: `axios` package for HTTP requests
- **Config**: `.env.example` updated with AI settings

## Next Steps

Once you've added the environment variables and restarted the API, your interview system will use Ollama AI powered by Llama 3.1! 🎉
