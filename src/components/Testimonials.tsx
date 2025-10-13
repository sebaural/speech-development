import React from 'react'
import { Link } from 'react-router-dom'
import testimonials from '../data/testimonials'

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-16 bg-slate-50">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl font-semibold">Trusted by customers</h2>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => {
            // If a testimonial provides an explicit href, derive its final slug
            // and normalize to a relative /testimonials/<slug> path so links
            // always point to the local testimonial detail page.
            const tAny = t as any
            const slug = tAny.slug || (tAny.href ? String(tAny.href).replace(/\/+$/g, '').split('/').pop() : slugify(t.name))
            const href = `/testimonials/${slug}`
            return (
              <Link
                key={t.name}
                to={href}
                aria-label={`Read full testimonial from ${t.name}`}
                className="group block rounded-lg border p-6 hover:shadow-lg transition-shadow"
              >
                <blockquote>
                  <div className="flex items-center gap-3">
                    {t.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={t.image} alt={`${t.name}`} className="h-20 w-20 rounded-full object-cover" />
                    ) : null}
                    <span className="text-sm text-slate-500">— {t.name}</span>
                  </div>

                  <p className="mt-3 text-slate-700">{t.quote}</p>
                </blockquote>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
