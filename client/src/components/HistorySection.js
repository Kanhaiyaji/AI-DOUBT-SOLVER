import React from 'react';

function HistorySection({ history }) {
  if (!history || history.length === 0) {
    return (
      <section className="history-section">
        <h2 className="section-title">Recent Questions</h2>
        <p className="empty-history">No history yet. Ask your first question!</p>
      </section>
    );
  }

  return (
    <section className="history-section">
      <h2 className="section-title">Recent Questions</h2>
      <ul className="history-list">
        {history.map((item, index) => (
          <li key={item._id} className="history-item">
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ color: '#667eea', fontWeight: 'bold', minWidth: '20px' }}>
                {index + 1}.
              </span>
              <div style={{ flex: 1 }}>
                <p className="history-question">
                  {item.originalQuestion.length > 80
                    ? item.originalQuestion.substring(0, 80) + '...'
                    : item.originalQuestion}
                </p>
                <small className="history-meta">
                  <span className="history-input-type">{item.inputType}</span>
                  {' • '}
                  {new Date(item.createdAt).toLocaleDateString()}
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
