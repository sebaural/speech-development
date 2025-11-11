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
        src="https://forms.yandex.ru/u/691268db1f1eb51c5a233365?iframe=1"
        name="ya-form-691268db1f1eb51c5a233365"
        width="100%"
        height="auto"
        style={{
          border: '1px solid #dfe3e8',
          borderRadius: '8px',
          maxWidth: '100%',
          maxHeight: '500px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        title="Contact Form"
      />
    </div>
  )
}

export default ContactForm
