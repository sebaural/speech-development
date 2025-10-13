import React, { useEffect } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import testimonials from '../../data/testimonials'

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function TestimonialDetailPage(): JSX.Element {
  const { slug } = useParams<{ slug?: string }>()
  const location = useLocation()

  const testimonial = testimonials.find((t) => {
    const tAny = t as any
    const candidate = tAny.slug || (tAny.href ? String(tAny.href).replace(/\/+$/g, '').split('/').pop() : slugify(t.name))
    return candidate === slug
  })

  // SEO: update title, description, and canonical link when we have a testimonial
  useEffect(() => {
    if (!testimonial) return

    const title = `${testimonial.name} — Преподователь`
    const description = (testimonial as any).longDescription || testimonial.quote
    const prevTitle = document.title
    document.title = title

    // meta description
    let meta = document.querySelector('meta[name="description"]')
    let prevDescription: string | null = null
    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    } else {
      prevDescription = meta.getAttribute('content')
    }
    meta.setAttribute('content', description)

    // canonical link
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const canonicalHref = `${origin}/testimonials/${slug}`
    let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null
    let prevCanonical: string | null = null
    if (!link) {
      link = document.createElement('link')
      link.setAttribute('rel', 'canonical')
      document.head.appendChild(link)
    } else {
      prevCanonical = link.getAttribute('href')
    }
    link.setAttribute('href', canonicalHref)

    return () => {
      document.title = prevTitle
      if (meta && prevDescription !== null) meta.setAttribute('content', prevDescription)
      if (link && prevCanonical !== null) link.setAttribute('href', prevCanonical)
    }
  }, [testimonial, slug, location.pathname])

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
      <main className="w-full bg-[#efefef] py-12 Teacher_Page">
        <article className="mx-auto max-w-2xl px-6 py-12 bg-white rounded-md shadow-sm prose prose-slate">
          { (testimonial as any).image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={(testimonial as any).image} alt={`${testimonial.name}`} className="h-20 w-20 rounded-full object-cover mb-4" />
          ) : null }
          <h1 className="text-2xl font-semibold">{testimonial.name}</h1>
          <p className="mt-4 text-lg text-slate-700 services">{testimonial.quote}</p>
          {(testimonial as any).longDescription ? (
            <p className="mt-4 text-slate-600">{(testimonial as any).longDescription}</p>
          ) : null}
          <div className="education">
            <h3 className='text-lg font-bold'>Образование</h3>
             {(testimonial as any).education ? (
            <div className="text-sm text-slate-500 mt-1">{(testimonial as any).education}</div>
          ) : null}
          </div>
          <div className="mt-6">
            <Link to="/testimonials" className="text-accent underline">Back to testimonials</Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
