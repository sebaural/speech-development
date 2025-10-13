import React, { useEffect } from 'react'
import { useParams, Link, useLocation } from 'react-router-dom'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import teachers from '../../data/teachers'

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function TeacherDetailPage(): JSX.Element {
  const { slug } = useParams<{ slug?: string }>()
  const location = useLocation()

  const teacher = teachers.find((t) => {
    const tAny = t as any
    const candidate = tAny.slug || (tAny.href ? String(tAny.href).replace(/\/+$/g, '').split('/').pop() : slugify(t.name))
    return candidate === slug
  })

  useEffect(() => {
    if (!teacher) return

    const title = `${teacher.name} — Преподаватель`
    const description = (teacher as any).longDescription || teacher.quote
    const prevTitle = document.title
    document.title = title

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

    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const canonicalHref = `${origin}/teachers/${slug}`
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
  }, [teacher, slug, location.pathname])

  if (!teacher) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h2 className="text-2xl font-semibold">Teacher not found</h2>
        <p className="mt-4 text-slate-600">The teacher you requested could not be found.</p>
        <div className="mt-6">
          <Link to="/teachers" className="text-accent underline">Back to teachers</Link>
        </div>
      </main>
    )
  }

  return (
    <>
      <Nav />
      <main className="w-full bg-[#efefef] py-12 Teacher_Page">
        <article className="mx-auto max-w-2xl p-6 bg-white rounded-md shadow-sm prose prose-slate">
          <div className="picture-container">
{ (teacher as any).image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={(teacher as any).image} alt={`${teacher.name}`} className="teacher-image h-20 w-20 rounded-full object-cover mb-2" />
          ) : null }
          </div>
          
          <h1 className="text-2xl font-semibold">{teacher.name}</h1>
          <p className="mt-4 text-lg text-slate-700">{teacher.quote}</p>
          {(teacher as any).longDescription ? (
            <p className="mt-4 text-slate-600">{(teacher as any).longDescription}</p>
          ) : null}
          <div className="teacher-education">
            <h3 className="text-lg font-semibold text-slate-800">Образование</h3>
            {(teacher as any).education ? (
            <div className="text-sm text-slate-500 mt-1">{(teacher as any).education}</div>
          ) : null}
          </div>
          <div className="mt-6">
            <Link to="/teachers" className="text-accent underline">Back to teachers</Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
