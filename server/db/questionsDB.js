const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, '../data/questions.json');

// Ensure data directory exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize empty database if doesn't exist
function initDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2));
  }
}

// Read all questions
function getAllQuestions() {
  initDB();
  const data = fs.readFileSync(DB_FILE, 'utf8');
  return JSON.parse(data);
}

// Save a new question
function saveQuestion(question) {
  initDB();
  const questions = getAllQuestions();
  
  const newQuestion = {
    _id: Date.now().toString(),
    originalQuestion: question.originalQuestion,
    inputType: question.inputType,
    answer: question.answer,
    explanation: question.explanation,
    summary: question.summary,
    createdAt: new Date().toISOString()
  };
  
  questions.unshift(newQuestion); // Add to beginning
  fs.writeFileSync(DB_FILE, JSON.stringify(questions, null, 2));
  
  return newQuestion;
}

// Get question by ID
function getQuestionById(id) {
  initDB();
  const questions = getAllQuestions();
  return questions.find(q => q._id === id);
}

// Get limited questions
function getQuestionsLimit(limit = 10) {
  initDB();
  const questions = getAllQuestions();
  return questions.slice(0, parseInt(limit));
}

module.exports = {
  initDB,
  getAllQuestions,
  saveQuestion,
  getQuestionById,
  getQuestionsLimit
};
