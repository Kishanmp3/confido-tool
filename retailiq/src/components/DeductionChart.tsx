import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { DeductionType } from '../data/retailerData';

interface DeductionChartProps {
  deductions: DeductionType[];
}

const SEVERITY_COLORS: Record<string, string> = {
  high: '#C62828',
  medium: '#E65100',
  low: '#2D6A4F'
};

const SEVERITY_BG: Record<string, string> = {
  high: '#FFF5F5',
  medium: '#FFF8F0',
  low: '#F0F8F4'
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: DeductionType }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="chart-tooltip">
        <p className="tooltip-name">{d.name}</p>
        <p className="tooltip-freq">{d.frequency}% of deductions</p>
        <p className="tooltip-desc">{d.description}</p>
        <p className="tooltip-win">Win rate: <strong>{d.winRate}%</strong></p>
      </div>
    );
  }
  return null;
};

export default function DeductionChart({ deductions }: DeductionChartProps) {
  const sorted = [...deductions].sort((a, b) => b.frequency - a.frequency);

  return (
    <div className="chart-section">
      <div className="section-header">
        <h3 className="section-title">Deduction Breakdown</h3>
        <p className="section-subtitle">Top deduction types by frequency — hover for dispute win rate</p>
      </div>

      <div className="chart-legend">
        {['high', 'medium', 'low'].map(s => (
          <span key={s} className="legend-item">
            <span className="legend-dot" style={{ background: SEVERITY_COLORS[s] }}></span>
            {s.charAt(0).toUpperCase() + s.slice(1)} severity
          </span>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={sorted} layout="vertical" margin={{ left: 16, right: 40, top: 8, bottom: 8 }}>
          <XAxis type="number" domain={[0, 50]} tickFormatter={v => `${v}%`} tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 13, fill: '#334155' }} axisLine={false} tickLine={false} width={160} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F8FAFC' }} />
          <Bar dataKey="frequency" radius={[0, 4, 4, 0]} barSize={22}>
            {sorted.map((entry, index) => (
              <Cell key={index} fill={SEVERITY_COLORS[entry.severity]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="deduction-detail-grid">
        {sorted.map((d, i) => (
          <div key={i} className="deduction-detail-row" style={{ background: SEVERITY_BG[d.severity] }}>
            <div className="deduction-detail-left">
              <span className="deduction-detail-name">{d.name}</span>
              <span className="deduction-detail-desc">{d.description}</span>
            </div>
            <div className="deduction-detail-right">
              <span className="deduction-detail-freq">{d.frequency}%</span>
              <span className="deduction-detail-win" style={{ color: d.winRate > 60 ? '#2D6A4F' : d.winRate > 40 ? '#E65100' : '#C62828' }}>
                {d.winRate}% win rate
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
