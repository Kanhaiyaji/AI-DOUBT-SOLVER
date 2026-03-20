# Quick Start Guide - Ordinary AI Doubt Solver

## 🚀 Get Running in 5 Minutes

### Step 1: Get API Key (2 minutes)

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key and save it somewhere (you'll need it in Step 3)

### Step 2: Setup MongoDB (1 minute)

**Option A: Local MongoDB (Recommended for beginners)**
- Download from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- Install and start MongoDB
- Default connection string: `mongodb://localhost:27017/doubt-solver`

**Option B: MongoDB Atlas (Cloud)**
- Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create a free cluster
- Get connection string from "Connect" button
- String looks like: `mongodb+srv://user:password@cluster.mongodb.net/doubt-solver`

### Step 3: Setup Backend (1 minute)

```bash
# Open terminal in AI DOUBT SOLVER folder

cd server
npm install

# Create .env file with your API key
copy .env.example .env

# Edit .env in your text editor and add:
# GEMINI_API_KEY=your_api_key_here
# MONGODB_URI=your_mongodb_connection_string

npm start
```

✅ Backend running at `http://localhost:5000`

### Step 4: Setup Frontend (1 minute)

```bash
# Open NEW terminal (keep backend running)

cd client
npm install
npm start
```

✅ Frontend opens at `http://localhost:3000`

---

## 🎯 First Test

1. Type a question: "What is AI?"
2. Click "Submit Question"
3. Wait for the answer!

---

## 🎤 Try Other Features

**Voice Input:**
- Select "Voice" tab
- Click "Start Recording"
- Ask your question
- Click "Submit Voice Question"

**Image Input:**
- Select "Image" tab
- Upload an image with text
- OCR extracts the text automatically

**View History:**
- Click "Show History"
- See all your previous questions

---

## ⚠️ Common Issues

| Issue | Solution |
|-------|----------|
| "Cannot find module 'express'" | Run `npm install` in the server folder |
| "CORS error" | Make sure backend is running on port 5000 |
| "Gemini API error" | Check your API key in .env file |
| "MongoDB connection error" | Make sure MongoDB is running or check connection string |
| "Speech not working" | Use Chrome, Edge, or Safari. Some browsers don't support it |

---

## 📁 Project Locations

After setup, your files should be organized:

```
AI DOUBT SOLVER/
├── server/              ← Backend runs here
│   ├── .env             ← Add your API key here
│   └── node_modules/    ← Created after npm install
│
├── client/              ← Frontend runs here
│   └── node_modules/    ← Created after npm install
│
└── README.md            ← Full documentation
```

---

## 🎮 How to Stop

**To stop backend:** Press `Ctrl + C` in backend terminal

**To stop frontend:** Press `Ctrl + C` in frontend terminal

---

## 📚 Next Steps

Read [README.md](./README.md) for:
- Full API documentation
- Environment variables explained
- Troubleshooting guide
- Future enhancement ideas

---

## ✨ Pro Tips

1. **OCR Tips:**
   - Use clear, well-lit images
   - Font size should be readable
   - Black text on white background works best

2. **Voice Tips:**
   - Speak clearly and naturally
   - Use complete sentences
   - Pause between questions

3. **API Tips:**
   - Free Gemini API has rate limits
   - Add 1-2 second delay between questions if needed
   - Longer questions = longer response time

---

**Enjoy solving your doubts! 🎓**
