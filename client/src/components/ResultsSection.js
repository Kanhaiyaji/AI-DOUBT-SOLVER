import React from 'react';

function ResultsSection({ result }) {
  return (
    <section className="results-section">
      <h2 className="section-title">Your Answer</h2>
      
      <div className="result-card">
        <div className="result-card-title">Question</div>
        <div className="result-card-content">
          {result.question.length > 150 
            ? result.question.substring(0, 150) + '...' 
            : result.question}
        </div>
      </div>

      {result.answer && (
        <div className="result-card">
          <div className="result-card-title">Answer</div>
          <div className="result-card-content">
            {result.answer}
          </div>
        </div>
      )}

      {result.explanation && (
        <div className="result-card">
          <div className="result-card-title">Step-by-Step Explanation</div>
          <div className="result-card-content">
            {result.explanation}
          </div>
        </div>
      )}

      {result.summary && (
        <div className="result-card">
          <div className="result-card-title">Summary</div>
          <div className="result-card-content">
            {result.summary}
          </div>
        </div>
      )}
    </section>
  );
}

export default ResultsSection;
