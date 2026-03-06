import { STEP_LABELS } from '../constants.js'

export default function ProgressBar({ currentStep, completedSteps }) {
  return (
    <div className="mb-6">
      {/* Mobile: simple step counter */}
      <div className="sm:hidden text-center mb-4">
        <span className="text-sm text-galactic">
          Step <span className="text-white font-semibold">{currentStep + 1}</span> of {STEP_LABELS.length}
        </span>
        <p className="text-sm font-medium text-white mt-1">{STEP_LABELS[currentStep]}</p>
      </div>

      {/* Desktop: full stepper */}
      <div className="hidden sm:flex items-center justify-between" role="list" aria-label="Form progress">
        {STEP_LABELS.map((label, i) => {
          const isCompleted = completedSteps.includes(i)
          const isCurrent = i === currentStep
          const isPast = i < currentStep

          return (
            <div key={label} className="flex items-center flex-1 last:flex-none" role="listitem">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-200
                    ${isCompleted ? 'bg-turtle/20 border-turtle text-turtle' :
                      isCurrent ? 'bg-azure/20 border-azure text-azure' :
                      'bg-oblivion border-metal/30 text-galactic'}`}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span className={`text-[11px] mt-1.5 whitespace-nowrap transition-colors
                  ${isCurrent ? 'text-white font-medium' :
                    isCompleted ? 'text-turtle' :
                    isPast ? 'text-cloudy' : 'text-galactic'}`}
                >
                  {label}
                </span>
              </div>

              {i < STEP_LABELS.length - 1 && (
                <div
                  className={`flex-1 h-px mx-2 mt-[-14px] transition-colors
                    ${isCompleted || isPast ? 'bg-turtle/40' : 'bg-metal/30'}`}
                  aria-hidden="true"
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
