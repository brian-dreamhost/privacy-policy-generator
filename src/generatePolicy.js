import { DATA_TYPES, THIRD_PARTY_SERVICES, RETENTION_OPTIONS } from './constants.js'

function formatDate(dateStr) {
  if (!dateStr) return '[Date]'
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

function getRetentionText(period, custom) {
  if (period === 'custom' && custom) return custom
  const opt = RETENTION_OPTIONS.find(o => o.value === period)
  return opt ? opt.label.toLowerCase() : 'as long as necessary'
}

function getSelectedDataTypes(ids) {
  return DATA_TYPES.filter(d => ids.includes(d.id))
}

function getSelectedServices(ids) {
  return THIRD_PARTY_SERVICES.filter(s => ids.includes(s.id))
}

export function generatePolicyText(data) {
  const {
    businessName = '[Business Name]',
    websiteUrl = '[Website URL]',
    businessType = '',
    country = '',
    dataTypes = [],
    thirdPartyServices = [],
    otherServices = '',
    retentionPeriod = '',
    sharesWithThirdParties = false,
    sellsData = false,
    internationalTransfer = false,
    automatedDecisionMaking = false,
    regulations = [],
    contactEmail = '[email]',
    dpoName = '',
    dpoEmail = '',
    physicalAddress = '',
    effectiveDate = '',
  } = data

  const selectedData = getSelectedDataTypes(dataTypes)
  const selectedServices = getSelectedServices(thirdPartyServices)
  const retentionText = getRetentionText(retentionPeriod, data.customRetention)
  const hasGdpr = regulations.includes('gdpr')
  const hasCcpa = regulations.includes('ccpa')
  const hasPipeda = regulations.includes('pipeda')
  const hasCaloppa = regulations.includes('caloppa')
  const hasCoppa = regulations.includes('coppa')
  const hasChildren = dataTypes.includes('children')
  const hasCookies = dataTypes.includes('cookies') || dataTypes.includes('browsing')
  const hasPayment = dataTypes.includes('payment')

  const sections = []

  // 1. Introduction
  sections.push({
    title: 'Introduction',
    content: `This Privacy Policy describes how ${businessName} ("we," "us," or "our") collects, uses, stores, and protects your personal information when you visit ${websiteUrl} (the "Website") and use our services.

We are committed to protecting your privacy and handling your personal information responsibly. This policy applies to all information collected through our Website, as well as any related services, sales, marketing, or events.

By accessing or using our Website, you agree to the collection and use of information in accordance with this policy. If you do not agree with the terms of this policy, please do not access the Website.${businessType ? `\n\n${businessName} operates as a ${businessType}${country ? ` based in ${country}` : ''}.` : ''}

Effective date: ${formatDate(effectiveDate)}`
  })

  // 2. Information We Collect
  if (selectedData.length > 0) {
    const personalData = selectedData.filter(d => d.category === 'personal')
    const technicalData = selectedData.filter(d => d.category === 'technical')
    const financialData = selectedData.filter(d => d.category === 'financial')
    const sensitiveData = selectedData.filter(d => d.category === 'sensitive')

    let content = 'We collect the following types of information:\n'

    if (personalData.length > 0) {
      content += '\nPersonal Information:\n'
      personalData.forEach(d => {
        if (d.id === 'contact') content += '- Name, email address, phone number, and other contact details you provide\n'
        if (d.id === 'account') content += '- Account credentials including username and encrypted password\n'
        if (d.id === 'shipping') content += '- Shipping and mailing addresses for order fulfillment\n'
        if (d.id === 'social') content += '- Social media profile information when you connect your accounts\n'
        if (d.id === 'ugc') content += '- Content you create, upload, or share through our services (comments, reviews, posts)\n'
      })
    }

    if (financialData.length > 0) {
      content += '\nFinancial Information:\n'
      financialData.forEach(d => {
        if (d.id === 'payment') content += '- Payment card details, billing address, and transaction history (processed securely through our payment providers)\n'
      })
    }

    if (technicalData.length > 0) {
      content += '\nTechnical Information:\n'
      technicalData.forEach(d => {
        if (d.id === 'ip_device') content += '- IP address, browser type and version, operating system, device identifiers, and hardware information\n'
        if (d.id === 'browsing') content += '- Pages visited, time spent on pages, click patterns, referring URLs, and other browsing behavior\n'
        if (d.id === 'cookies') content += '- Cookie identifiers, pixel tags, web beacons, and similar tracking technology data\n'
        if (d.id === 'location') content += '- Approximate or precise geographic location based on IP address, GPS, or other location technologies\n'
      })
    }

    if (sensitiveData.length > 0) {
      content += '\nSensitive Information:\n'
      sensitiveData.forEach(d => {
        if (d.id === 'children') content += '- Information from users under the age of 13 (collected only with verifiable parental consent)\n'
        if (d.id === 'health') content += '- Health and medical information (collected only when strictly necessary and with your explicit consent)\n'
        if (d.id === 'biometric') content += '- Biometric data such as fingerprints or facial recognition data (collected only with your explicit consent)\n'
      })
    }

    sections.push({ title: 'Information We Collect', content })
  }

  // 3. How We Collect Information
  {
    let content = 'We collect information through the following methods:\n'
    content += '\nDirectly from you:\n'
    content += '- When you create an account or fill out forms on our Website\n'
    content += '- When you make a purchase or subscribe to our services\n'
    content += '- When you contact us via email, phone, or our contact forms\n'
    content += '- When you participate in surveys, promotions, or other interactive features\n'

    if (hasCookies || dataTypes.includes('ip_device')) {
      content += '\nAutomatically:\n'
      content += '- Through cookies and similar tracking technologies when you browse our Website\n'
      content += '- Server logs that record your IP address, browser type, and access times\n'
      if (dataTypes.includes('location')) {
        content += '- Location data derived from your IP address or device settings\n'
      }
    }

    if (thirdPartyServices.length > 0) {
      content += '\nFrom third parties:\n'
      content += '- Analytics providers that help us understand Website usage\n'
      if (dataTypes.includes('social')) {
        content += '- Social media platforms when you interact with our content or connect your accounts\n'
      }
      if (hasPayment) {
        content += '- Payment processors that handle transaction verification\n'
      }
    }

    sections.push({ title: 'How We Collect Information', content })
  }

  // 4. How We Use Your Information
  {
    let content = 'We use the information we collect for the following purposes:\n\n'
    content += '- To provide, operate, and maintain our Website and services\n'
    content += '- To improve, personalize, and expand our Website and services\n'
    content += '- To understand and analyze how you use our Website\n'
    content += '- To communicate with you, including for customer service, updates, and marketing\n'

    if (hasPayment) {
      content += '- To process transactions and send related information (confirmations, invoices)\n'
    }
    if (dataTypes.includes('account')) {
      content += '- To create and manage your user account\n'
    }
    content += '- To detect, prevent, and address technical issues, fraud, and security concerns\n'
    content += '- To comply with legal obligations and enforce our terms of service\n'

    if (hasGdpr) {
      content += '\nLegal Bases for Processing (GDPR):\n'
      content += 'We process your personal data based on the following legal grounds:\n'
      content += '- Consent: Where you have given us clear consent to process your data for a specific purpose\n'
      content += '- Contractual necessity: Where processing is necessary to perform a contract with you\n'
      content += '- Legal obligation: Where processing is necessary to comply with a legal requirement\n'
      content += '- Legitimate interests: Where processing is necessary for our legitimate business interests, provided these do not override your rights and freedoms\n'
    }

    sections.push({ title: 'How We Use Your Information', content })
  }

  // 5. Third-Party Services
  if (selectedServices.length > 0 || otherServices) {
    let content = 'We use the following third-party service providers to help us operate our Website and deliver our services. These providers may have access to your personal information only to perform specific tasks on our behalf and are obligated not to disclose or use it for other purposes.\n'

    selectedServices.forEach(service => {
      content += `\n${service.label}`
      if (service.url) {
        content += ` — Privacy Policy: ${service.url}`
      }
    })

    if (otherServices) {
      content += `\n\nAdditional services: ${otherServices}`
    }

    content += '\n\nWe recommend reviewing the privacy policies of these third-party services to understand how they handle your data.'

    sections.push({ title: 'Third-Party Services', content })
  }

  // 6. Cookies and Tracking
  if (hasCookies) {
    let content = `When you visit ${websiteUrl}, we and our third-party partners may use cookies, pixel tags, web beacons, and similar tracking technologies to collect information about your browsing activities.\n`
    content += '\nTypes of cookies we use:\n'
    content += '- Essential cookies: Required for the Website to function properly (e.g., session management, security)\n'
    content += '- Analytics cookies: Help us understand how visitors interact with our Website by collecting information anonymously\n'
    content += '- Functional cookies: Enable enhanced functionality and personalization (e.g., remembering preferences)\n'

    if (thirdPartyServices.includes('google_ads') || thirdPartyServices.includes('facebook_pixel')) {
      content += '- Advertising cookies: Used to deliver relevant advertisements and track campaign performance\n'
    }

    content += '\nManaging cookies:\n'
    content += 'You can control and manage cookies through your browser settings. Most browsers allow you to:\n'
    content += '- View what cookies are stored and delete them individually\n'
    content += '- Block third-party cookies\n'
    content += '- Block all cookies from specific sites\n'
    content += '- Block all cookies from being set\n'
    content += '- Delete all cookies when you close your browser\n'
    content += '\nPlease note that disabling cookies may affect the functionality of our Website.'

    if (hasGdpr) {
      content += '\n\nFor visitors in the European Economic Area (EEA), we obtain your consent before placing non-essential cookies on your device, in compliance with GDPR and the ePrivacy Directive.'
    }

    sections.push({ title: 'Cookies and Tracking Technologies', content })
  }

  // 7. Data Sharing and Disclosure
  {
    let content = ''
    if (sellsData) {
      content += 'We may sell certain categories of personal information to third parties. '
      if (hasCcpa) {
        content += 'California residents have the right to opt out of the sale of their personal information (see "Your Privacy Rights" below).\n\n'
      }
    } else {
      content += 'We do not sell your personal information to third parties.\n\n'
    }

    if (sharesWithThirdParties) {
      content += 'We may share your information with third parties beyond our service providers in the following circumstances:\n'
    } else {
      content += 'We may share your information in the following limited circumstances:\n'
    }

    content += '- With service providers who assist us in operating our Website and conducting business\n'
    content += '- When required by law, regulation, or legal process (e.g., court order, subpoena)\n'
    content += '- To protect the rights, property, or safety of our business, users, or the public\n'
    content += '- In connection with a merger, acquisition, or sale of all or a portion of our assets\n'
    content += '- With your consent or at your direction\n'

    if (sharesWithThirdParties) {
      content += '\nWe may also share aggregated or de-identified information with third parties for research, marketing, analytics, and other purposes, provided that such information does not identify you personally.'
    }

    sections.push({ title: 'Data Sharing and Disclosure', content })
  }

  // 8. Data Retention
  {
    let content = `We retain your personal information for ${retentionText}, or for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required or permitted by law.\n\n`
    content += 'When determining the appropriate retention period, we consider:\n'
    content += '- The amount, nature, and sensitivity of the personal information\n'
    content += '- The potential risk of harm from unauthorized use or disclosure\n'
    content += '- The purposes for which we process the information\n'
    content += '- Whether we can achieve those purposes through other means\n'
    content += '- Applicable legal, regulatory, tax, accounting, or other requirements\n\n'
    content += 'When your personal information is no longer needed, we will securely delete or anonymize it.'

    sections.push({ title: 'Data Retention', content })
  }

  // 9. Your Privacy Rights (conditional)
  {
    let content = ''

    if (hasGdpr) {
      content += 'Your Rights Under the GDPR\n\n'
      content += 'If you are a resident of the European Economic Area (EEA), you have the following data protection rights:\n\n'
      content += '- Right of access: You can request a copy of the personal data we hold about you.\n'
      content += '- Right to rectification: You can request that we correct any inaccurate or incomplete personal data.\n'
      content += '- Right to erasure: You can request that we delete your personal data in certain circumstances ("right to be forgotten").\n'
      content += '- Right to restrict processing: You can request that we restrict the processing of your personal data.\n'
      content += '- Right to data portability: You can request a copy of your data in a structured, commonly used, machine-readable format.\n'
      content += '- Right to object: You can object to our processing of your personal data based on legitimate interests or for direct marketing purposes.\n'
      content += '- Right to withdraw consent: Where we rely on consent, you can withdraw it at any time without affecting the lawfulness of prior processing.\n'
      content += `\nTo exercise these rights, please contact us at ${contactEmail}.`
      if (dpoName) {
        content += ` You may also contact our Data Protection Officer, ${dpoName}${dpoEmail ? `, at ${dpoEmail}` : ''}.`
      }
      content += '\n\nYou also have the right to lodge a complaint with your local data protection supervisory authority.\n'
    }

    if (hasCcpa) {
      if (content) content += '\n'
      content += 'Your Rights Under the CCPA/CPRA\n\n'
      content += 'If you are a California resident, you have the following rights under the California Consumer Privacy Act (as amended by the California Privacy Rights Act):\n\n'
      content += '- Right to know: You can request that we disclose what personal information we collect, use, share, and sell about you.\n'
      content += '- Right to delete: You can request that we delete the personal information we have collected about you.\n'
      content += '- Right to correct: You can request that we correct inaccurate personal information.\n'
      content += '- Right to opt-out of sale/sharing: You can opt out of the sale or sharing of your personal information for cross-context behavioral advertising.\n'
      content += '- Right to limit use of sensitive information: You can limit how we use and disclose your sensitive personal information.\n'
      content += '- Right to non-discrimination: We will not discriminate against you for exercising any of these rights.\n'
      content += `\nTo exercise these rights, please contact us at ${contactEmail}. We will respond to verifiable consumer requests within 45 days.\n`
      if (sellsData) {
        content += '\nTo opt out of the sale of your personal information, please contact us using the information provided in the "Contact Us" section below.\n'
      }
    }

    if (hasPipeda) {
      if (content) content += '\n'
      content += 'Your Rights Under PIPEDA\n\n'
      content += 'If you are a Canadian resident, under the Personal Information Protection and Electronic Documents Act, you have the following rights:\n\n'
      content += '- Right to access: You can request access to the personal information we hold about you.\n'
      content += '- Right to correction: You can request that we correct any errors or omissions in your personal information.\n'
      content += '- Right to withdraw consent: You can withdraw your consent to the collection, use, or disclosure of your personal information at any time, subject to legal or contractual restrictions.\n'
      content += '- Right to complain: You can file a complaint with the Office of the Privacy Commissioner of Canada if you believe your privacy rights have been violated.\n'
      content += `\nTo exercise these rights, please contact us at ${contactEmail}.\n`
    }

    if (hasCaloppa) {
      if (content) content += '\n'
      content += 'CalOPPA Compliance\n\n'
      content += 'In accordance with the California Online Privacy Protection Act (CalOPPA), we agree to the following:\n\n'
      content += '- Users can visit our Website anonymously.\n'
      content += '- This privacy policy link is clearly accessible on our home page or the first significant page after entering our Website.\n'
      content += '- Our privacy policy clearly identifies the information being collected and the parties with whom it is shared.\n'
      content += '- Users will be notified of any changes to our privacy policy on this page.\n'
      content += '- Users can change their personal information by emailing us or by logging in to their account.\n'
      content += '\nDo Not Track (DNT) Signals:\n'
      content += 'We honor Do Not Track signals. When a DNT browser mechanism is activated, we do not track users across third-party websites.\n'
    }

    if (!content) {
      content = 'Depending on your location, you may have certain rights regarding your personal information. Please contact us to exercise these rights.'
    }

    sections.push({ title: 'Your Privacy Rights', content })
  }

  // 10. International Data Transfers
  if (internationalTransfer) {
    let content = `Your information may be transferred to and maintained on servers located outside your country, state, or jurisdiction, where data protection laws may differ from those in your location.\n\n`
    content += `If you are located outside the country where our servers are based and choose to provide information to us, please note that we transfer the data to our servers and process it there.\n\n`

    if (hasGdpr) {
      content += 'For transfers of personal data from the EEA to countries not recognized as providing an adequate level of data protection, we implement appropriate safeguards such as:\n\n'
      content += '- Standard Contractual Clauses (SCCs) approved by the European Commission\n'
      content += '- Binding Corporate Rules\n'
      content += '- Certification under recognized frameworks\n\n'
    }

    content += 'Your consent to this Privacy Policy followed by your submission of information constitutes your agreement to such transfers.'

    sections.push({ title: 'International Data Transfers', content })
  }

  // 11. Children's Privacy
  if (hasChildren || hasCoppa) {
    let content = ''
    if (hasCoppa) {
      content += 'We comply with the Children\'s Online Privacy Protection Act (COPPA). '
    }

    if (hasChildren) {
      content += 'We may collect limited personal information from children under the age of 13 only with verifiable parental consent.\n\n'
      content += 'If we learn that we have collected personal information from a child under 13 without proper parental consent, we will take steps to delete that information as quickly as possible.\n\n'
      content += 'Parents and guardians have the right to:\n'
      content += '- Review the personal information we have collected from their child\n'
      content += '- Request deletion of their child\'s personal information\n'
      content += '- Refuse to allow further collection or use of their child\'s information\n'
      content += `\nTo exercise these rights, please contact us at ${contactEmail}.`
    } else {
      content += 'Our Website is not directed to children under the age of 13, and we do not knowingly collect personal information from children under 13.\n\n'
      content += `If we discover that we have inadvertently collected personal information from a child under 13, we will take steps to delete that information as quickly as possible. If you believe a child under 13 has provided us with personal information, please contact us at ${contactEmail}.`
    }

    sections.push({ title: "Children's Privacy", content })
  }

  // 12. Security Measures
  {
    let content = 'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:\n\n'
    content += '- Encryption of data in transit using TLS/SSL protocols\n'
    content += '- Encryption of sensitive data at rest\n'
    content += '- Regular security assessments and vulnerability scanning\n'
    content += '- Access controls limiting employee access to personal data on a need-to-know basis\n'
    content += '- Employee training on data protection and security best practices\n'
    if (hasPayment) {
      content += '- PCI-DSS compliance for payment card processing\n'
    }
    content += '\nHowever, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.'

    sections.push({ title: 'Security Measures', content })
  }

  // 13. Changes to This Policy
  {
    const content = `We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors. When we make material changes, we will:\n\n- Update the "Effective Date" at the top of this policy\n- Post the updated policy prominently on our Website\n- Notify you by email (if we have your email address) or through a notice on our Website before the changes take effect\n\nWe encourage you to review this policy periodically to stay informed about how we are protecting your information. Your continued use of the Website after changes are posted constitutes your acceptance of the updated policy.`

    sections.push({ title: 'Changes to This Policy', content })
  }

  // 14. Contact Us
  {
    let content = `If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:\n\n`
    content += `Email: ${contactEmail}\n`
    if (physicalAddress) {
      content += `Address: ${physicalAddress}\n`
    }
    if (dpoName && hasGdpr) {
      content += `\nData Protection Officer: ${dpoName}\n`
      if (dpoEmail) {
        content += `DPO Email: ${dpoEmail}\n`
      }
    }
    if (hasGdpr) {
      content += '\nIf you are not satisfied with our response, you have the right to lodge a complaint with your local data protection supervisory authority.'
    }

    sections.push({ title: 'Contact Us', content })
  }

  return {
    title: `Privacy Policy for ${businessName}`,
    effectiveDate: formatDate(effectiveDate),
    sections,
  }
}

export function policyToPlainText(policy) {
  let text = `${policy.title}\n`
  text += `Effective Date: ${policy.effectiveDate}\n`
  text += '='.repeat(60) + '\n\n'

  policy.sections.forEach((section, i) => {
    text += `${i + 1}. ${section.title}\n`
    text += '-'.repeat(40) + '\n\n'
    text += section.content + '\n\n'
  })

  return text.trim()
}

export function policyToHtml(policy) {
  let html = `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>${policy.title}</title>\n<style>\nbody { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 2rem; color: #333; }\nh1 { color: #111; border-bottom: 2px solid #eee; padding-bottom: 0.5rem; }\nh2 { color: #222; margin-top: 2rem; }\np { margin: 0.5rem 0; }\nul { padding-left: 1.5rem; }\nli { margin: 0.25rem 0; }\n.effective-date { color: #666; font-style: italic; }\n</style>\n</head>\n<body>\n`

  html += `<h1>${policy.title}</h1>\n`
  html += `<p class="effective-date">Effective Date: ${policy.effectiveDate}</p>\n\n`

  policy.sections.forEach((section, i) => {
    html += `<h2>${i + 1}. ${section.title}</h2>\n`
    const lines = section.content.split('\n')
    let inList = false

    lines.forEach(line => {
      const trimmed = line.trim()
      if (!trimmed) {
        if (inList) {
          html += '</ul>\n'
          inList = false
        }
        return
      }

      if (trimmed.startsWith('- ')) {
        if (!inList) {
          html += '<ul>\n'
          inList = true
        }
        html += `  <li>${trimmed.slice(2)}</li>\n`
      } else {
        if (inList) {
          html += '</ul>\n'
          inList = false
        }
        if (trimmed.endsWith(':')) {
          html += `<p><strong>${trimmed}</strong></p>\n`
        } else {
          html += `<p>${trimmed}</p>\n`
        }
      }
    })

    if (inList) {
      html += '</ul>\n'
    }
    html += '\n'
  })

  html += '</body>\n</html>'
  return html
}

export function policyToMarkdown(policy) {
  let md = `# ${policy.title}\n\n`
  md += `*Effective Date: ${policy.effectiveDate}*\n\n---\n\n`

  policy.sections.forEach((section, i) => {
    md += `## ${i + 1}. ${section.title}\n\n`
    const lines = section.content.split('\n')

    lines.forEach(line => {
      const trimmed = line.trim()
      if (!trimmed) {
        md += '\n'
        return
      }
      if (trimmed.startsWith('- ')) {
        md += trimmed + '\n'
      } else if (trimmed.endsWith(':')) {
        md += `**${trimmed}**\n\n`
      } else {
        md += trimmed + '\n'
      }
    })

    md += '\n'
  })

  return md.trim()
}
