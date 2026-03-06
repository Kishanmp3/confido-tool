import type { ChecklistItem } from '../data/retailerData';

interface PreLaunchChecklistProps {
  items: ChecklistItem[];
}

const PRIORITY_CONFIG = {
  critical: { label: 'Critical', color: '#DC2626', bg: '#FEF2F2' },
  important: { label: 'Important', color: '#D97706', bg: '#FFFBEB' },
  standard: { label: 'Standard', color: '#2D6A4F', bg: '#F0FDF4' }
};

export default function PreLaunchChecklist({ items }: PreLaunchChecklistProps) {
  const sorted = [...items].sort((a, b) => {
    const order = { critical: 0, important: 1, standard: 2 };
    return order[a.priority] - order[b.priority];
  });

  return (
    <div className="checklist-section">
      <div className="section-header">
        <h3 className="section-title">Pre-Launch Checklist</h3>
        <p className="section-subtitle">Complete these before your first shipment ships</p>
      </div>

      <div className="checklist-items">
        {sorted.map((item, i) => {
          const cfg = PRIORITY_CONFIG[item.priority];
          return (
            <div key={i} className="checklist-item" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="checklist-checkbox">
                <div className="checkbox-outer">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="checkbox-check">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div className="checklist-content">
                <div className="checklist-top">
                  <span className="checklist-task">{item.task}</span>
                  <span className="checklist-badge" style={{ color: cfg.color, background: cfg.bg }}>
                    {cfg.label}
                  </span>
                </div>
                <p className="checklist-context">{item.context}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
