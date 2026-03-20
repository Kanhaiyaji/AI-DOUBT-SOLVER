import React, { useState, useRef } from 'react';

function InputSection({ onAsk, onImageUpload, loading }) {
  const [activeTab, setActiveTab] = useState('text');
  const [textInput, setTextInput] = useState('');
  const [voiceText, setVoiceText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  // Initialize Web Speech API
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported in your browser.');
      return;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';

    recognitionRef.current.onstart = () => {
      setIsListening(true);
    };

    recognitionRef.current.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setVoiceText(transcript);
    };

    recognitionRef.current.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleTextSubmit = () => {
    if (textInput.trim()) {
      onAsk(textInput, 'text');
      setTextInput('');
    }
  };

  const handleVoiceSubmit = () => {
    if (voiceText.trim()) {
      onAsk(voiceText, 'voice');
      setVoiceText('');
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setSelectedFile(file);
      onImageUpload(file);
      e.target.value = '';
      setSelectedFile(null);
    }
  };

  return (
    <section className="input-section">
      <div className="input-tabs">
        <button
          className={`tab-btn ${activeTab === 'text' ? 'active' : ''}`}
          onClick={() => setActiveTab('text')}
        >
          ✏️ Text
        </button>
        <button
          className={`tab-btn ${activeTab === 'voice' ? 'active' : ''}`}
          onClick={() => setActiveTab('voice')}
        >
          🎤 Voice
        </button>
        <button
          className={`tab-btn ${activeTab === 'image' ? 'active' : ''}`}
          onClick={() => setActiveTab('image')}
        >
          📸 Image
        </button>
      </div>

      {/* Text Input */}
      <div className={`input-area ${activeTab === 'text' ? 'active' : ''}`}>
        <textarea
          className="textarea"
          placeholder="Type your question here..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          disabled={loading}
          rows="4"
        />
        <button
          className="submit-btn"
          onClick={handleTextSubmit}
          disabled={loading || !textInput.trim()}
        >
          {loading ? 'Processing...' : 'Submit Question'}
        </button>
      </div>

      {/* Voice Input */}
      <div className={`input-area ${activeTab === 'voice' ? 'active' : ''}`}>
        <div className="voice-input-container">
          <button
            className="voice-btn"
            onClick={isListening ? stopListening : startListening}
            disabled={loading}
          >
            {isListening ? '🎤 Listening...' : '🎤 Start Recording'}
          </button>
          {voiceText && (
            <>
              <div className="voice-text">{voiceText}</div>
              <button
                className="submit-btn"
                onClick={handleVoiceSubmit}
                disabled={loading}
              >
                Submit Voice Question
              </button>
            </>
          )}
        </div>
      </div>

      {/* Image Input */}
      <div className={`input-area ${activeTab === 'image' ? 'active' : ''}`}>
        <div className="file-input-wrapper">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="file-input"
            disabled={loading}
          />
          <label className="file-input-label" onClick={() => fileInputRef.current?.click()}>
            📸 Click to upload or drag an image
          </label>
          {selectedFile && (
            <div className="file-selected">Selected: {selectedFile.name}</div>
          )}
        </div>
      </div>
    </section>
  );
}

export default InputSection;
