import { DATA_TYPES } from '../constants.js'

const checkboxClass = 'w-4 h-4 shrink-0 rounded border-metal/50 bg-oblivion text-azure focus:ring-azure focus:ring-offset-abyss accent-azure cursor-pointer'

export default function StepDataCollection({ data, onChange }) {
  const toggleDataType = (id) => {
    const current = data.dataTypes || []
    const updated = current.includes(id)
      ? current.filter(d => d !== id)
      : [...current, id]
    onChange({ ...data, dataTypes: updated })
  }

  const categories = [
    { key: 'personal', label: 'Personal Information', icon: 'M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z' },
    { key: 'financial', label: 'Financial Information', icon: 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z' },
    { key: 'technical', label: 'Technical Information', icon: 'M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25' },
    { key: 'sensitive', label: 'Sensitive Information', icon: 'M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z' },
  ]

  return (
    <div className="space-y-6 animate-fadeIn">
      <p className="text-sm text-galactic">
        Select all types of personal data your website or service collects. This determines which sections appear in your privacy policy.
      </p>

      {categories.map(cat => {
        const items = DATA_TYPES.filter(d => d.category === cat.key)
        return (
          <fieldset key={cat.key} className="space-y-3">
            <legend className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
              <svg aria-hidden="true" className="w-5 h-5 text-azure" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d={cat.icon} />
              </svg>
              {cat.label}
            </legend>
            <div className="space-y-2 pl-7">
              {items.map(item => (
                <label
                  key={item.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={(data.dataTypes || []).includes(item.id)}
                    onChange={() => toggleDataType(item.id)}
                    className={checkboxClass}
                  />
                  <span className="text-sm text-cloudy group-hover:text-white transition-colors">{item.label}</span>
                </label>
              ))}
            </div>
          </fieldset>
        )
      })}

      {(data.dataTypes || []).length > 0 && (
        <div className="border-t border-metal/20 pt-3">
          <p className="text-xs text-galactic">
            {(data.dataTypes || []).length} data type{(data.dataTypes || []).length !== 1 ? 's' : ''} selected
          </p>
        </div>
      )}
    </div>
  )
}
