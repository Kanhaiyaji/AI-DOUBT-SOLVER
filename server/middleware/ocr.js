const Tesseract = require('tesseract.js');

async function extractTextFromImage(imagePath) {
  try {
    const result = await Tesseract.recognize(imagePath, 'eng');
    return result.data.text;
  } catch (error) {
    throw new Error('OCR processing failed: ' + error.message);
  }
}

module.exports = { extractTextFromImage };
