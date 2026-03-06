import { useState } from 'react';
import InputForm from './components/InputForm';
import LoadingState from './components/LoadingState';
import Dashboard from './components/Dashboard';
import FullReport from './components/FullReport';
import { getRetailerProfile, RETAILERS, CATEGORIES } from './data/retailerData';
import type { RetailerKey, CategoryKey, RetailerProfile } from './data/retailerData';
import Anthropic from '@anthropic-ai/sdk';
import './index.css';

type Screen = 'input' | 'loading' | 'dashboard';
type Tab = 'dashboard' | 'report';

interface FormData {
  retailer: RetailerKey;
  category: CategoryKey;
  pricePoint: string;
  brandName: string;
}

async function fetchAIInsights(formData: FormData, profile: RetailerProfile): Promise<{ summary: string; recommendation: string }> {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
  if (!apiKey) return { summary: '', recommendation: '' };

  try {
    const client = new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
    const retailerLabel = RETAILERS.find(r => r.value === formData.retailer)?.label || formData.retailer;
    const categoryLabel = CATEGORIES.find(c => c.value === formData.category)?.label || formData.category;

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 400,
      system: `You are the AI intelligence engine behind RetailIQ, a feature built on Confido's anonymized dataset of 200+ CPG brands. Given a brand's details, generate a 3-sentence executive summary and a 2-sentence bottom line recommendation that feels specific to their situation. Be direct, data-informed, and practical. No fluff. Format your response as JSON with keys "summary" and "recommendation".`,
      messages: [{
        role: 'user',
        content: `Brand: ${formData.brandName}, Category: ${categoryLabel}, Price point: $${formData.pricePoint}, Retailer: ${retailerLabel}, Avg deduction rate: ${profile.avgDeductionRate}%, Dispute win rate: ${profile.disputeWinRate}%, Difficulty score: ${profile.difficultyScore}/5 (${profile.difficultyLabel}), Avg payment days: ${profile.avgPaymentDays}. Generate the executive summary and bottom line recommendation.`
      }]
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return { summary: parsed.summary || '', recommendation: parsed.recommendation || '' };
    }
  } catch (e) {
    console.warn('AI insights unavailable:', e);
  }
  return { summary: '', recommendation: '' };
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('input');
  const [tab, setTab] = useState<Tab>('dashboard');
  const [formData, setFormData] = useState<FormData | null>(null);
  const [profile, setProfile] = useState<RetailerProfile | null>(null);
  const [aiSummary, setAiSummary] = useState('');
  const [aiRecommendation, setAiRecommendation] = useState('');

  const handleFormSubmit = async (data: FormData) => {
    setFormData(data);
    setScreen('loading');
    const p = getRetailerProfile(data.retailer, data.category);
    setProfile(p);

    const [insights] = await Promise.all([
      fetchAIInsights(data, p),
      new Promise(res => setTimeout(res, 4400))
    ]);

    setAiSummary(insights.summary);
    setAiRecommendation(insights.recommendation);
    setScreen('dashboard');
    setTab('dashboard');
  };

  const handleBack = () => {
    setScreen('input');
    setProfile(null);
    setFormData(null);
    setAiSummary('');
    setAiRecommendation('');
  };

  const retailerLabel = RETAILERS.find(r => r.value === formData?.retailer)?.label || '';
  const categoryLabel = CATEGORIES.find(c => c.value === formData?.category)?.label || '';

  return (
    <div className="app">
      {screen === 'input' && <InputForm onSubmit={handleFormSubmit} />}
      {screen === 'loading' && <LoadingState retailerName={retailerLabel} />}
      {screen === 'dashboard' && profile && formData && (
        <div className="results-screen">
          <nav className="top-nav">
            <div className="nav-left">
              <button className="back-btn" onClick={handleBack}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                New Briefing
              </button>
              <div className="nav-brand">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill="#2D6A4F"/>
                  <path d="M8 22L14 10L20 18L24 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="24" cy="12" r="2" fill="#74C69D"/>
                </svg>
                <span>Retailer Briefing</span>
              </div>
            </div>
            <div className="nav-center">
              <div className="context-pills">
                <span className="context-pill context-pill--brand">{formData.brandName}</span>
                <span className="context-arrow">→</span>
                <span className="context-pill context-pill--retailer">{retailerLabel}</span>
                <span className="context-pill context-pill--category">{categoryLabel}</span>
                <span className="context-pill context-pill--price">${formData.pricePoint}/unit</span>
              </div>
            </div>
            <div className="nav-right">
              <div className="tab-switcher">
                <button
                  className={`tab-btn ${tab === 'dashboard' ? 'active' : ''}`}
                  onClick={() => setTab('dashboard')}
                >Dashboard</button>
                <button
                  className={`tab-btn ${tab === 'report' ? 'active' : ''}`}
                  onClick={() => setTab('report')}
                >Full Report</button>
              </div>
            </div>
          </nav>

          <div className="results-content">
            {tab === 'dashboard' ? (
              <Dashboard profile={profile} brandName={formData.brandName} aiSummary={aiSummary} />
            ) : (
              <FullReport
                profile={profile}
                brandName={formData.brandName}
                category={categoryLabel}
                pricePoint={formData.pricePoint}
                aiSummary={aiSummary}
                aiRecommendation={aiRecommendation}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
