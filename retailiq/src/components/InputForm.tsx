import React, { useState } from 'react';
import { RETAILERS, CATEGORIES } from '../data/retailerData';
import type { RetailerKey, CategoryKey } from '../data/retailerData';
import Select from './Select';

interface InputFormProps {
  onSubmit: (data: { retailer: RetailerKey; category: CategoryKey; pricePoint: string; brandName: string }) => void;
}

export default function InputForm({ onSubmit }: InputFormProps) {
  const [retailer, setRetailer] = useState<RetailerKey>('walmart');
  const [category, setCategory] = useState<CategoryKey>('beverage');
  const [pricePoint, setPricePoint] = useState('');
  const [brandName, setBrandName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim() || !pricePoint.trim()) return;
    onSubmit({ retailer, category, pricePoint, brandName });
  };

  return (
    <div className="input-screen">
      <div className="input-container">
        <div className="brand-header">
          <div className="logo-lockup">
            <span className="logo-icon">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="#2D6A4F"/>
                <path d="M8 22L14 10L20 18L24 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="24" cy="12" r="2" fill="#74C69D"/>
              </svg>
            </span>
            <h1 className="app-name">Retailer Briefing</h1>
          </div>
          <p className="tagline">Pre-launch intelligence helping Confido brands prepare before their first shipment</p>
          <div className="powered-badge">
            <span className="badge-dot"></span>
            Powered by Mock Confido data
          </div>
        </div>

        <form onSubmit={handleSubmit} className="briefing-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="brandName">Brand Name</label>
              <input
                id="brandName"
                type="text"
                placeholder="e.g. Oatly, Poppi, Liquid Death"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="pricePoint">Price Point (per unit)</label>
              <div className="input-prefix-wrap">
                <span className="input-prefix">$</span>
                <input
                  id="pricePoint"
                  type="number"
                  placeholder="4.99"
                  min="0.01"
                  step="0.01"
                  value={pricePoint}
                  onChange={(e) => setPricePoint(e.target.value)}
                  required
                />
              </div>
            </div>

            <Select
              id="retailer"
              label="Target Retailer"
              options={RETAILERS}
              value={retailer}
              onChange={(v) => setRetailer(v as RetailerKey)}
            />

            <Select
              id="category"
              label="Product Category"
              options={CATEGORIES}
              value={category}
              onChange={(v) => setCategory(v as CategoryKey)}
            />
          </div>

          <button type="submit" className="cta-button">
            <span>Generate Intelligence Briefing</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M10 4l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>

        <div className="form-footnote">
          Intelligence synthesized from 200+ CPG brands across 7 major retailers
        </div>
      </div>
    </div>
  );
}
