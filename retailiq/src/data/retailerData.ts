export interface DeductionType {
  name: string;
  frequency: number;
  severity: 'low' | 'medium' | 'high';
  description: string;
  winRate: number;
}

export interface ComplianceRequirement {
  name: string;
  severity: 'critical' | 'important' | 'standard';
  description: string;
}

export interface ChecklistItem {
  task: string;
  priority: 'critical' | 'important' | 'standard';
  context: string;
}

export interface RetailerProfile {
  name: string;
  tier: string;
  brandsOnPlatform: number;
  avgDeductionRate: number;
  avgPaymentDays: number;
  disputeWinRate: number;
  difficultyScore: number;
  difficultyLabel: string;
  deductions: DeductionType[];
  compliance: ComplianceRequirement[];
  checklist: ChecklistItem[];
  paymentNotes: string;
  redFlags: string[];
  executiveSummary: string;
}

export type RetailerKey = 'walmart' | 'costco' | 'target' | 'whole_foods' | 'kroger' | 'unfi' | 'kehe';
export type CategoryKey = 'beverage' | 'snack' | 'dairy' | 'frozen' | 'personal_care' | 'pet_food';

const baseProfiles: Record<RetailerKey, RetailerProfile> = {
  walmart: {
    name: 'Walmart',
    tier: 'Mass Market Tier 1',
    brandsOnPlatform: 247,
    avgDeductionRate: 11.2,
    avgPaymentDays: 32,
    disputeWinRate: 61,
    difficultyScore: 3.4,
    difficultyLabel: 'Challenging',
    paymentNotes: 'Walmart pays on Net 30 terms but frequently delays. OTIF fines are deducted directly from payment. Expect significant shortages claims in first 6 months.',
    redFlags: [
      'OTIF fines can reach $10K+ per shipment if below 98% threshold',
      'EDI 856 ASN must be sent within 24 hours of shipment or compliance fines trigger',
      'First-time vendors typically see 15-18% deduction rates in Q1',
      'Shortage claims are heavily contested — build a dispute workflow from day one'
    ],
    executiveSummary: 'Walmart offers unmatched volume but requires significant operational infrastructure. Brands that succeed here invest heavily in compliance automation and maintain a dedicated deduction management team.',
    deductions: [
      { name: 'Shortage Claims', frequency: 34, severity: 'high', description: 'Walmart claims product not received per PO', winRate: 58 },
      { name: 'OTIF Penalties', frequency: 28, severity: 'high', description: 'On-time in-full delivery fines, 3% of cost of goods', winRate: 42 },
      { name: 'Co-op Advertising', frequency: 18, severity: 'medium', description: 'Mandatory marketing fund contributions', winRate: 22 },
      { name: 'Compliance Violations', frequency: 12, severity: 'high', description: 'Label, EDI, or pallet configuration issues', winRate: 71 },
      { name: 'Pricing Discrepancies', frequency: 8, severity: 'medium', description: 'Price difference between PO and invoice', winRate: 84 }
    ],
    compliance: [
      { name: 'EDI 856 ASN Required', severity: 'critical', description: 'Must transmit advance ship notice within 24 hours of shipment' },
      { name: 'OTIF 98% Threshold', severity: 'critical', description: '98% on-time in-full delivery or 3% COGS penalty per violation' },
      { name: 'GS1 Case & Pallet Barcodes', severity: 'critical', description: 'All cases and pallets must carry GS1-128 barcodes' },
      { name: 'Co-op Advertising Agreement', severity: 'important', description: 'Signed co-op agreement required before first PO ships' },
      { name: 'Walmart Supplier Center Portal', severity: 'important', description: 'Full registration and item setup required pre-launch' },
      { name: 'Organic Certification Display', severity: 'standard', description: 'If organic claims made, USDA cert must be on file' }
    ],
    checklist: [
      { task: 'Set up EDI 856/810 with your 3PL or EDI provider', priority: 'critical', context: 'Walmart will not accept shipments without compliant EDI transmissions' },
      { task: 'Register on Walmart Supplier Center portal', priority: 'critical', context: 'Item setup, forecasting, and compliance tracking all live here' },
      { task: 'Validate 98%+ OTIF delivery capability', priority: 'critical', context: 'Run a mock fulfillment cycle before first PO to stress-test your 3PL' },
      { task: 'Secure GS1 company prefix and print compliant barcodes', priority: 'critical', context: 'Non-compliant barcodes result in immediate compliance deductions' },
      { task: 'Negotiate co-op advertising rates upfront', priority: 'important', context: 'Locking rates before launch prevents surprise deductions in month 2' },
      { task: 'Set aside 12–15% deduction reserve from gross revenue', priority: 'important', context: 'First-year deduction rates average 13.6% for new Walmart vendors' },
      { task: 'Brief your broker on OTIF and ASN requirements', priority: 'important', context: 'Many broker teams are unfamiliar with Walmart\'s current OTIF enforcement' },
      { task: 'Establish dispute workflow before first shipment ships', priority: 'important', context: 'Average dispute response window is 30 days — set up your process early' },
      { task: 'Review Walmart\'s current item setup requirements', priority: 'standard', context: 'Attribute requirements change quarterly — verify against current Supplier Center specs' },
      { task: 'Schedule quarterly deduction review cadence', priority: 'standard', context: 'Regular review prevents stale disputes from aging out of the disputable window' }
    ]
  },

  costco: {
    name: 'Costco',
    tier: 'Club Retail Tier 1',
    brandsOnPlatform: 89,
    avgDeductionRate: 6.8,
    avgPaymentDays: 27,
    disputeWinRate: 74,
    difficultyScore: 2.6,
    difficultyLabel: 'Moderate',
    paymentNotes: 'Costco pays faster than most mass retailers. Lower deduction volume but high bar for packaging compliance. Membership exclusivity means strong sell-through once listed.',
    redFlags: [
      'Costco requires exclusive pack sizes — your standard SKUs will not be accepted',
      'Packaging must be designed for warehouse display — no shelf-ready packaging standards',
      'Item rationalization is aggressive — underperforming items dropped within 2 seasons',
      'Buyer relationships are critical — expect 6–12 month lead time for new vendor approval'
    ],
    executiveSummary: 'Costco is a premium partnership requiring exclusive SKU development and exceptional sell-through velocity. Lower deduction rates reward brands that hit their volume commitments.',
    deductions: [
      { name: 'Shortage Claims', frequency: 22, severity: 'medium', description: 'Receiving discrepancies on bulk shipments', winRate: 68 },
      { name: 'Packaging Non-Compliance', frequency: 31, severity: 'high', description: 'Pack configurations not meeting club store specs', winRate: 55 },
      { name: 'Promotional Allowances', frequency: 24, severity: 'medium', description: 'Instant savings and member promotion funding', winRate: 31 },
      { name: 'Weight Variances', frequency: 14, severity: 'low', description: 'Catch-weight product discrepancies', winRate: 79 },
      { name: 'Returns Processing', frequency: 9, severity: 'low', description: 'Member return handling and restocking fees', winRate: 44 }
    ],
    compliance: [
      { name: 'Exclusive Pack Size Required', severity: 'critical', description: 'Standard retail SKUs not accepted — club-exclusive multipack required' },
      { name: 'Warehouse Display Packaging', severity: 'critical', description: 'Must stack and display from shipping case in warehouse format' },
      { name: 'Kosher/Organic Certification', severity: 'critical', description: 'Applicable certifications must be current and on file with Costco buying team' },
      { name: 'Vendor Self-Insurance Minimum', severity: 'important', description: 'Minimum $5M general liability insurance with Costco named as additional insured' },
      { name: 'Costco Vendor Agreement', severity: 'important', description: 'Annual vendor agreement must be signed before any PO is issued' },
      { name: 'Country of Origin Labeling', severity: 'standard', description: 'COOL compliance required on all food items' }
    ],
    checklist: [
      { task: 'Develop Costco-exclusive multipack SKU', priority: 'critical', context: 'Costco buyers expect pack sizes 2–3x your standard retail offering' },
      { task: 'Design warehouse-display-ready packaging', priority: 'critical', context: 'Your shipping case IS your display — invest in structural and graphic design' },
      { task: 'Secure all required product certifications', priority: 'critical', context: 'Kosher, organic, non-GMO — verify what applies and have certs current' },
      { task: 'Obtain $5M+ general liability insurance', priority: 'critical', context: 'Costco requires this before any PO is issued — verify with your insurer' },
      { task: 'Sign annual Costco vendor agreement', priority: 'important', context: 'Legal review recommended — contains exclusivity and indemnification clauses' },
      { task: 'Set aside 7–10% deduction reserve', priority: 'important', context: 'Lower than Walmart but promotional allowances can spike in Q4' },
      { task: 'Build in 6-month runway for buyer approval process', priority: 'important', context: 'Costco buyer cycles are slow — do not count on this revenue in your near-term forecast' },
      { task: 'Plan for potential item rationalization in season 2', priority: 'standard', context: 'Have a contingency plan if your item is dropped — it happens to 40% of new vendors' }
    ]
  },

  target: {
    name: 'Target',
    tier: 'Mass Market Tier 1',
    brandsOnPlatform: 178,
    avgDeductionRate: 9.4,
    avgPaymentDays: 35,
    disputeWinRate: 66,
    difficultyScore: 3.1,
    difficultyLabel: 'Moderate-High',
    paymentNotes: 'Target has moved to standardized payment terms with limited flexibility for small vendors. Promotional deductions are predictable but allowance structures can be complex.',
    redFlags: [
      'Target\'s Modernization initiatives have increased compliance scrutiny significantly',
      'Promotional co-op requirements are effectively mandatory for shelf placement',
      'Reverse logistics costs are charged back at full retail value',
      'New vendors typically placed in test stores only — plan for limited initial distribution'
    ],
    executiveSummary: 'Target balances accessibility with strong compliance demands. Its guest demographic skews premium, rewarding brands with strong packaging and brand story. Operational complexity is real but manageable with the right 3PL partner.',
    deductions: [
      { name: 'Shortage Claims', frequency: 29, severity: 'high', description: 'Receiving variances on DC-delivered inventory', winRate: 62 },
      { name: 'Promotional Allowances', frequency: 26, severity: 'medium', description: 'TPR, circular, and digital offer funding', winRate: 28 },
      { name: 'Compliance Chargebacks', frequency: 21, severity: 'high', description: 'Routing, labeling, and EDI violations', winRate: 69 },
      { name: 'Markdown Allowances', frequency: 15, severity: 'medium', description: 'End-of-season and clearance markdown support', winRate: 37 },
      { name: 'Reverse Logistics', frequency: 9, severity: 'medium', description: 'Returns and unsaleable product handling', winRate: 41 }
    ],
    compliance: [
      { name: 'Target Modernization EDI Standards', severity: 'critical', description: 'Full EDI 850/856/810 compliance required under 2024 updated specs' },
      { name: 'Cross-dock Routing Requirements', severity: 'critical', description: 'Must ship to designated DCs per Target routing guide — non-compliance triggers chargebacks' },
      { name: 'Pallet and Case Label Standards', severity: 'critical', description: 'GS1-128 labels with specific Target field requirements' },
      { name: 'Partner Online Portal Registration', severity: 'important', description: 'Target\'s Partner Online is required for item setup, invoicing, and dispute management' },
      { name: 'Promotional Program Participation', severity: 'important', description: 'Category captain expects promotional calendar participation for shelf placement' },
      { name: 'Sustainability Reporting', severity: 'standard', description: 'Target requests sustainability data for packaging and sourcing annually' }
    ],
    checklist: [
      { task: 'Onboard to Target Partner Online portal', priority: 'critical', context: 'All item setup, PO management, and invoicing flows through this system' },
      { task: 'Upgrade EDI to Target\'s 2024 Modernization specs', priority: 'critical', context: 'Legacy EDI integrations are being rejected — verify compliance with your EDI provider' },
      { task: 'Confirm DC routing and carrier compliance', priority: 'critical', context: 'Routing violations are $250–500 per shipment — review the routing guide carefully' },
      { task: 'Print Target-specific pallet and case labels', priority: 'critical', context: 'Label specs differ from Walmart — do not use the same label setup' },
      { task: 'Budget for promotional allowances (18–22% of sales)', priority: 'important', context: 'TPR participation is expected quarterly — factor into margin modeling' },
      { task: 'Set aside 10–12% deduction reserve', priority: 'important', context: 'Target deduction rates run slightly below Walmart but promotional spikes are common' },
      { task: 'Plan for test store rollout (100–200 stores initially)', priority: 'important', context: 'Target rarely goes national with new vendors immediately — model conservative distribution' },
      { task: 'Prepare for markdown allowance requests in months 4–6', priority: 'standard', context: 'If velocity underperforms, Target will request markdown support' }
    ]
  },

  whole_foods: {
    name: 'Whole Foods',
    tier: 'Natural & Specialty Tier 1',
    brandsOnPlatform: 143,
    avgDeductionRate: 7.1,
    avgPaymentDays: 28,
    disputeWinRate: 72,
    difficultyScore: 2.8,
    difficultyLabel: 'Moderate',
    paymentNotes: 'Whole Foods (Amazon-owned) has accelerated payment timelines post-acquisition. Regional buyer relationships remain important. Deduction rates are lower but slotting and demo expectations are high.',
    redFlags: [
      'Slotting fees can run $5K–$25K per region depending on category',
      'Demo requirements are effectively mandatory for new brands in most categories',
      'Amazon integration means inventory and data scrutiny is higher than pre-acquisition',
      'Local/regional buyers have significant autonomy — national programs require separate negotiations'
    ],
    executiveSummary: 'Whole Foods rewards mission-driven brands with strong ingredient integrity and compelling brand stories. The Amazon ownership has added data rigor but also faster payment terms. A natural entry point for premium CPG brands.',
    deductions: [
      { name: 'Slotting Allowances', frequency: 38, severity: 'high', description: 'Per-region, per-store placement fees for new items', winRate: 15 },
      { name: 'Demo & Marketing Requirements', frequency: 27, severity: 'medium', description: 'In-store demo program funding and support', winRate: 18 },
      { name: 'Shortage Claims', frequency: 18, severity: 'medium', description: 'Receiving discrepancies at regional DCs', winRate: 73 },
      { name: 'Promotional Allowances', frequency: 11, severity: 'low', description: 'Sale pricing and seasonal promotion funding', winRate: 34 },
      { name: 'Quality Rejection Chargebacks', frequency: 6, severity: 'medium', description: 'Product rejected at receiving for spec issues', winRate: 61 }
    ],
    compliance: [
      { name: 'Whole Foods Quality Standards', severity: 'critical', description: 'All ingredients must meet WFM quality standards — review the unacceptable ingredients list' },
      { name: 'USDA Organic / Non-GMO Verification', severity: 'critical', description: 'Organic and non-GMO claims require third-party verification on file' },
      { name: 'Regional Buyer Approval Required', severity: 'critical', description: 'Each region has independent buying authority — national programs require multi-region negotiation' },
      { name: 'Demo Program Participation', severity: 'important', description: 'In-store demos expected for new brands — budget 1 demo day per store in first 60 days' },
      { name: 'UNFI Distribution Integration', severity: 'important', description: 'Most WFM inventory moves through UNFI — ensure your UNFI account is active and compliant' },
      { name: 'Fair Trade / B-Corp Preferred', severity: 'standard', description: 'Not required but heavily favored in buyer selection for shelf placement' }
    ],
    checklist: [
      { task: 'Review and comply with WFM unacceptable ingredients list', priority: 'critical', context: 'Even trace ingredients can disqualify a product — audit your full formulation' },
      { task: 'Obtain and file all required certifications (organic, non-GMO)', priority: 'critical', context: 'Certifications must be current and submitted to the regional buyer before review' },
      { task: 'Identify and pitch to correct regional buyer', priority: 'critical', context: 'WFM has 11 regions — start with 1–2 regions, not a national pitch' },
      { task: 'Activate UNFI account and ensure catalog is current', priority: 'critical', context: 'Most WFM orders route through UNFI — any gaps in your UNFI setup delay orders' },
      { task: 'Budget $10K–$40K for slotting across target regions', priority: 'important', context: 'Slotting is effectively a cost of entry — include in your launch P&L' },
      { task: 'Plan and fund in-store demo program', priority: 'important', context: 'Budget $150–250 per demo day; plan for 2 demos per store in first 90 days' },
      { task: 'Set aside 8–10% deduction reserve (excluding slotting)', priority: 'important', context: 'Slotting is a separate line item — deductions on top of slotting can surprise new brands' },
      { task: 'Prepare brand story deck for buyer presentation', priority: 'standard', context: 'WFM buyers evaluate mission and brand as much as margin — make your story compelling' }
    ]
  },

  kroger: {
    name: 'Kroger',
    tier: 'Grocery Tier 1',
    brandsOnPlatform: 201,
    avgDeductionRate: 10.1,
    avgPaymentDays: 33,
    disputeWinRate: 64,
    difficultyScore: 3.2,
    difficultyLabel: 'Challenging',
    paymentNotes: 'Kroger\'s decentralized buying model means deduction practices vary by banner. Standard terms are Net 30 but enforcement varies. Private label pressure is strong in most categories.',
    redFlags: [
      'Kroger has 28+ banners — compliance requirements vary by banner significantly',
      'Private label penetration is 30%+ in most categories — shelf space competition is intense',
      '84.51 data access is required for performance review — set up early',
      'Deduction rates vary 3–5% between banners — model by banner, not enterprise-wide'
    ],
    executiveSummary: 'Kroger\'s scale and banner diversity create both opportunity and complexity. Success requires banner-specific strategies and close attention to 84.51 data to prove velocity before space is cut.',
    deductions: [
      { name: 'Shortage Claims', frequency: 31, severity: 'high', description: 'Receiving discrepancies across banner DCs', winRate: 59 },
      { name: 'OTIF Chargebacks', frequency: 24, severity: 'high', description: 'On-time in-full delivery penalties by banner', winRate: 48 },
      { name: 'Promotional Allowances', frequency: 22, severity: 'medium', description: 'TPR and ad feature funding across banners', winRate: 31 },
      { name: 'Compliance Violations', frequency: 14, severity: 'medium', description: 'Routing, EDI, or labeling non-compliance', winRate: 67 },
      { name: 'New Item Fees', frequency: 9, severity: 'low', description: 'Slotting and new item introduction allowances', winRate: 12 }
    ],
    compliance: [
      { name: 'Banner-Specific EDI Requirements', severity: 'critical', description: 'Each Kroger banner has distinct EDI specs — verify requirements for each banner you enter' },
      { name: 'OTIF Compliance by Banner', severity: 'critical', description: 'OTIF thresholds range from 95–98% depending on banner — confirm requirements with buyer' },
      { name: 'Kroger Supplier Portal (KSP) Registration', severity: 'critical', description: 'All item setup, invoicing, and compliance tracking flows through KSP' },
      { name: '84.51 Data Access Setup', severity: 'important', description: 'Kroger\'s data analytics platform — required to access POS data and manage performance' },
      { name: 'Promotional Calendar Participation', severity: 'important', description: 'Category management expects quarterly promotional commitment — negotiate before launch' },
      { name: 'Private Label Differentiation Statement', severity: 'standard', description: 'Buyers increasingly require documentation of brand differentiation vs. private label' }
    ],
    checklist: [
      { task: 'Register on Kroger Supplier Portal (KSP)', priority: 'critical', context: 'KSP is the operational backbone — item setup cannot proceed without it' },
      { task: 'Identify target banners and confirm EDI requirements per banner', priority: 'critical', context: 'Do not assume enterprise-wide EDI standards — verify by banner' },
      { task: 'Set up 84.51 data access', priority: 'critical', context: 'Your velocity data determines shelf life — set up early and review weekly' },
      { task: 'Confirm OTIF thresholds for each target banner', priority: 'critical', context: 'Missing OTIF triggers chargebacks that compound quickly — confirm and test' },
      { task: 'Budget for slotting and new item fees', priority: 'important', context: 'Kroger new item fees range $1K–$8K per SKU per banner — model this into launch budget' },
      { task: 'Negotiate promotional calendar upfront', priority: 'important', context: 'Kroger expects quarterly promotional participation — lock rates before first PO' },
      { task: 'Set aside 11–14% deduction reserve', priority: 'important', context: 'Kroger deduction rates vary significantly by banner — conservative reserve is prudent' },
      { task: 'Prepare private label differentiation narrative', priority: 'standard', context: 'Buyers will ask why a consumer should pay a premium over Kroger\'s own brand' }
    ]
  },

  unfi: {
    name: 'UNFI',
    tier: 'Natural Channel Distributor',
    brandsOnPlatform: 312,
    avgDeductionRate: 5.2,
    avgPaymentDays: 42,
    disputeWinRate: 78,
    difficultyScore: 2.1,
    difficultyLabel: 'Manageable',
    paymentNotes: 'UNFI pays on longer terms (Net 30–45) but deduction rates are among the lowest in the channel. Freight and warehouse handling fees are the primary cost drivers. Data access through UNFI\'s portal is strong.',
    redFlags: [
      'UNFI payment terms can stretch to Net 45 — model for extended cash cycle',
      'Minimum order quantities can be challenging for small brands',
      'Deduction disputes must be filed within 60 days — strict window',
      'Unsaleable product policies vary by region — clarify before launch'
    ],
    executiveSummary: 'UNFI is the gateway to natural and specialty retail across North America. Lower deduction complexity than mass retail, but longer payment terms require careful cash flow planning.',
    deductions: [
      { name: 'Freight Chargebacks', frequency: 33, severity: 'medium', description: 'Freight cost recovery on inbound and outbound shipments', winRate: 71 },
      { name: 'Warehouse Handling Fees', frequency: 28, severity: 'low', description: 'Receiving, slotting, and handling at UNFI DCs', winRate: 65 },
      { name: 'Shortage Claims', frequency: 21, severity: 'medium', description: 'Receiving discrepancies at distribution centers', winRate: 77 },
      { name: 'Promotional Deductions', frequency: 12, severity: 'low', description: 'TPR funding passed through from retail partners', winRate: 42 },
      { name: 'Unsaleable Product Returns', frequency: 6, severity: 'low', description: 'Damaged or expired inventory returned from retail', winRate: 58 }
    ],
    compliance: [
      { name: 'UNFI Vendor Portal Registration', severity: 'critical', description: 'All item setup, ordering, and invoicing managed through Vendor Portal' },
      { name: 'GS1 Barcode Compliance', severity: 'critical', description: 'All cases must carry GS1-128 barcodes meeting UNFI specifications' },
      { name: 'Minimum Order Quantity Compliance', severity: 'important', description: 'UNFI sets MOQ by product category — confirm before launching SKUs' },
      { name: 'Product Liability Insurance', severity: 'important', description: 'Minimum $2M product liability insurance with UNFI as additional insured required' },
      { name: 'Sell Sheet and Product Specs Submission', severity: 'standard', description: 'Full product spec sheet required for item setup — including shelf life and storage requirements' }
    ],
    checklist: [
      { task: 'Register on UNFI Vendor Portal and complete item setup', priority: 'critical', context: 'UNFI cannot place orders without complete item setup — allow 3–4 weeks for approval' },
      { task: 'Confirm minimum order quantities by SKU', priority: 'critical', context: 'MOQ misalignment causes order rejections and damages the buyer relationship' },
      { task: 'Secure GS1-128 compliant case barcodes', priority: 'critical', context: 'UNFI DCs scan every case on receipt — non-compliant barcodes cause receiving delays' },
      { task: 'Obtain $2M+ product liability insurance', priority: 'important', context: 'Required before UNFI will issue first PO — coordinate with your insurance broker' },
      { task: 'Model for Net 42-day payment cycle', priority: 'important', context: 'UNFI pays slower than mass retail — ensure sufficient working capital bridge' },
      { task: 'Set aside 6–8% deduction reserve', priority: 'important', context: 'UNFI deduction rates are lower but freight and handling fees can surprise new vendors' },
      { task: 'Submit complete product sell sheets and spec documentation', priority: 'standard', context: 'UNFI\'s sales team uses your sell sheet to pitch to retail partners — invest in quality materials' }
    ]
  },

  kehe: {
    name: 'KeHE',
    tier: 'Natural Channel Distributor',
    brandsOnPlatform: 198,
    avgDeductionRate: 4.8,
    avgPaymentDays: 38,
    disputeWinRate: 81,
    difficultyScore: 1.9,
    difficultyLabel: 'Accessible',
    paymentNotes: 'KeHE is widely regarded as the most brand-friendly major distributor. Dedicated natural and specialty focus means category expertise is strong. Deduction rates and dispute resolution are best-in-class.',
    redFlags: [
      'KeHE has smaller footprint than UNFI — coverage gaps in some regions',
      'New vendor approval process requires KeHE SHOW participation or equivalent sales presentation',
      'Smaller average order sizes than UNFI — higher per-unit freight costs',
      'Growing competition for limited DC space in high-demand categories'
    ],
    executiveSummary: 'KeHE offers the most brand-friendly onboarding experience in the distribution channel. Ideal for emerging natural brands seeking regional or national natural retail placement with manageable operational demands.',
    deductions: [
      { name: 'Freight Allowances', frequency: 29, severity: 'low', description: 'Inbound freight cost contributions', winRate: 74 },
      { name: 'Shortage Claims', frequency: 24, severity: 'low', description: 'Receiving discrepancies at KeHE DCs', winRate: 82 },
      { name: 'Promotional Deductions', frequency: 22, severity: 'low', description: 'TPR and featured item program funding', winRate: 48 },
      { name: 'Handling & Warehouse Fees', frequency: 16, severity: 'low', description: 'DC handling and slotting charges', winRate: 69 },
      { name: 'Unsaleable Returns', frequency: 9, severity: 'low', description: 'Expired or damaged product return credits', winRate: 61 }
    ],
    compliance: [
      { name: 'KeHE Connect Portal Registration', severity: 'critical', description: 'All item setup and order management flows through KeHE Connect' },
      { name: 'Natural & Organic Product Standards', severity: 'critical', description: 'KeHE focuses on natural/specialty — all products must meet category quality standards' },
      { name: 'GS1 Barcode Compliance', severity: 'important', description: 'Standard GS1 barcodes required on all cases and inners' },
      { name: 'KeHE SHOW Presentation or Equivalent', severity: 'important', description: 'New vendor approval typically requires trade show pitch or scheduled buyer presentation' },
      { name: 'Minimum Shelf Life Requirements', severity: 'standard', description: 'KeHE requires minimum 66% remaining shelf life at receipt — plan production accordingly' }
    ],
    checklist: [
      { task: 'Register on KeHE Connect and complete item setup', priority: 'critical', context: 'KeHE\'s portal is straightforward — full setup typically takes 1–2 weeks' },
      { task: 'Prepare for KeHE SHOW or buyer presentation', priority: 'critical', context: 'Most new KeHE approvals come through trade show relationships — plan for next KeHE SHOW' },
      { task: 'Verify products meet KeHE natural & specialty standards', priority: 'critical', context: 'KeHE\'s category focus is strict — non-qualifying products are not accepted' },
      { task: 'Ensure production schedule allows 66%+ shelf life at receipt', priority: 'important', context: 'Short shelf life is a top rejection reason — build buffer into your production cycle' },
      { task: 'Model for Net 38-day payment cycle', priority: 'important', context: 'KeHE terms are fair but plan for 5-6 week cash cycle on receivables' },
      { task: 'Set aside 5–7% deduction reserve', priority: 'important', context: 'KeHE has the lowest deduction rates in the channel — but freight allowances add up' },
      { task: 'Identify KeHE regional sales contact for your territory', priority: 'standard', context: 'KeHE\'s regional sales team actively helps brands get into retail partners — build that relationship' }
    ]
  }
};

