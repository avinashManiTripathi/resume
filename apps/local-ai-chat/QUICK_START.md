# 🚀 Quick Start Guide - Local AI Chat

Get your local AI chat running in **5 minutes**!

## 📦 What You Need

1. **Python 3.10+** installed on your Mac
2. **Ollama** installed
3. Internet connection (only for initial setup)

---

## ⚡ Super Quick Setup (One-Command)

```bash
cd /Users/avinashmanitripathi/Documents/projects/resume/apps/local-ai-chat
./start.sh
```

The script will automatically:
- ✅ Install Ollama (if not installed)
- ✅ Create Python virtual environment
- ✅ Install all dependencies
- ✅ Download LLaMA 3.1 model
- ✅ Start the server

**That's it!** Your AI is running at `http://localhost:8000`

---

## 🔧 Manual Setup (Step-by-Step)

If you prefer to set things up manually:

### Step 1: Install Ollama (macOS)

```bash
# Download from website
open https://ollama.com/download

# OR use Homebrew
brew install ollama
```

### Step 2: Download the AI Model

```bash
ollama pull llama3.1
```

This downloads ~4.7GB. Takes 2-5 minutes depending on your connection.

### Step 3: Navigate to Project

```bash
cd /Users/avinashmanitripathi/Documents/projects/resume/apps/local-ai-chat
```

### Step 4: Create Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate
```

### Step 5: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 6: Start the Server

```bash
python -m app.main
```

You should see:
```
🚀 Local AI Chat API Starting...
✅ Ollama service connected successfully
INFO: Application startup complete.
```

---

## 🧪 Test It Works

### Option 1: Web Browser

Open http://localhost:8000/docs

Click "Try it out" on the `/api/chat` endpoint!

### Option 2: Command Line

```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello! Can you introduce yourself?"}'
```

You should get a response like:
```json
{
  "reply": "I'm an AI assistant running locally on your machine...",
  "session_id": "..."
}
```

---

## 📊 What's Running?

After successful setup, you have:

1. **Ollama Server** (port 11434)
   - The LLM runtime engine
   - Runs in the background

2. **FastAPI Server** (port 8000)
   - Your chat API
   - Provides `/api/chat` endpoint

---

## 🔄 Daily Usage

### Starting the Server

Every time you want to use the AI:

```bash
cd /Users/avinashmanitripathi/Documents/projects/resume/apps/local-ai-chat
source venv/bin/activate
python -m app.main
```

Or use the quick start script:

```bash
cd /Users/avinashmanitripathi/Documents/projects/resume/apps/local-ai-chat
./start.sh
```

### Stopping the Server

Press `Ctrl+C` in the terminal where it's running.

---

## ❓ Common Issues

### "Ollama not found"

**Solution:**
```bash
# On macOS - Install Ollama
brew install ollama
# OR
open https://ollama.com/download
```

### "Model not found"

**Solution:**
```bash
ollama pull llama3.1
```

### "Port 8000 already in use"

**Solution:**
```bash
# Edit .env and change port
echo "PORT=8001" >> .env
```

### "Cannot connect to Ollama"

**Solution:**
```bash
# Check if Ollama is running
ollama list

# If not, start it manually
ollama serve
```

---

## 🎯 Integration with Resume App

This local AI is already integrated with your resume application!

The following APIs now use your local AI:
- Resume parsing (`/api/resume/extract`)
- ATS score analysis (`/api/ats/analyze`)
- Resume tailoring

**Make sure this server is running when using those features!**

---

## 📚 More Information

For detailed documentation, see:
- [Full README](README.md)
- [API Documentation](http://localhost:8000/docs) (when server is running)
- [Migration Guide](../../.gemini/antigravity/brain/4d3cb93b-ec3a-42cb-b33c-a07cf2fcc5d7/walkthrough.md)

---

## 🆘 Need Help?

1. **Check if Ollama is running:** `ollama list`
2. **Check if model is downloaded:** `ollama list` (should show llama3.1)
3. **View server logs:** Look at the terminal where you ran `python -m app.main`
4. **Test API:** Visit http://localhost:8000/docs

---

**💡 Pro Tip:** Keep this terminal open while using your resume application for seamless AI features!
