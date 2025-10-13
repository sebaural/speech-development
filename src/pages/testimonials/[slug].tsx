import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import testimonials from '../../data/testimonials'

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function TestimonialDetailPage(): JSX.Element {
  const { slug } = useParams<{ slug?: string }>()

  const testimonial = testimonials.find((t) => {
    const tAny = t as any
    const candidate = tAny.href
      ? String(tAny.href).replace(/\/+$/g, '').split('/').pop()
      : slugify(t.name)
    return candidate === slug
  })

  if (!testimonial) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h2 className="text-2xl font-semibold">Testimonial not found</h2>
        <p className="mt-4 text-slate-600">The testimonial you requested could not be found.</p>
        <div className="mt-6">
          <Link to="/testimonials" className="text-accent underline">Back to testimonials</Link>
        </div>
      </main>
    )
  }

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <article className="mx-auto">
          { (testimonial as any).image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={(testimonial as any).image} alt={`${testimonial.name}`} className="h-20 w-20 rounded-full object-cover mb-4" />
          ) : null }
          <h1 className="text-2xl font-semibold">{testimonial.name}</h1>
          <p className="mt-4 text-lg text-slate-700">“{testimonial.quote}”</p>
          {(testimonial as any).longDescription ? (
            <p className="mt-4 text-slate-600">{(testimonial as any).longDescription}</p>
          ) : null}
          <div className="mt-6">
            <Link to="/testimonials" className="text-accent underline">Back to testimonials</Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
