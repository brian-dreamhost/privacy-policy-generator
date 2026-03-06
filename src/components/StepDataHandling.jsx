import { RETENTION_OPTIONS } from '../constants.js'

const selectClass = 'w-full bg-oblivion border border-metal/30 rounded-lg px-4 py-3 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss transition-colors appearance-none'
const inputClass = 'w-full bg-oblivion border border-metal/30 rounded-lg px-4 py-3 text-white placeholder-galactic focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss transition-colors'
const labelClass = 'block text-sm font-medium text-cloudy mb-1.5'

function RadioGroup({ name, label, helpText, value, onChange, options }) {
  return (
    <fieldset className="space-y-2">
      <legend className={labelClass}>{label}</legend>
      {helpText && <p className="text-xs text-galactic -mt-1 mb-2">{helpText}</p>}
      <div className="flex gap-4">
        {options.map(opt => (
          <label
            key={opt.value}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="w-4 h-4 shrink-0 border-metal/50 bg-oblivion text-azure focus:ring-azure focus:ring-offset-abyss accent-azure"
            />
            <span className="text-sm text-cloudy">{opt.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

const yesNo = [
  { value: true, label: 'Yes' },
  { value: false, label: 'No' },
]

export default function StepDataHandling({ data, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value })

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <label htmlFor="retentionPeriod" className={labelClass}>
          How long do you retain personal data?
        </label>
        <div className="relative">
          <select
            id="retentionPeriod"
            value={data.retentionPeriod || ''}
            onChange={e => update('retentionPeriod', e.target.value)}
            className={selectClass}
          >
            <option value="">Select retention period...</option>
            {RETENTION_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <svg aria-hidden="true" className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-galactic pointer-events-none" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
        {data.retentionPeriod === 'custom' && (
          <div className="mt-2 animate-fadeIn">
            <input
              type="text"
              value={data.customRetention || ''}
              onChange={e => update('customRetention', e.target.value)}
              placeholder='e.g., "3 years after last activity"'
              className={inputClass}
              aria-label="Custom retention period"
            />
          </div>
        )}
      </div>

      <RadioGroup
        name="sharesWithThirdParties"
        label="Do you share data with third parties beyond service providers?"
        helpText="This includes partners, affiliates, or data brokers"
        value={data.sharesWithThirdParties}
        onChange={v => update('sharesWithThirdParties', v)}
        options={yesNo}
      />

      <RadioGroup
        name="sellsData"
        label="Do you sell personal data?"
        helpText="Important for CCPA compliance — selling includes sharing for monetary or other valuable consideration"
        value={data.sellsData}
        onChange={v => update('sellsData', v)}
        options={yesNo}
      />

      <RadioGroup
        name="internationalTransfer"
        label="Do you transfer data internationally?"
        helpText="Applies if your servers, service providers, or users are in different countries"
        value={data.internationalTransfer}
        onChange={v => update('internationalTransfer', v)}
        options={yesNo}
      />

      <RadioGroup
        name="automatedDecisionMaking"
        label="Do you use automated decision-making or profiling?"
        helpText="Includes algorithmic scoring, automated content filtering, or AI-based personalization"
        value={data.automatedDecisionMaking}
        onChange={v => update('automatedDecisionMaking', v)}
        options={yesNo}
      />
    </div>
  )
}
