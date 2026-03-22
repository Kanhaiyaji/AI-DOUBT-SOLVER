import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputSection from './components/InputSection';
import ResultsSection from './components/ResultsSection';
import HistorySection from './components/HistorySection';
import './App.css';

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch history on component mount
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get('/api/history?limit=10');
      if (response.data.success) {
        setHistory(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  const handleAsk = async (question, inputType) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.post('/api/ask', {
        question,
        inputType
      });
      if (response.data.success) {
        setResult(response.data.data);
        setSuccess(`✨ Great! Got your ${inputType} input. Processing...`);
        setTimeout(() => setSuccess(null), 3000);
        fetchHistory(); // Refresh history
      }
    } catch (err) {
      setError(err.response?.data?.error || '❌ An error occurred');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('inputType', 'image');

      const response = await axios.post('/api/ask', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.success) {
        setResult(response.data.data);
        fetchHistory();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Error processing image');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Ordinary AI Doubt Solver</h1>
        <p>Get AI-powered answers to your questions</p>
      </header>

      <main className="app-main">
        <div className="container">
          {/* Toggle History Button */}
          <button
            className="toggle-history-btn"
            onClick={() => setShowHistory(!showHistory)}
          >
            {showHistory ? '📚 Hide History' : '📚 Show History'}
          </button>

          {showHistory ? (
            <HistorySection history={history} />
          ) : (
            <>
              <InputSection
                onAsk={handleAsk}
                onImageUpload={handleImageUpload}
                loading={loading}
              />

              {error && <div className="error-message">{error}</div>}

              {success && <div className="success-message">{success}</div>}

              {loading && (
                <div className="loading">
                  <div className="spinner"></div>
                  <p>⏳ Processing your question...</p>
                </div>
              )}

              {result && !loading && <ResultsSection result={result} />}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
