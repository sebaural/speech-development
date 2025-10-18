import React, { useEffect } from 'react'

interface ContactFormProps {
  className?: string
}

const ContactForm: React.FC<ContactFormProps> = ({ className = '' }) => {
  useEffect(() => {
    // Load Yandex Forms script
    const script = document.createElement('script')
    script.src = 'https://forms.yandex.ru/_static/embed.js'
    script.async = true
    document.head.appendChild(script)

    // Cleanup script on component unmount
    return () => {
      const existingScript = document.querySelector('script[src="https://forms.yandex.ru/_static/embed.js"]')
      if (existingScript) {
        document.head.removeChild(existingScript)
      }
    }
  }, [])

  return (
    <div className={`contact-form-container ${className}`}>
      <iframe
        src="https://forms.yandex.ru/u/68f3e3f390fa7b75c7f46f59?iframe=1"
        name="ya-form-68f3e3f390fa7b75c7f46f59"
        width="100%"
        height="600"
        style={{
          border: 'none',
          maxWidth: '650px',
          margin: '0 auto',
          display: 'block'
        }}
        title="Contact Form"
      />
    </div>
  )
}

export default ContactForm