const inputClass = 'w-full bg-oblivion border border-metal/30 rounded-lg px-4 py-3 text-white placeholder-galactic focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss transition-colors'
const labelClass = 'block text-sm font-medium text-cloudy mb-1.5'

export default function StepContactInfo({ data, onChange }) {
  const update = (field, value) => onChange({ ...data, [field]: value })
  const hasGdpr = (data.regulations || []).includes('gdpr')

  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <label htmlFor="contactEmail" className={labelClass}>
          Privacy Contact Email <span className="text-coral">*</span>
        </label>
        <input
          id="contactEmail"
          type="email"
          value={data.contactEmail || ''}
          onChange={e => update('contactEmail', e.target.value)}
          placeholder="e.g., privacy@yourdomain.com"
          className={inputClass}
        />
        <p className="mt-1 text-xs text-galactic">
          Where users can send privacy-related inquiries and rights requests
        </p>
      </div>

      {hasGdpr && (
        <div className="space-y-5 animate-fadeIn border-l-2 border-azure/30 pl-4">
          <p className="text-xs font-medium text-azure uppercase tracking-wider">GDPR Requirement</p>

          <div>
            <label htmlFor="dpoName" className={labelClass}>
              Data Protection Officer (DPO) Name
            </label>
            <input
              id="dpoName"
              type="text"
              value={data.dpoName || ''}
              onChange={e => update('dpoName', e.target.value)}
              placeholder="e.g., Jane Smith"
              className={inputClass}
            />
            <p className="mt-1 text-xs text-galactic">
              Required under GDPR for public authorities and organizations that engage in large-scale data processing
            </p>
          </div>

          <div>
            <label htmlFor="dpoEmail" className={labelClass}>
              DPO Email
            </label>
            <input
              id="dpoEmail"
              type="email"
              value={data.dpoEmail || ''}
              onChange={e => update('dpoEmail', e.target.value)}
              placeholder="e.g., dpo@yourdomain.com"
              className={inputClass}
            />
          </div>
        </div>
      )}

      <div>
        <label htmlFor="physicalAddress" className={labelClass}>
          Physical Address for Privacy Inquiries
        </label>
        <textarea
          id="physicalAddress"
          value={data.physicalAddress || ''}
          onChange={e => update('physicalAddress', e.target.value)}
          placeholder="e.g., 123 Main St, Suite 100, City, State ZIP"
          rows={2}
          className={inputClass}
        />
        <p className="mt-1 text-xs text-galactic">
          Some regulations require a physical mailing address for privacy requests
        </p>
      </div>

      <div>
        <label htmlFor="effectiveDate" className={labelClass}>
          Effective Date <span className="text-coral">*</span>
        </label>
        <input
          id="effectiveDate"
          type="date"
          value={data.effectiveDate || ''}
          onChange={e => update('effectiveDate', e.target.value)}
          className={inputClass}
        />
        <p className="mt-1 text-xs text-galactic">
          The date your privacy policy takes effect
        </p>
      </div>
    </div>
  )
}
