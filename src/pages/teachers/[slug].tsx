import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom'

import ContactForm from '../../components/ContactForm'
import Footer from '../../components/Footer'
import Nav from '../../components/Nav'
import teachers from '../../data/teachers'

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

interface Teacher {
  name: string
  quote: string
  image?: string
  slug?: string
  href?: string
  longDescription?: string
  education?: string
  additionalCourses?: string[]
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Convert a name to a URL-friendly slug
 */
function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * Update document meta tags for SEO optimization
 */
function updateMetaTags(teacher: Teacher, slug: string, pathname: string) {
  const title = `${teacher.name} — Преподаватель`
  const description = teacher.longDescription || teacher.quote
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const canonicalHref = `${origin}/teachers/${slug}`

  // Store previous values for cleanup
  const prevTitle = document.title

  // Update page title
  document.title = title

  // Update meta description
  let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement
  let prevDescription: string | null = null
  
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute('name', 'description')
    document.head.appendChild(meta)
  } else {
    prevDescription = meta.getAttribute('content')
  }
  meta.setAttribute('content', description)

  // Update canonical link
  let link = document.querySelector("link[rel='canonical']") as HTMLLinkElement
  let prevCanonical: string | null = null
  
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  } else {
    prevCanonical = link.getAttribute('href')
  }
  link.setAttribute('href', canonicalHref)

  // Return cleanup function to restore previous values
  return () => {
    document.title = prevTitle
    if (meta && prevDescription !== null) {
      meta.setAttribute('content', prevDescription)
    }
    if (link && prevCanonical !== null) {
      link.setAttribute('href', prevCanonical)
    }
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Find teacher by slug from teachers data
 */
function findTeacherBySlug(slug: string | undefined): Teacher | undefined {
  if (!slug) return undefined
  
  return teachers.find((teacher) => {
    const teacherAny = teacher as any
    const candidate = teacherAny.slug || 
      (teacherAny.href 
        ? String(teacherAny.href).replace(/\/+$/g, '').split('/').pop() 
        : slugify(teacher.name)
      )
    return candidate === slug
  }) as Teacher | undefined
}

/**
 * 404 Not Found Component
 */
function TeacherNotFound({ onTeachersClick }: { onTeachersClick: (e: React.MouseEvent<HTMLAnchorElement>) => void }): JSX.Element {
  return (
    <main className="mx-auto max-w-4xl px-4 sm:px-6 py-12 sm:py-24 text-center">
      <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
        Преподаватель не найден
      </h2>
      <p className="mt-4 text-sm sm:text-base text-slate-600">
        Запрашиваемый преподаватель не найден.
      </p>
      <div className="mt-6">
        <Link 
          to="/teachers" 
          onClick={onTeachersClick}
          className="underline transition-colors text-sm sm:text-base font-semibold"
          style={{ color: 'rgb(14, 165, 233)' }}
        >
          Вернуться к преподавателям
        </Link>
      </div>
    </main>
  )
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function TeacherDetailPage(): JSX.Element {
  // ============================================================================
  // HOOKS & STATE
  // ============================================================================
  
  const { slug } = useParams<{ slug?: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const [isCoursesExpanded, setIsCoursesExpanded] = useState(false)

  // ============================================================================
  // DATA FETCHING
  // ============================================================================
  
  const teacher = findTeacherBySlug(slug)

  // ============================================================================
  // EFFECTS
  // ============================================================================
  
  // Update SEO meta tags when teacher or location changes
  useEffect(() => {
    if (!teacher || !slug) return
    return updateMetaTags(teacher, slug, location.pathname)
  }, [teacher, slug, location.pathname])

  // ============================================================================
  // HANDLERS
  // ============================================================================
  
  const handleToggleCourses = () => {
    setIsCoursesExpanded(!isCoursesExpanded)
  }

  const handleTeachersClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    navigate('/teachers')
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 0)
  }

  // ============================================================================
  // EARLY RETURNS
  // ============================================================================
  
  if (!teacher) {
    return <TeacherNotFound onTeachersClick={handleTeachersClick} />
  }

  // ============================================================================
  // RENDER
  // ============================================================================
  
  return (
    <>
      <Nav />
      
      <main className="w-full bg-[#efefef] py-6 px-4 sm:py-12">
        <article className="mx-auto max-w-4xl p-4 sm:p-8 bg-white rounded-lg shadow-sm prose prose-slate">
          
          {/* Teacher Header Section */}
          <header className="teacher-header flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-8 not-prose">
            
            {/* Profile Image */}
            {teacher.image && (
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <img 
                  src={teacher.image} 
                  alt={`Фото ${teacher.name}`}
                  className="teacher-image w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover shadow-md" 
                />
              </div>
            )}
            
            {/* Teacher Info */}
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
                {teacher.name}
              </h1>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                {teacher.quote}
              </p>
            </div>
            
          </header>

          {/* About Section */}
          {teacher.longDescription && (
            <section className="about-section mb-8">
              <div className="text-slate-600 leading-relaxed whitespace-pre-line">
                {teacher.longDescription}
              </div>
            </section>
          )}

          {/* Education Section */}
          {teacher.education && (
            <section className="education-section mb-8 not-prose">
              <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-3">
                Образование
              </h3>
              <div className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {teacher.education}
              </div>
            </section>
          )}

          {/* Additional Courses Section */}
          {teacher.additionalCourses && teacher.additionalCourses.length > 0 && (
            <section className="additional-courses-section mb-8 not-prose">
              
              {/* Section Header with Toggle Button */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2 sm:gap-0">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-800">
                  Дополнительное образование
                </h3>
                <button
                  onClick={handleToggleCourses}
                  className="text-accent hover:text-accent-dark transition-colors text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 rounded px-2 py-1 whitespace-nowrap"
                  aria-expanded={isCoursesExpanded}
                  aria-controls="courses-list"
                  type="button"
                >
                  {isCoursesExpanded ? 'Скрыть список' : 'Показать список'} ({teacher.additionalCourses.length})
                </button>
              </div>
              
              {/* Expandable Courses List */}
              {isCoursesExpanded && (
                <div 
                  id="courses-list"
                  className="courses-list transition-all duration-300"
                >
                  <ul className="space-y-3 text-slate-600 leading-relaxed">
                    {teacher.additionalCourses.map((course, index) => (
                      <li 
                        key={index} 
                        className="text-xs sm:text-sm border-l-2 border-slate-200 pl-3 sm:pl-4 py-1 hover:border-accent transition-colors break-words"
                      >
                        {course}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
            </section>
          )}

          {/* Contact Form Section */}
          <section className="contact-section my-8 sm:my-12 pt-6 sm:pt-10 border-t border-slate-200 not-prose">
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-4 text-center sm:text-left">
              Свяжитесь с нами
            </h3>
            <p className="text-sm sm:text-base text-slate-600 mb-6 leading-relaxed text-center sm:text-left">
              Если у вас есть вопросы или вы хотите записаться на консультацию, пожалуйста, заполните форму ниже.
            </p>
            <ContactForm />
          </section>

          {/* Navigation Footer */}
          <footer className="mt-6 sm:mt-8 pt-6 border-t border-slate-200 not-prose text-center sm:text-left">
            <Link 
              to="/teachers" 
              onClick={handleTeachersClick}
              className="inline-flex items-center transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 rounded px-2 py-1 text-sm sm:text-base font-semibold"
              style={{ color: 'rgb(14, 165, 233)' }}
            >
              <span className="font-light mr-2 flex items-center text-xl">⬅</span> Вернуться к преподавателям
            </Link>
          </footer>
          
        </article>
      </main>
      
      <Footer />
    </>
  )
}
