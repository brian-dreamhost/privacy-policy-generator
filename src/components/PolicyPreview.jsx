import { useState, useMemo } from 'react'
import { generatePolicyText, policyToPlainText, policyToHtml, policyToMarkdown } from '../generatePolicy.js'

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

function readingTime(wordCount) {
  const mins = Math.ceil(wordCount / 200)
  return mins < 1 ? 'Less than 1 min' : `${mins} min read`
}

export default function PolicyPreview({ data, isComplete }) {
  const [copiedFormat, setCopiedFormat] = useState(null)

  const policy = useMemo(() => generatePolicyText(data), [data])
  const plainText = useMemo(() => policyToPlainText(policy), [policy])
  const wordCount = useMemo(() => countWords(plainText), [plainText])

  const copyAs = async (format) => {
    let text
    switch (format) {
      case 'text':
        text = plainText
        break
      case 'html':
        text = policyToHtml(policy)
        break
      case 'markdown':
        text = policyToMarkdown(policy)
        break
      default:
        return
    }

    try {
      await navigator.clipboard.writeText(text)
      setCopiedFormat(format)
      setTimeout(() => setCopiedFormat(null), 2000)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = text
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopiedFormat(format)
      setTimeout(() => setCopiedFormat(null), 2000)
    }
  }

  const downloadTxt = () => {
    const blob = new Blob([plainText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `privacy-policy-${data.businessName ? data.businessName.toLowerCase().replace(/\s+/g, '-') : 'document'}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const CopyButton = ({ format, label }) => (
    <button
      type="button"
      onClick={() => copyAs(format)}
      className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-metal/30 rounded-lg text-cloudy hover:text-white hover:border-metal/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss"
      aria-label={`Copy as ${label}`}
    >
      {copiedFormat === format ? (
        <>
          <svg aria-hidden="true" className="w-3.5 h-3.5 text-turtle" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <span className="text-turtle">Copied</span>
        </>
      ) : (
        <>
          <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9.75a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
          </svg>
          {label}
        </>
      )}
    </button>
  )

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* Header with stats and actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-4 text-xs text-galactic">
          <span>{wordCount.toLocaleString()} words</span>
          <span>{readingTime(wordCount)}</span>
          <span>{policy.sections.length} sections</span>
        </div>
      </div>

      {/* Export buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <CopyButton format="text" label="Plain Text" />
        <CopyButton format="html" label="HTML" />
        <CopyButton format="markdown" label="Markdown" />
        <button
          type="button"
          onClick={downloadTxt}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-metal/30 rounded-lg text-cloudy hover:text-white hover:border-metal/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-azure focus-visible:ring-offset-2 focus-visible:ring-offset-abyss"
          aria-label="Download as text file"
        >
          <svg aria-hidden="true" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Download .txt
        </button>
      </div>

      {/* Document preview */}
      <div
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-oblivion/50 border border-metal/20 rounded-xl p-4 sm:p-6"
        aria-live="polite"
        role="region"
        aria-label="Privacy policy preview"
      >
        {policy.sections.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <svg aria-hidden="true" className="w-12 h-12 text-metal/40 mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
            <p className="text-galactic text-sm">Complete the wizard to generate your privacy policy</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="border-b border-metal/20 pb-4">
              <h2 className="text-lg sm:text-xl font-bold text-white">{policy.title}</h2>
              <p className="text-sm text-galactic mt-1">Effective Date: {policy.effectiveDate}</p>
            </div>

            {policy.sections.map((section, i) => (
              <div key={i} className="space-y-2">
                <h3 className="text-base font-semibold text-white">
                  {i + 1}. {section.title}
                </h3>
                <div className="text-sm text-cloudy leading-relaxed whitespace-pre-line break-words">
                  {section.content}
                </div>
              </div>
            ))}

            {isComplete && (
              <div className="border-t border-metal/20 pt-4 mt-6">
                <div className="flex items-center gap-2 text-turtle text-sm">
                  <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                  Policy generation complete
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
