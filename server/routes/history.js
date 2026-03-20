const express = require('express');
const Question = require('../models/Question');

const router = express.Router();

// GET /api/history - Fetch all previous doubts
router.get('/', async (req, res) => {
  try {
    const limit = req.query.limit || 10;
    const questions = await Question.find()
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: questions
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// GET /api/history/:id - Fetch specific question
router.get('/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }
    res.json({
      success: true,
      data: question
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