// Category-specific modifiers for deduction rates and scores
const categoryModifiers: Record<CategoryKey, { deductionMod: number; paymentMod: number; scoreMod: number }> = {
  beverage: { deductionMod: 0, paymentMod: 0, scoreMod: 0 },
  snack: { deductionMod: -0.5, paymentMod: -1, scoreMod: -0.1 },
  dairy: { deductionMod: 1.2, paymentMod: 2, scoreMod: 0.3 },
  frozen: { deductionMod: 1.5, paymentMod: 3, scoreMod: 0.4 },
  personal_care: { deductionMod: -1.0, paymentMod: -2, scoreMod: -0.2 },
  pet_food: { deductionMod: 0.8, paymentMod: 1, scoreMod: 0.2 }
};

export function getRetailerProfile(retailer: RetailerKey, category: CategoryKey): RetailerProfile {
  const base = baseProfiles[retailer];
  const mod = categoryModifiers[category];
  return {
    ...base,
    avgDeductionRate: Math.round((base.avgDeductionRate + mod.deductionMod) * 10) / 10,
    avgPaymentDays: base.avgPaymentDays + mod.paymentMod,
    difficultyScore: Math.round((base.difficultyScore + mod.scoreMod) * 10) / 10
  };
}

export const RETAILERS: { value: RetailerKey; label: string }[] = [
  { value: 'walmart', label: 'Walmart' },
  { value: 'costco', label: 'Costco' },
  { value: 'target', label: 'Target' },
  { value: 'whole_foods', label: 'Whole Foods' },
  { value: 'kroger', label: 'Kroger' },
  { value: 'unfi', label: 'UNFI' },
  { value: 'kehe', label: 'KeHE' }
];

export const CATEGORIES: { value: CategoryKey; label: string }[] = [
  { value: 'beverage', label: 'Beverage' },
  { value: 'snack', label: 'Snack & Confectionery' },
  { value: 'dairy', label: 'Dairy & Refrigerated' },
  { value: 'frozen', label: 'Frozen Food' },
  { value: 'personal_care', label: 'Personal Care' },
  { value: 'pet_food', label: 'Pet Food' }
];
