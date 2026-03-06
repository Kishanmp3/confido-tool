import MetricCard from './MetricCard';
import DeductionChart from './DeductionChart';
import CompliancePanel from './CompliancePanel';
import DisputeIntelligence from './DisputeIntelligence';
import PreLaunchChecklist from './PreLaunchChecklist';
import type { RetailerProfile } from '../data/retailerData';

interface DashboardProps {
  profile: RetailerProfile;
  brandName: string;
  aiSummary: string;
}

export default function Dashboard({ profile, brandName, aiSummary }: DashboardProps) {

  return (
    <div className="dashboard">
      {/* AI Summary Banner */}
      {aiSummary && (
        <div className="ai-summary-banner">
          <div className="ai-banner-label">
            <span className="ai-dot"></span>
            AI Intelligence — {brandName} × {profile.name}
          </div>
          <p className="ai-banner-text">{aiSummary}</p>
        </div>
      )}

      {/* Metric Row */}
      <div className="metrics-row">
        <MetricCard
          label="Avg Deduction Rate"
          value={profile.avgDeductionRate}
          suffix="% of gross"
          subtext="of gross invoice value"
          delay={100}
          decimals={1}
        />
        <MetricCard
          label="Payment Timeline"
          value={profile.avgPaymentDays}
          suffix=" days avg"
          subtext="average payment days"
          delay={200}
          decimals={0}
        />
        <MetricCard
          label="Dispute Win Rate"
          value={profile.disputeWinRate}
          suffix="% of valid"
          subtext="of valid disputes"
          delay={300}
          decimals={0}
        />
        <MetricCard
          label="Difficulty Score"
          value={profile.difficultyScore}
          suffix={` / 5`}
          subtext={profile.difficultyLabel}
          delay={400}
          decimals={1}
          highlight={profile.difficultyScore >= 3.5}
        />
      </div>

      {/* Red flags */}
      {profile.redFlags.length > 0 && (
        <div className="red-flags">
          <div className="red-flags-header">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L1 14h14L8 1z" stroke="#C62828" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M8 6v4M8 11.5h.01" stroke="#C62828" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Key Risk Factors</span>
          </div>
          <ul className="red-flags-list">
            {profile.redFlags.map((flag, i) => (
              <li key={i}>{flag}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Chart + Compliance side by side on wide screens */}
      <div className="two-col">
        <DeductionChart deductions={profile.deductions} />
        <CompliancePanel requirements={profile.compliance} />
      </div>

      <DisputeIntelligence deductions={profile.deductions} />
      <PreLaunchChecklist items={profile.checklist} />
    </div>
  );
}
