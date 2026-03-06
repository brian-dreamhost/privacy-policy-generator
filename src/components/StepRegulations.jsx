import { REGULATIONS, EU_COUNTRIES } from '../constants.js'

const checkboxClass = 'w-4 h-4 shrink-0 rounded border-metal/50 bg-oblivion text-azure focus:ring-azure focus:ring-offset-abyss accent-azure cursor-pointer'

export default function StepRegulations({ data, onChange }) {
  const toggleRegulation = (id) => {
    const current = data.regulations || []
    const updated = current.includes(id)
      ? current.filter(r => r !== id)
      : [...current, id]
    onChange({ ...data, regulations: updated })
  }

  // Auto-suggest logic
  const suggestions = []
  const isEU = EU_COUNTRIES.includes(data.country)
  const isUS = data.country === 'United States'
  const isCA = data.country === 'Canada'
  const isCalifornia = data.state === 'California'
  const hasChildren = (data.dataTypes || []).includes('children')

  if (isEU) suggestions.push('gdpr')
  if (!isEU && (data.dataTypes || []).length > 0) suggestions.push('gdpr') // likely has EU visitors
  if (isUS && isCalifornia) suggestions.push('ccpa')
  if (isCA) suggestions.push('pipeda')
  if (isUS || isCalifornia) suggestions.push('caloppa')
  if (hasChildren) suggestions.push('coppa')

  const hasSuggestions = suggestions.some(s => !(data.regulations || []).includes(s))

  return (
    <div className="space-y-5 animate-fadeIn">
      <p className="text-sm text-galactic">
        Select the privacy regulations your policy should address. We have auto-suggested regulations based on your location and data practices.
      </p>

      {hasSuggestions && (
        <div className="bg-azure/10 border border-azure/20 rounded-xl p-4">
          <div className="flex items-start gap-2">
            <svg aria-hidden="true" className="w-5 h-5 text-azure shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
            </svg>
            <div>
              <p className="text-sm font-medium text-white">Suggested regulations</p>
              <p className="text-xs text-cloudy mt-0.5">
                Based on your location ({data.country || 'not set'}
                {data.state ? `, ${data.state}` : ''}) and data practices,
                we recommend adding:{' '}
                {suggestions
                  .filter(s => !(data.regulations || []).includes(s))
                  .map(s => REGULATIONS.find(r => r.id === s)?.label)
                  .join(', ')}
              </p>
              <button
                type="button"
                onClick={() => {
                  const current = data.regulations || []
                  const merged = [...new Set([...current, ...suggestions])]
                  onChange({ ...data, regulations: merged })
                }}
                className="mt-2 text-xs font-medium text-azure hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss rounded"
              >
                Apply all suggestions
              </button>
            </div>
          </div>
        </div>
      )}

      <fieldset className="space-y-3">
        <legend className="sr-only">Applicable regulations</legend>
        {REGULATIONS.map(reg => {
          const isSuggested = suggestions.includes(reg.id)
          return (
            <label
              key={reg.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group border border-transparent"
            >
              <input
                type="checkbox"
                checked={(data.regulations || []).includes(reg.id)}
                onChange={() => toggleRegulation(reg.id)}
                className={`${checkboxClass} mt-0.5`}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-white">{reg.label}</span>
                  {isSuggested && (
                    <span className="text-[10px] font-medium uppercase tracking-wider text-azure bg-azure/10 px-1.5 py-0.5 rounded">
                      Suggested
                    </span>
                  )}
                </div>
                <p className="text-xs text-galactic mt-0.5">{reg.description}</p>
              </div>
            </label>
          )
        })}
      </fieldset>

      {(data.regulations || []).length > 0 && (
        <div className="border-t border-metal/20 pt-3">
          <p className="text-xs text-galactic">
            Your policy will include compliance sections for:{' '}
            <span className="text-cloudy">
              {(data.regulations || []).map(id => REGULATIONS.find(r => r.id === id)?.label).join(', ')}
            </span>
          </p>
        </div>
      )}
    </div>
  )
}
