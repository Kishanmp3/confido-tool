import { useCountUp } from '../hooks/useCountUp';

interface MetricCardProps {
  label: string;
  value: number;
  suffix: string;
  subtext: string;
  delay?: number;
  decimals?: number;
  prefix?: string;
  highlight?: boolean;
}

export default function MetricCard({ label, value, suffix, subtext, delay = 0, decimals = 1, prefix = '', highlight = false }: MetricCardProps) {
  const animated = useCountUp(value, 1400, delay, decimals);

  return (
    <div className={`metric-card ${highlight ? 'metric-card--highlight' : ''}`} style={{ animationDelay: `${delay}ms` }}>
      <span className="metric-label">{label}</span>
      <div className="metric-value">
        {prefix && <span className="metric-prefix">{prefix}</span>}
        <span className="metric-number">{decimals > 0 ? animated.toFixed(decimals) : Math.round(animated)}</span>
        <span className="metric-suffix">{suffix}</span>
      </div>
      <p className="metric-subtext">{subtext}</p>
    </div>
  );
}
