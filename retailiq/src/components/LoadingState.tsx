import { useEffect, useState } from 'react';

const MESSAGES = [
  'Connecting to Confido retailer database...',
  'Analyzing deduction patterns across 200+ brands...',
  'Cross-referencing compliance requirements...',
  'Calculating dispute win rates...',
  'Generating your briefing...'
];

interface LoadingStateProps {
  retailerName: string;
}

export default function LoadingState({ retailerName }: LoadingStateProps) {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);

  useEffect(() => {
    const totalDuration = MESSAGES.length * 800;
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const p = Math.min((elapsed / totalDuration) * 100, 95);
      setProgress(p);
    }, 50);

    MESSAGES.forEach((_, i) => {
      setTimeout(() => {
        setStep(i);
        setVisibleMessages(prev => [...prev, i]);
      }, i * 800);
    });

    return () => clearInterval(progressInterval);
  }, []);

  return (
    <div className="loading-screen">
      <div className="loading-container">
        <div className="loading-header">
          <div className="loading-icon">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="12" fill="#2D6A4F"/>
              <path d="M12 33L21 15L30 27L36 18" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="36" cy="18" r="3" fill="#74C69D"/>
            </svg>
          </div>
          <div>
            <h2 className="loading-title">Building your {retailerName} briefing</h2>
            <p className="loading-subtitle">Synthesizing data from Confido's CPG intelligence layer</p>
          </div>
        </div>

        <div className="progress-bar-wrap">
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-pct">{Math.round(progress)}%</span>
        </div>

        <div className="message-list">
          {MESSAGES.map((msg, i) => (
            <div
              key={i}
              className={`message-item ${visibleMessages.includes(i) ? 'visible' : ''} ${i === step && step < MESSAGES.length - 1 ? 'active' : ''} ${i < step ? 'done' : ''}`}
            >
              <span className="message-icon">
                {i < step ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="#2D6A4F"/>
                    <path d="M5 8l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : i === step ? (
                  <span className="spinner" />
                ) : (
                  <span className="dot" />
                )}
              </span>
              <span className="message-text">{msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
