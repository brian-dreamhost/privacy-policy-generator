import { THIRD_PARTY_SERVICES } from '../constants.js'

const checkboxClass = 'w-4 h-4 shrink-0 rounded border-metal/50 bg-oblivion text-azure focus:ring-azure focus:ring-offset-abyss accent-azure cursor-pointer'
const inputClass = 'w-full bg-oblivion border border-metal/30 rounded-lg px-4 py-3 text-white placeholder-galactic focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss transition-colors'

export default function StepThirdParties({ data, onChange }) {
  const toggleService = (id) => {
    const current = data.thirdPartyServices || []
    const updated = current.includes(id)
      ? current.filter(s => s !== id)
      : [...current, id]
    onChange({ ...data, thirdPartyServices: updated })
  }

  return (
    <div className="space-y-5 animate-fadeIn">
      <p className="text-sm text-galactic">
        Select the third-party services integrated with your website. Their privacy policy links will be included in your document.
      </p>

      <fieldset className="space-y-2">
        <legend className="sr-only">Third-party services</legend>
        {THIRD_PARTY_SERVICES.map(service => (
          <label
            key={service.id}
            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group"
          >
            <input
              type="checkbox"
              checked={(data.thirdPartyServices || []).includes(service.id)}
              onChange={() => toggleService(service.id)}
              className={checkboxClass}
            />
            <div className="flex-1 min-w-0">
              <span className="text-sm text-cloudy group-hover:text-white transition-colors">
                {service.label}
              </span>
              {service.url && (data.thirdPartyServices || []).includes(service.id) && (
                <a
                  href={service.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-xs text-azure hover:text-white transition-colors mt-0.5 truncate"
                  onClick={e => e.stopPropagation()}
                >
                  {service.url}
                </a>
              )}
            </div>
          </label>
        ))}
      </fieldset>

      <div>
        <label htmlFor="otherServices" className="block text-sm font-medium text-cloudy mb-1.5">
          Other Services
        </label>
        <textarea
          id="otherServices"
          value={data.otherServices || ''}
          onChange={e => onChange({ ...data, otherServices: e.target.value })}
          placeholder="List any other third-party services you use (e.g., Zendesk, HubSpot, Shopify)..."
          rows={3}
          className={inputClass}
        />
        <p className="mt-1 text-xs text-galactic">Separate services with commas</p>
      </div>

      {(data.thirdPartyServices || []).length > 0 && (
        <div className="border-t border-metal/20 pt-3">
          <p className="text-xs text-galactic">
            {(data.thirdPartyServices || []).length} service{(data.thirdPartyServices || []).length !== 1 ? 's' : ''} selected
          </p>
        </div>
      )}
    </div>
  )
}
