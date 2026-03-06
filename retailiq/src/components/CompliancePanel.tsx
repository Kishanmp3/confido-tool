import type { ComplianceRequirement } from '../data/retailerData';

interface CompliancePanelProps {
  requirements: ComplianceRequirement[];
}

const SEVERITY_CONFIG = {
  critical: { label: 'Critical', bg: '#FEF2F2', border: '#FECACA', text: '#991B1B', badge: '#DC2626' },
  important: { label: 'Important', bg: '#FFFBEB', border: '#FDE68A', text: '#92400E', badge: '#D97706' },
  standard: { label: 'Standard', bg: '#F0FDF4', border: '#BBF7D0', text: '#166534', badge: '#16A34A' }
};

export default function CompliancePanel({ requirements }: CompliancePanelProps) {
  const grouped = {
    critical: requirements.filter(r => r.severity === 'critical'),
    important: requirements.filter(r => r.severity === 'important'),
    standard: requirements.filter(r => r.severity === 'standard')
  };

  return (
    <div className="compliance-section">
      <div className="section-header">
        <h3 className="section-title">Compliance Risk Panel</h3>
        <p className="section-subtitle">Requirements you must meet before your first shipment</p>
      </div>

      <div className="compliance-grid">
        {requirements.map((req, i) => {
          const cfg = SEVERITY_CONFIG[req.severity];
          return (
            <div
              key={i}
              className="compliance-card"
              style={{ background: cfg.bg, borderColor: cfg.border, animationDelay: `${i * 60}ms` }}
            >
              <div className="compliance-card-header">
                <span className="compliance-name">{req.name}</span>
                <span className="compliance-badge" style={{ background: cfg.badge, color: '#fff' }}>
                  {cfg.label}
                </span>
              </div>
              <p className="compliance-desc">{req.description}</p>
            </div>
          );
        })}
      </div>

      <div className="compliance-summary">
        <div className="compliance-summary-item" style={{ color: '#DC2626' }}>
          <span className="summary-count">{grouped.critical.length}</span>
          <span className="summary-label">Critical</span>
        </div>
        <div className="compliance-summary-divider" />
        <div className="compliance-summary-item" style={{ color: '#D97706' }}>
          <span className="summary-count">{grouped.important.length}</span>
          <span className="summary-label">Important</span>
        </div>
        <div className="compliance-summary-divider" />
        <div className="compliance-summary-item" style={{ color: '#16A34A' }}>
          <span className="summary-count">{grouped.standard.length}</span>
          <span className="summary-label">Standard</span>
        </div>
      </div>
    </div>
  );
}
