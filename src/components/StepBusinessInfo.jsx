import { BUSINESS_TYPES, COUNTRIES, US_STATES } from '../constants.js'

const inputClass = 'w-full bg-oblivion border border-metal/30 rounded-lg px-4 py-3 text-white placeholder-galactic focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss transition-colors'
const selectClass = 'w-full bg-oblivion border border-metal/30 rounded-lg px-4 py-3 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss transition-colors appearance-none'
const labelClass = 'block text-sm font-medium text-cloudy mb-1.5'

export default function StepBusinessInfo({ data, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value })

  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <label htmlFor="businessName" className={labelClass}>
          Business / Website Name <span className="text-coral">*</span>
        </label>
        <input
          id="businessName"
          type="text"
          value={data.businessName}
          onChange={e => update('businessName', e.target.value)}
          placeholder="e.g., Acme Corp"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="websiteUrl" className={labelClass}>
          Website URL <span className="text-coral">*</span>
        </label>
        <input
          id="websiteUrl"
          type="url"
          value={data.websiteUrl}
          onChange={e => update('websiteUrl', e.target.value)}
          placeholder="e.g., https://www.example.com"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="businessType" className={labelClass}>Business Type</label>
        <div className="relative">
          <select
            id="businessType"
            value={data.businessType}
            onChange={e => update('businessType', e.target.value)}
            className={selectClass}
          >
            <option value="">Select business type...</option>
            {BUSINESS_TYPES.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <svg aria-hidden="true" className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-galactic pointer-events-none" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>

      <div>
        <label htmlFor="country" className={labelClass}>
          Country of Operation <span className="text-coral">*</span>
        </label>
        <div className="relative">
          <select
            id="country"
            value={data.country}
            onChange={e => update('country', e.target.value)}
            className={selectClass}
          >
            <option value="">Select country...</option>
            {COUNTRIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <svg aria-hidden="true" className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-galactic pointer-events-none" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
        <p className="mt-1 text-xs text-galactic">Used to determine applicable regulations</p>
      </div>

      {data.country === 'United States' && (
        <div className="animate-fadeIn">
          <label htmlFor="state" className={labelClass}>
            State <span className="text-xs text-galactic">(important for CCPA)</span>
          </label>
          <div className="relative">
            <select
              id="state"
              value={data.state}
              onChange={e => update('state', e.target.value)}
              className={selectClass}
            >
              <option value="">Select state...</option>
              {US_STATES.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <svg aria-hidden="true" className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-galactic pointer-events-none" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}
