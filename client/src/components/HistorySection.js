import React from 'react';

function HistorySection({ history }) {
  if (!history || history.length === 0) {
    return (
      <section className="history-section">
        <h2 className="section-title">📚 Recent Questions</h2>
        <p className="empty-history">🚀 No history yet. Ask your first question!</p>
      </section>
    );
  }

  return (
    <section className="history-section">
      <h2 className="section-title">📚 Recent Questions ({history.length})</h2>
      <ul className="history-list">
        {history.map((item, index) => (
          <li key={item._id} className="history-item">
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ 
                color: '#667eea', 
                fontWeight: 'bold', 
                minWidth: '24px',
                fontSize: '1.1rem'
              }}>
                {String(index + 1).padStart(2, '0')}.
              </span>
              <div style={{ flex: 1 }}>
                <p className="history-question">
                  {item.originalQuestion.length > 80
                    ? item.originalQuestion.substring(0, 80) + '...'
                    : item.originalQuestion}
                </p>
                <small className="history-meta">
                  <span className="history-input-type">
                    {item.inputType === 'text' && '✏️'}
                    {item.inputType === 'voice' && '🎤'}
                    {item.inputType === 'image' && '📸'} {item.inputType}
                  </span>
                  {' • '}
                  {new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString()}
                </small>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default HistorySection;
