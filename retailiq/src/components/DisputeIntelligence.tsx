import type { DeductionType } from '../data/retailerData';

interface DisputeIntelligenceProps {
  deductions: DeductionType[];
}

export default function DisputeIntelligence({ deductions }: DisputeIntelligenceProps) {
  const worthDisputing = deductions.filter(d => d.winRate >= 60).sort((a, b) => b.winRate - a.winRate);
  const hardToWin = deductions.filter(d => d.winRate < 60).sort((a, b) => a.winRate - b.winRate);

  return (
    <div className="dispute-section">
      <div className="section-header">
        <h3 className="section-title">Dispute Intelligence</h3>
        <p className="section-subtitle">Where to focus your deduction recovery resources</p>
      </div>

      <div className="dispute-panels">
        <div className="dispute-panel dispute-panel--win">
          <div className="dispute-panel-header">
            <span className="dispute-panel-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L11.09 7.26L17 8.27L13 12.14L13.99 18L9 15.27L4.01 18L5 12.14L1 8.27L6.91 7.26L9 2Z" fill="#2D6A4F" stroke="#2D6A4F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <h4 className="dispute-panel-title">Worth Disputing</h4>
            <span className="dispute-panel-badge dispute-panel-badge--green">High Win Rate</span>
          </div>
          <div className="dispute-items">
            {worthDisputing.length > 0 ? worthDisputing.map((d, i) => (
              <div key={i} className="dispute-item dispute-item--win">
                <div className="dispute-item-left">
                  <span className="dispute-item-name">{d.name}</span>
                  <span className="dispute-item-freq">{d.frequency}% of deductions</span>
                </div>
                <div className="dispute-win-rate">
                  <span className="win-rate-number" style={{ color: '#2D6A4F' }}>{d.winRate}%</span>
                  <span className="win-rate-label">win rate</span>
                </div>
              </div>
            )) : (
              <p className="dispute-empty">No high-win-rate deductions for this retailer</p>
            )}
          </div>
        </div>

        <div className="dispute-panel dispute-panel--loss">
          <div className="dispute-panel-header">
            <span className="dispute-panel-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="9" cy="9" r="7" stroke="#C62828" strokeWidth="1.5"/>
                <path d="M9 5v4M9 13h.01" stroke="#C62828" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </span>
            <h4 className="dispute-panel-title">Hard to Win</h4>
            <span className="dispute-panel-badge dispute-panel-badge--red">Low Win Rate</span>
          </div>
          <div className="dispute-items">
            {hardToWin.length > 0 ? hardToWin.map((d, i) => (
              <div key={i} className="dispute-item dispute-item--loss">
                <div className="dispute-item-left">
                  <span className="dispute-item-name">{d.name}</span>
                  <span className="dispute-item-freq">{d.frequency}% of deductions</span>
                </div>
                <div className="dispute-win-rate">
                  <span className="win-rate-number" style={{ color: '#C62828' }}>{d.winRate}%</span>
                  <span className="win-rate-label">win rate</span>
                </div>
              </div>
            )) : (
              <p className="dispute-empty">All deductions have high dispute win rates</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
