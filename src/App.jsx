import { useState, useCallback, useMemo } from 'react'
import { STEP_LABELS, TEST_DATA, DATA_TYPES, REGULATIONS } from './constants.js'
import ProgressBar from './components/ProgressBar.jsx'
import StepBusinessInfo from './components/StepBusinessInfo.jsx'
import StepDataCollection from './components/StepDataCollection.jsx'
import StepThirdParties from './components/StepThirdParties.jsx'
import StepDataHandling from './components/StepDataHandling.jsx'
import StepRegulations from './components/StepRegulations.jsx'
import StepContactInfo from './components/StepContactInfo.jsx'
import PolicyPreview from './components/PolicyPreview.jsx'

const INITIAL_DATA = {
  businessName: '',
  websiteUrl: '',
  businessType: '',
  country: '',
  state: '',
  dataTypes: [],
  thirdPartyServices: [],
  otherServices: '',
  retentionPeriod: '',
  customRetention: '',
  sharesWithThirdParties: false,
  sellsData: false,
  internationalTransfer: false,
  automatedDecisionMaking: false,
  regulations: [],
  contactEmail: '',
  dpoName: '',
  dpoEmail: '',
  physicalAddress: '',
  effectiveDate: new Date().toISOString().split('T')[0],
}

function getStepSummary(step, data) {
  switch (step) {
    case 0: {
      if (!data.businessName && !data.websiteUrl) return null
      const parts = []
      if (data.businessName) parts.push(data.businessName)
      if (data.country) parts.push(data.country)
      if (data.state) parts.push(data.state)
      return parts.join(' \u2022 ')
    }
    case 1: {
      const count = (data.dataTypes || []).length
      if (!count) return null
      const labels = (data.dataTypes || []).slice(0, 3).map(id => {
        const dt = DATA_TYPES.find(d => d.id === id)
        return dt ? dt.label.split(' (')[0].split(' /')[0] : id
      })
      return `${count} type${count !== 1 ? 's' : ''}: ${labels.join(', ')}${count > 3 ? '...' : ''}`
    }
    case 2: {
      const count = (data.thirdPartyServices || []).length
      if (!count) return null
      return `${count} service${count !== 1 ? 's' : ''} selected`
    }
    case 3: {
      const parts = []
      if (data.retentionPeriod) parts.push(`Retention: ${data.retentionPeriod.replace('_', ' ')}`)
      if (data.sellsData) parts.push('Sells data')
      if (data.internationalTransfer) parts.push('Int\'l transfer')
      return parts.length ? parts.join(' \u2022 ') : null
    }
    case 4: {
      const count = (data.regulations || []).length
      if (!count) return null
      return (data.regulations || []).map(id => {
        const r = REGULATIONS.find(reg => reg.id === id)
        return r ? r.label : id
      }).join(', ')
    }
    case 5: {
      if (!data.contactEmail) return null
      return data.contactEmail
    }
    default:
      return null
  }
}

function isStepValid(step, data) {
  switch (step) {
    case 0:
      return Boolean(data.businessName && data.websiteUrl && data.country)
    case 1:
      return (data.dataTypes || []).length > 0
    case 2:
      return true // third parties are optional
    case 3:
      return Boolean(data.retentionPeriod)
    case 4:
      return (data.regulations || []).length > 0
    case 5:
      return Boolean(data.contactEmail && data.effectiveDate)
    default:
      return false
  }
}

