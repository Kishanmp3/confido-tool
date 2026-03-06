import type { RetailerProfile } from '../data/retailerData';

interface FullReportProps {
  profile: RetailerProfile;
  brandName: string;
  category: string;
  pricePoint: string;
  aiSummary: string;
  aiRecommendation: string;
}

const SEVERITY_COLORS: Record<string, string> = {
  critical: '#DC2626',
  important: '#D97706',
  standard: '#2D6A4F'
};

const PRIORITY_COLORS: Record<string, string> = {
  critical: '#DC2626',
  important: '#D97706',
  standard: '#2D6A4F'
};

export default function FullReport({ profile, brandName, category, pricePoint, aiSummary, aiRecommendation }: FullReportProps) {
  const handlePrint = () => window.print();
  const date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const worthDisputing = profile.deductions.filter(d => d.winRate >= 60);
  const hardToWin = profile.deductions.filter(d => d.winRate < 60);

  return (
    <div className="full-report">
      <div className="report-actions">
        <button className="download-btn" onClick={handlePrint}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1v8M5 6l3 3 3-3M2 11v2a1 1 0 001 1h10a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Download Report
        </button>
      </div>

      <div className="report-body">
        {/* Header */}
        <div className="report-header">
          <div className="report-logo-row">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#2D6A4F"/>
              <path d="M8 22L14 10L20 18L24 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="24" cy="12" r="2" fill="#74C69D"/>
            </svg>
            <span className="report-logo-label">Retailer Briefing — Powered by Confido</span>
          </div>
          <h1 className="report-title">{profile.name} Retailer Intelligence Briefing</h1>
          <div className="report-meta">
            <span>{brandName}</span>
            <span>·</span>
            <span>{category}</span>
            <span>·</span>
            <span>${pricePoint}/unit</span>
            <span>·</span>
            <span>{date}</span>
          </div>
        </div>

        <div className="report-divider" />

        {/* 1. Executive Summary */}
        <section className="report-section">
          <h2 className="report-section-title">1. Executive Summary</h2>
          <p className="report-prose">{aiSummary || profile.executiveSummary}</p>
        </section>

        {/* 2. Retailer Overview */}
        <section className="report-section">
          <h2 className="report-section-title">2. Retailer Overview</h2>
          <div className="report-stats-grid">
            <div className="report-stat">
              <span className="report-stat-value">{profile.tier}</span>
              <span className="report-stat-label">Classification</span>
            </div>
            <div className="report-stat">
              <span className="report-stat-value">{profile.brandsOnPlatform}+</span>
              <span className="report-stat-label">Brands on Confido Platform</span>
            </div>
            <div className="report-stat">
              <span className="report-stat-value">{profile.avgDeductionRate}%</span>
              <span className="report-stat-label">Avg Deduction Rate</span>
            </div>
            <div className="report-stat">
              <span className="report-stat-value">Net {profile.avgPaymentDays}</span>
              <span className="report-stat-label">Avg Payment Terms</span>
            </div>
            <div className="report-stat">
              <span className="report-stat-value">{profile.disputeWinRate}%</span>
              <span className="report-stat-label">Dispute Win Rate</span>
            </div>
            <div className="report-stat">
              <span className="report-stat-value">{profile.difficultyScore}/5</span>
              <span className="report-stat-label">Operational Difficulty</span>
            </div>
          </div>
        </section>

        {/* 3. Deduction Profile */}
        <section className="report-section">
          <h2 className="report-section-title">3. Deduction Profile</h2>
          <p className="report-prose">
            Brands selling into {profile.name} should anticipate an average deduction rate of <strong>{profile.avgDeductionRate}% of gross invoice value</strong>. The following deduction categories represent the primary leakage points, ranked by frequency.
          </p>
          <table className="report-table">
            <thead>
              <tr>
                <th>Deduction Type</th>
                <th>Frequency</th>
                <th>Severity</th>
                <th>Dispute Win Rate</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {[...profile.deductions].sort((a, b) => b.frequency - a.frequency).map((d, i) => (
                <tr key={i}>
                  <td><strong>{d.name}</strong></td>
                  <td>{d.frequency}%</td>
                  <td><span style={{ color: SEVERITY_COLORS[d.severity], fontWeight: 600 }}>{d.severity.toUpperCase()}</span></td>
                  <td>{d.winRate}%</td>
                  <td>{d.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* 4. Compliance Requirements */}
        <section className="report-section">
          <h2 className="report-section-title">4. Compliance Requirements</h2>
          <p className="report-prose">
            The following compliance requirements must be met before your first shipment to {profile.name}. Non-compliance results in chargebacks, shipment rejection, or relationship damage with the buyer team.
          </p>
          {['critical', 'important', 'standard'].map(sev => {
            const reqs = profile.compliance.filter(r => r.severity === sev);
            if (!reqs.length) return null;
            return (
              <div key={sev} className="report-compliance-group">
                <h3 className="report-compliance-group-title" style={{ color: SEVERITY_COLORS[sev] }}>
                  {sev.toUpperCase()}
                </h3>
                {reqs.map((req, i) => (
                  <div key={i} className="report-compliance-item">
                    <strong>{req.name}</strong>
                    <p>{req.description}</p>
                  </div>
                ))}
              </div>
            );
          })}
        </section>

        {/* 5. Payment & Cash Flow */}
        <section className="report-section">
          <h2 className="report-section-title">5. Payment & Cash Flow Profile</h2>
          <p className="report-prose">{profile.paymentNotes}</p>
          <div className="report-callout">
            <strong>Cash Flow Modeling Assumption:</strong> On a $100,000 gross invoice, expect to net approximately ${Math.round(100000 * (1 - profile.avgDeductionRate / 100)).toLocaleString()} after deductions, received in approximately {profile.avgPaymentDays} days.
          </div>
        </section>

        {/* 6. Dispute Strategy */}
        <section className="report-section">
          <h2 className="report-section-title">6. Dispute Strategy</h2>
          <p className="report-prose">
            With a platform-wide dispute win rate of <strong>{profile.disputeWinRate}%</strong> for {profile.name}, deduction recovery should be a structured operational function, not an ad hoc effort. Prioritize disputing the following categories:
          </p>
          <div className="report-dispute-cols">
            <div>
              <h3 className="report-dispute-subhead report-dispute-subhead--win">Prioritize Disputing</h3>
              {worthDisputing.map((d, i) => (
                <div key={i} className="report-dispute-item">
                  <span>{d.name}</span>
                  <span style={{ color: '#2D6A4F', fontWeight: 600 }}>{d.winRate}% win rate</span>
                </div>
              ))}
              {worthDisputing.length === 0 && <p className="report-empty">No high-win-rate deductions identified</p>}
            </div>
            <div>
              <h3 className="report-dispute-subhead report-dispute-subhead--loss">Manage, Not Dispute</h3>
              {hardToWin.map((d, i) => (
                <div key={i} className="report-dispute-item">
                  <span>{d.name}</span>
                  <span style={{ color: '#C62828', fontWeight: 600 }}>{d.winRate}% win rate</span>
                </div>
              ))}
              {hardToWin.length === 0 && <p className="report-empty">All deductions have favorable win rates</p>}
            </div>
          </div>
        </section>

        {/* 7. Pre-Launch Checklist */}
        <section className="report-section">
          <h2 className="report-section-title">7. Pre-Launch Checklist</h2>
          <p className="report-prose">Complete all Critical items before issuing your first PO. Important items should be resolved within 30 days of launch. Standard items are best practice for long-term account health.</p>
          {['critical', 'important', 'standard'].map(pri => {
            const items = profile.checklist.filter(c => c.priority === pri);
            if (!items.length) return null;
            return (
              <div key={pri} className="report-checklist-group">
                <h3 className="report-checklist-group-title" style={{ color: PRIORITY_COLORS[pri] }}>
                  {pri.toUpperCase()}
                </h3>
                {items.map((item, i) => (
                  <div key={i} className="report-checklist-item">
                    <div className="report-checkbox" />
                    <div>
                      <strong>{item.task}</strong>
                      <p>{item.context}</p>
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </section>

        {/* 8. Bottom Line */}
        <section className="report-section report-section--last">
          <h2 className="report-section-title">8. Bottom Line Recommendation</h2>
          <div className="report-bottom-line">
            <p className="report-prose">{aiRecommendation || `${brandName} should approach the ${profile.name} launch with realistic margin expectations and a dedicated compliance infrastructure. The ${profile.difficultyScore}/5 operational difficulty rating reflects the investment required to succeed in this account. Brands that manage deductions proactively and build dispute workflows from day one consistently outperform those that treat deductions as an afterthought.`}</p>
          </div>
        </section>

        <div className="report-footer">
          <p>This briefing was generated by Retailer Briefing, powered by Confido's anonymized CPG dataset of 200+ brands. Data reflects platform averages and should be supplemented with direct retailer negotiation. © {new Date().getFullYear()} Confido.</p>
        </div>
      </div>
    </div>
  );
}
