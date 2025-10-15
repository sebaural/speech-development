import React from 'react'
import { Link } from 'react-router-dom'
import teachers from '../data/teachers'

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function Teachers() {
  return (
    <section id="teachers" className="py-8 sm:py-16 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-center sm:text-left">Наши педагоги</h2>
        <div className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {teachers.map((t) => {
            const tAny = t as any
            const slug = tAny.slug || (tAny.href ? String(tAny.href).replace(/\/+$/g, '').split('/').pop() : slugify(t.name))
            const href = `/teachers/${slug}`
            return (
              <Link
                key={t.name}
                to={href}
                aria-label={`Read full profile of ${t.name}`}
                className="group block rounded-lg border p-4 sm:p-6 hover:shadow-lg transition-shadow background-white"
              >
                <blockquote>
                  <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3">
                    {t.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={t.image} alt={`${t.name}`} className="h-16 w-16 sm:h-20 sm:w-20 rounded-full object-cover flex-shrink-0" />
                    ) : null}
                    <div className="text-center sm:text-left min-w-0">
                      <div className="text-sm sm:text-base text-slate-500 break-words">— {t.name}</div>
                    </div>
                  </div>

                  <p className="mt-3 text-sm sm:text-base text-slate-700 text-center sm:text-left leading-relaxed">{t.quote}</p>
                </blockquote>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
