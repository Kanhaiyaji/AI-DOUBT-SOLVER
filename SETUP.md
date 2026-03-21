# Setup Guide - AI Doubt Solver (COMPLETELY FREE)

## Requirements

### 1. Install Ollama (Free Local AI)
- Download: https://ollama.ai
- Install and run it
- Download a model (Mistral is fastest):
  ```
  ollama run mistral
  ```
  Or use LLaMA 2:
  ```
  ollama run llama2
  ```

### 2. Node.js (if not installed)
- Download from: https://nodejs.org/

## Setup Steps

### Step 1: Install Dependencies

**Server:**
```bash
cd server
npm install
```

**Client:**
```bash
cd client
npm install
```

### Step 2: Start Ollama Model
Before starting the app, make sure Ollama is running with a model:
```bash
ollama run mistral
```
(Keep this terminal open)

### Step 3: Start Server
In a new terminal:
```bash
cd server
npm start
# or
node server.js
```

### Step 4: Start Client
In another terminal:
```bash
cd client
npm start
```

The app will open at: http://localhost:3000

## Features

✅ **Text Questions** - Ask any question
✅ **Image Upload** - OCR to extract text from images
✅ **Voice Input** - Ask via voice (browser feature)
✅ **History** - All questions saved locally
✅ **100% FREE** - No API costs, everything local

## Troubleshooting

**Error: "Ollama API error"**
- Make sure Ollama is running: `ollama run mistral`
- Check if it's accessible: http://localhost:11434

**Error: "Port 5000 already in use"**
- Kill the process or use a different port:
  ```bash
  set PORT=3001
  npm start
  ```

**Slow responses**
- Ollama first time takes time (downloading model)
- Use lighter model: `ollama run neural-chat` (faster)
- Or keep Ollama running continuously

## Available Ollama Models

- **mistral** (recommended) - Fast, good quality
- **llama2** - Better quality, slower
- **neural-chat** - Very fast
- **orca-mini** - Lightweight

Download any with: `ollama run <model-name>`

---

**Everything is FREE. No API charges. Enjoy!**
