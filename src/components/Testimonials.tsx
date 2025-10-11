import React from 'react'

const data = [
  { name: 'Alex P', quote: 'A game-changer for our product.' },
  { name: 'Jamie L', quote: 'Professional and fast. Highly recommended.' }
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 bg-slate-50">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl font-semibold">Trusted by customers</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.map((t) => (
            <blockquote key={t.name} className="rounded-lg border p-6">
              <p className="text-slate-700">“{t.quote}”</p>
              <footer className="mt-4 text-sm text-slate-500">— {t.name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
