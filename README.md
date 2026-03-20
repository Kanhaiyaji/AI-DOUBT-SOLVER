# Ordinary AI Doubt Solver

A clean, minimal, and classy full-stack web application that helps users get instant AI-powered answers to their questions.

## Features

✨ **Input Methods:**
- 📝 Type questions manually
- 🎤 Voice input using Browser Speech Recognition API
- 📸 Upload question images with OCR text extraction

✨ **AI Processing:**
- Generate comprehensive answers using Google Gemini API
- Provide step-by-step explanations
- Create short summaries

✨ **Data Management:**
- Store all questions and answers in MongoDB
- View question history
- Track input methods used

## Tech Stack

**Frontend:**
- React.js
- Axios (HTTP client)
- Modern CSS with responsive design

**Backend:**
- Node.js + Express
- MongoDB
- Tesseract.js (OCR)
- Axios (API calls)

**APIs:**
- Google Gemini API (free tier)
- Browser Speech Recognition API (free)

## Project Structure

```
AI DOUBT SOLVER/
├── server/
│   ├── models/
│   │   └── Question.js
│   ├── routes/
│   │   ├── ask.js
│   │   └── history.js
│   ├── middleware/
│   │   └── ocr.js
│   ├── package.json
│   ├── server.js
│   ├── .env.example
│   └── .gitignore
│
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── InputSection.js
│   │   │   ├── ResultsSection.js
│   │   │   └── HistorySection.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   ├── package.json
│   └── .gitignore
│
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB running locally or MongoDB Atlas connection string
- Google Gemini API key (get free at [Google AI Studio](https://makersuite.google.com/app/apikey))

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env` file and add your credentials:**
   ```env
   MONGODB_URI=mongodb://localhost:27017/doubt-solver
   GEMINI_API_KEY=your_gemini_api_key_here
   PORT=5000
   ```

   **For MongoDB Atlas:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/doubt-solver?retryWrites=true&w=majority
   ```

5. **Start the backend server:**
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory (in another terminal):**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the React development server:**
   ```bash
   npm start
   ```

   Application will open automatically at `http://localhost:3000`

## API Endpoints

### POST `/api/ask`

Process a question and get AI-powered answer.

**Request:**
```json
{
  "question": "What is photosynthesis?",
  "inputType": "text"
}
```

For image input, use multipart form-data:
- `image`: Image file
- `inputType`: "image"

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "123abc",
    "question": "What is photosynthesis?",
    "answer": "...",
    "explanation": "...",
    "summary": "..."
  }
}
```

### GET `/api/history?limit=10`

Fetch recent questions and answers.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "123abc",
      "originalQuestion": "...",
      "inputType": "text",
      "answer": "...",
      "explanation": "...",
      "summary": "...",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### GET `/api/history/:id`

Fetch a specific question by ID.

## How to Use

1. **Text Input:** Type your question in the text area and click "Submit Question"

2. **Voice Input:**
   - Click "Start Recording"
   - Speak your question
   - The app will transcribe it automatically
   - Click "Submit Voice Question"

3. **Image Input:**
   - Click "Click to upload or drag an image"
   - Select an image containing a question
   - OCR will extract text and process it automatically

4. **View History:**
   - Click "Show History" button
   - View your last 10 questions with timestamps
   - Click "Hide History" to return to input

## Environment Variables

### Server (.env)

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/doubt-solver` |
| `GEMINI_API_KEY` | Google Gemini API key | `AIzaSy...` |
| `PORT` | Server port | `5000` |

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Speech Recognition API support required for voice input

## Troubleshooting

### "Speech Recognition is not supported"
- Use Chrome, Edge, or Safari
- iPhone: Use Safari

### "Gemini API error"
- Verify API key in `.env` file
- Check Gemini API quota at [Google Cloud Console](https://console.cloud.google.com/)

### "MongoDB connection error"
- Ensure MongoDB is running
- Check connection string in `.env`
- For Atlas: Verify IP whitelist allows your current IP

### CORS errors
- Ensure backend is running on `http://localhost:5000`
- Frontend proxy in `client/package.json` is set correctly

## Performance Tips

1. **Image Upload:** Compress images before uploading for faster OCR
2. **Voice Input:** Speak clearly for better transcription
3. **API Rate Limit:** Free Gemini API has rate limits; add delays between requests if needed

## Future Enhancements

- User authentication
- Save bookmarked answers
- Multi-language support
- PDF export for answers
- Keyboard shortcuts
- Dark mode
- Answer sharing via link

## License

MIT

## Support

For issues or suggestions, please open an issue in the repository.

---

**Built with ❤️ | Clean, Minimal, Classy**
