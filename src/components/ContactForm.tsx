import React, { useEffect } from 'react'

export default function ContactForm(): JSX.Element {
  useEffect(() => {
    const src = 'https://forms.yandex.ru/_static/embed.js'
    // Only add script if not present
    if (!document.querySelector(`script[src="${src}"]`)) {
      const s = document.createElement('script')
      s.src = src
      s.async = true
      document.body.appendChild(s)
      // keep reference so we can remove it if this component added it
      return () => {
        s.remove()
      }
    }
    return
  }, [])

  return (
    <div id="yandex-form-embed" className="my-6">
      <iframe
        title="Contact form"
        src="https://forms.yandex.ru/u/661c3d2384227c3db72afb3f/?iframe=1"
        name="ya-form-661c3d2384227c3db72afb3f"
        frameBorder={0}
        width="100%"
        height={600}
        style={{ backgroundColor: '#f3f4f6', borderRadius: 6 }}
      />
    </div>
  )
}
// ...existing code...