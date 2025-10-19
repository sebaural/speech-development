import React from 'react'
import Hero from '../components/Hero'
import teachersSlides from '../data/teachersSlides'
import Teachers from '../components/Teachers'
import Footer from '../components/Footer'
import ContactForm from '../components/ContactForm'
import Nav from '../components/Nav'

export default function TeachersPage() {
  return (
    <main>
      <h1 className="sr-only">Наши педагоги - Квалифицированные специалисты</h1>
      <Nav />
      <Hero slides={teachersSlides} heightClasses="h-[30vh] sm:h-[36vh] md:h-[42vh] lg:h-[40vh]" />
      <Teachers />
      <section className="py-12 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="text-xl font-semibold text-center">Свяжитесь с нами</h3>
          <div className="mt-4 max-w-lg mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