export default function App() {
  const [formData, setFormData] = useState(INITIAL_DATA)
  const [currentStep, setCurrentStep] = useState(0)
  const [mobileView, setMobileView] = useState('wizard') // 'wizard' | 'preview'
  const [collapsedSteps, setCollapsedSteps] = useState(new Set())

  const completedSteps = useMemo(() => {
    const completed = []
    for (let i = 0; i < STEP_LABELS.length; i++) {
      if (isStepValid(i, formData)) completed.push(i)
    }
    return completed
  }, [formData])

  const allStepsComplete = completedSteps.length === STEP_LABELS.length

  const handleNext = useCallback(() => {
    if (currentStep < STEP_LABELS.length - 1) {
      setCollapsedSteps(prev => new Set([...prev, currentStep]))
      setCurrentStep(prev => prev + 1)
    }
  }, [currentStep])

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
      setCollapsedSteps(prev => {
        const next = new Set(prev)
        next.delete(currentStep - 1)
        return next
      })
    }
  }, [currentStep])

  const handleStepClick = useCallback((step) => {
    setCurrentStep(step)
    setCollapsedSteps(prev => {
      const next = new Set(prev)
      next.delete(step)
      return next
    })
  }, [])

  const fillTestData = useCallback(() => {
    setFormData(TEST_DATA)
  }, [])

  const renderStep = (step) => {
    switch (step) {
      case 0: return <StepBusinessInfo data={formData} onChange={setFormData} />
      case 1: return <StepDataCollection data={formData} onChange={setFormData} />
      case 2: return <StepThirdParties data={formData} onChange={setFormData} />
      case 3: return <StepDataHandling data={formData} onChange={setFormData} />
      case 4: return <StepRegulations data={formData} onChange={setFormData} />
      case 5: return <StepContactInfo data={formData} onChange={setFormData} />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-abyss bg-glow bg-grid">
      <div id="main" className="max-w-6xl mx-auto px-4 py-8 sm:py-12 animate-fadeIn">
        {/* Breadcrumbs */}
        <nav className="mb-6 text-sm text-galactic" aria-label="Breadcrumb">
          <a href="https://seo-tools-tau.vercel.app/" className="text-azure hover:text-white transition-colors">Free Tools</a>
          <span className="mx-2 text-metal">/</span>
          <a href="https://seo-tools-tau.vercel.app/legal-compliance/" className="text-azure hover:text-white transition-colors">Legal &amp; Compliance</a>
          <span className="mx-2 text-metal">/</span>
          <span className="text-cloudy">Privacy Policy Generator</span>
        </nav>

        {/* Legal Disclaimer Banner */}
        <div className="border border-metal/30 rounded-xl p-4 bg-midnight/30 mb-8">
          <div className="flex items-start gap-3">
            <svg aria-hidden="true" className="w-5 h-5 text-galactic shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
            <div>
              <p className="text-sm text-cloudy font-semibold">Not Legal Advice</p>
              <p className="text-sm text-galactic mt-1 leading-relaxed">
                This tool generates templates and general guidance for informational purposes only, not legal advice. No attorney-client relationship is created. Laws vary by jurisdiction and change over time. Consult a qualified attorney before publishing any generated document. DreamHost provides this tool as-is with no warranty of legal accuracy or completeness.
              </p>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Privacy Policy Generator</h1>
          <p className="text-cloudy text-base sm:text-lg">
            Generate a customized privacy policy covering GDPR, CCPA, PIPEDA, and CalOPPA based on your data practices and jurisdiction.
          </p>
        </div>

        {/* Fill Test Data */}
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={fillTestData}
            className="px-3 py-1.5 text-xs font-mono bg-prince/20 text-prince border border-prince/30 rounded hover:bg-prince/30 transition-colors focus:outline-none focus:ring-2 focus:ring-prince focus:ring-offset-2 focus:ring-offset-abyss"
          >
            Fill Test Data
          </button>
        </div>

        {/* Mobile tab toggle */}
        <div className="lg:hidden flex mb-4 border border-metal/30 rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setMobileView('wizard')}
            className={`flex-1 py-2.5 text-sm font-medium text-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-inset ${
              mobileView === 'wizard'
                ? 'bg-azure text-white'
                : 'bg-oblivion text-galactic hover:text-white'
            }`}
          >
            Wizard
          </button>
          <button
            type="button"
            onClick={() => setMobileView('preview')}
            className={`flex-1 py-2.5 text-sm font-medium text-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-inset ${
              mobileView === 'preview'
                ? 'bg-azure text-white'
                : 'bg-oblivion text-galactic hover:text-white'
            }`}
          >
            Preview
          </button>
        </div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Wizard Panel */}
          <div className={`w-full lg:w-[40%] ${mobileView !== 'wizard' ? 'hidden lg:block' : ''}`}>
            <div className="card-gradient border border-metal/20 rounded-2xl p-4 sm:p-6">
              <ProgressBar currentStep={currentStep} completedSteps={completedSteps} />

              {/* Collapsed completed steps */}
              <div className="space-y-2 mb-4">
                {Array.from({ length: STEP_LABELS.length }, (_, i) => i).map(stepIdx => {
                  if (stepIdx === currentStep) return null
                  const isCompleted = completedSteps.includes(stepIdx)
                  const isCollapsed = collapsedSteps.has(stepIdx) || stepIdx < currentStep
                  const summary = getStepSummary(stepIdx, formData)

                  if (!isCollapsed || !summary) return null

                  return (
                    <button
                      key={stepIdx}
                      type="button"
                      onClick={() => handleStepClick(stepIdx)}
                      className="w-full flex items-center justify-between p-3 rounded-lg border border-metal/20 bg-oblivion/50 hover:bg-oblivion transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss"
                      aria-label={`Edit ${STEP_LABELS[stepIdx]}`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        {isCompleted && (
                          <svg aria-hidden="true" className="w-4 h-4 text-turtle shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                          </svg>
                        )}
                        <span className="text-xs font-medium text-galactic shrink-0">
                          {stepIdx + 1}. {STEP_LABELS[stepIdx]}
                        </span>
                        <span className="text-xs text-cloudy truncate">
                          {summary}
                        </span>
                      </div>
                      <svg aria-hidden="true" className="w-4 h-4 text-galactic shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
                      </svg>
                    </button>
                  )
                })}
              </div>

              {/* Current step */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-white mb-1">
                  {currentStep + 1}. {STEP_LABELS[currentStep]}
                </h2>
              </div>

              {renderStep(currentStep)}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-metal/20">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-cloudy hover:text-white disabled:text-metal disabled:cursor-not-allowed transition-colors rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss"
                >
                  <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                  Back
                </button>

                {currentStep < STEP_LABELS.length - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-5 py-2 text-sm font-medium bg-azure text-white rounded-lg hover:bg-azure-hover transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss"
                  >
                    Next
                    <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setMobileView('preview')}
                    disabled={!allStepsComplete}
                    className="flex items-center gap-1.5 px-5 py-2 text-sm font-medium bg-turtle text-abyss rounded-lg hover:bg-turtle/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-turtle focus-visible:ring-offset-2 focus-visible:ring-offset-abyss"
                  >
                    <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                    </svg>
                    Generate Policy
                  </button>
                )}
              </div>

              {!isStepValid(currentStep, formData) && currentStep !== 2 && (
                <p className="text-xs text-tangerine mt-3 flex items-center gap-1.5">
                  <svg aria-hidden="true" className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>
                  Complete required fields to continue
                </p>
              )}
            </div>
          </div>

          {/* Preview Panel */}
          <div className={`w-full lg:w-[60%] ${mobileView !== 'preview' ? 'hidden lg:block' : ''}`}>
            <div className="card-gradient border border-metal/20 rounded-2xl p-4 sm:p-6 lg:sticky lg:top-6" style={{ maxHeight: 'calc(100vh - 3rem)' }}>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-semibold text-white">Document Preview</h2>
                {allStepsComplete && (
                  <span className="flex items-center gap-1 text-xs text-turtle">
                    <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    Complete
                  </span>
                )}
              </div>
              <PolicyPreview data={formData} isComplete={allStepsComplete} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-metal/30 mt-16 py-8 text-center text-galactic text-sm">
          Free marketing tools by{' '}
          <a
            href="https://www.dreamhost.com"
            target="_blank"
            rel="noopener"
            className="text-azure hover:text-white transition-colors"
          >
            DreamHost
          </a>
        </footer>
      </div>
    </div>
  )
}
