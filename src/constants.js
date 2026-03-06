export const BUSINESS_TYPES = [
  'Individual / Sole Proprietor',
  'LLC',
  'Corporation',
  'Non-profit',
  'Other',
]

export const COUNTRIES = [
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'Austria',
  'Belgium',
  'Bulgaria',
  'Croatia',
  'Cyprus',
  'Czech Republic',
  'Denmark',
  'Estonia',
  'Finland',
  'France',
  'Germany',
  'Greece',
  'Hungary',
  'Ireland',
  'Italy',
  'Latvia',
  'Lithuania',
  'Luxembourg',
  'Malta',
  'Netherlands',
  'Poland',
  'Portugal',
  'Romania',
  'Slovakia',
  'Slovenia',
  'Spain',
  'Sweden',
  'Other',
]

export const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming',
]

export const EU_COUNTRIES = [
  'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic',
  'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece',
  'Hungary', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg',
  'Malta', 'Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovakia',
  'Slovenia', 'Spain', 'Sweden',
]

export const DATA_TYPES = [
  { id: 'contact', label: 'Contact info (name, email, phone)', category: 'personal' },
  { id: 'account', label: 'Account / login credentials', category: 'personal' },
  { id: 'payment', label: 'Payment / billing information', category: 'financial' },
  { id: 'shipping', label: 'Shipping / mailing addresses', category: 'personal' },
  { id: 'ip_device', label: 'IP addresses and device info', category: 'technical' },
  { id: 'browsing', label: 'Browsing behavior / analytics', category: 'technical' },
  { id: 'cookies', label: 'Cookies and tracking technologies', category: 'technical' },
  { id: 'location', label: 'Location data', category: 'technical' },
  { id: 'social', label: 'Social media profiles', category: 'personal' },
  { id: 'ugc', label: 'User-generated content', category: 'personal' },
  { id: 'children', label: "Children's data (under 13)", category: 'sensitive' },
  { id: 'health', label: 'Health / medical information', category: 'sensitive' },
  { id: 'biometric', label: 'Biometric data', category: 'sensitive' },
]

export const THIRD_PARTY_SERVICES = [
  { id: 'google_analytics', label: 'Google Analytics / GA4', url: 'https://policies.google.com/privacy' },
  { id: 'google_ads', label: 'Google Ads / AdSense', url: 'https://policies.google.com/privacy' },
  { id: 'facebook_pixel', label: 'Facebook Pixel / Meta', url: 'https://www.facebook.com/privacy/policy/' },
  { id: 'stripe', label: 'Stripe / PayPal / payment processors', url: 'https://stripe.com/privacy' },
  { id: 'mailchimp', label: 'Mailchimp / email marketing', url: 'https://mailchimp.com/legal/privacy/' },
  { id: 'hotjar', label: 'Hotjar / session recording', url: 'https://www.hotjar.com/legal/policies/privacy/' },
  { id: 'intercom', label: 'Intercom / chat widgets', url: 'https://www.intercom.com/legal/privacy' },
  { id: 'social_embeds', label: 'Social media embeds', url: '' },
  { id: 'cdn', label: 'CDN providers (Cloudflare, etc.)', url: 'https://www.cloudflare.com/privacypolicy/' },
  { id: 'hosting', label: 'Cloud hosting providers', url: '' },
  { id: 'crm', label: 'CRM systems', url: '' },
]

export const RETENTION_OPTIONS = [
  { value: 'account_deletion', label: 'Until account deletion' },
  { value: '1_year', label: '1 year' },
  { value: '2_years', label: '2 years' },
  { value: '5_years', label: '5 years' },
  { value: 'indefinitely', label: 'Indefinitely' },
  { value: 'custom', label: 'Custom period' },
]

export const REGULATIONS = [
  { id: 'gdpr', label: 'GDPR', description: 'General Data Protection Regulation (EU/EEA visitors)' },
  { id: 'ccpa', label: 'CCPA/CPRA', description: 'California Consumer Privacy Act (California residents)' },
  { id: 'pipeda', label: 'PIPEDA', description: 'Personal Information Protection and Electronic Documents Act (Canadian visitors)' },
  { id: 'caloppa', label: 'CalOPPA', description: 'California Online Privacy Protection Act (any site accessible from California)' },
  { id: 'coppa', label: 'COPPA', description: "Children's Online Privacy Protection Act (if collecting children's data)" },
]

export const STEP_LABELS = [
  'Business Info',
  'Data Collection',
  'Third Parties',
  'Data Handling',
  'Regulations',
  'Contact Info',
]

export const TEST_DATA = {
  businessName: 'Acme Web Solutions',
  websiteUrl: 'https://www.acmewebsolutions.com',
  businessType: 'LLC',
  country: 'United States',
  state: 'California',
  dataTypes: ['contact', 'account', 'payment', 'ip_device', 'browsing', 'cookies', 'location'],
  thirdPartyServices: ['google_analytics', 'stripe', 'mailchimp', 'cdn'],
  otherServices: 'Zendesk for customer support',
  retentionPeriod: '2_years',
  customRetention: '',
  sharesWithThirdParties: false,
  sellsData: false,
  internationalTransfer: true,
  automatedDecisionMaking: false,
  regulations: ['gdpr', 'ccpa', 'caloppa'],
  contactEmail: 'privacy@acmewebsolutions.com',
  dpoName: 'Jane Smith',
  dpoEmail: 'dpo@acmewebsolutions.com',
  physicalAddress: '123 Innovation Drive, Suite 400, San Francisco, CA 94105',
  effectiveDate: new Date().toISOString().split('T')[0],
}
