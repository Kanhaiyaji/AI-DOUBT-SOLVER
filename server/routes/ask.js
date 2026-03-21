const express = require('express');
const axios = require('axios');
const questionsDB = require('../db/questionsDB');
const { extractTextFromImage } = require('../middleware/ocr');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Helper function to call Ollama API (Free Local LLM)
async function getOllamaResponse(question) {
  const prompt = `Please provide:
1. A clear and accurate ANSWER to this question
2. STEP-BY-STEP EXPLANATION with detailed reasoning
3. SHORT SUMMARY (2-3 sentences)

Format your response as:
ANSWER:
[Your answer here]

EXPLANATION:
[Step-by-step explanation here]

SUMMARY:
[Short summary here]

Question: ${question}`;

  try {
    const response = await axios.post(
      'http://localhost:11434/api/generate',
      {
        model: 'mistral',
        prompt: prompt,
        stream: false
      }
    );

    const content = response.data.response;
    
    // Parse the response
    const answerMatch = content.match(/ANSWER:\s*([\s\S]*?)(?=EXPLANATION:)/);
    const explanationMatch = content.match(/EXPLANATION:\s*([\s\S]*?)(?=SUMMARY:)/);
    const summaryMatch = content.match(/SUMMARY:\s*([\s\S]*?)$/);

    return {
      answer: answerMatch ? answerMatch[1].trim() : content,
      explanation: explanationMatch ? explanationMatch[1].trim() : '',
      summary: summaryMatch ? summaryMatch[1].trim() : ''
    };
  } catch (error) {
    throw new Error('Ollama API error: ' + error.message + '. Make sure Ollama is running: ollama run mistral');
  }
}

// POST /api/ask - Process question
router.post('/', upload.single('image'), async (req, res) => {
  try {
    let question = '';
    const inputType = req.body.inputType || 'text';

    // Extract question based on input type
    if (inputType === 'image' && req.file) {
      question = await extractTextFromImage(req.file.path);
      // Clean up uploaded file
      fs.unlink(req.file.path, () => {});
    } else if (inputType === 'voice' || inputType === 'text') {
      question = req.body.question;
    }

    if (!question || question.trim() === '') {
      return res.status(400).json({ error: 'No question provided' });
    }

    // Get AI response
    const aiResponse = await getOllamaResponse(question);

    // Save to database
    const newQuestion = questionsDB.saveQuestion({
      originalQuestion: question,
      inputType: inputType,
      answer: aiResponse.answer,
      explanation: aiResponse.explanation,
      summary: aiResponse.summary
    });

    res.json({
      success: true,
      data: {
        id: newQuestion._id,
        question: question,
        answer: aiResponse.answer,
        explanation: aiResponse.explanation,
        summary: aiResponse.summary
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
