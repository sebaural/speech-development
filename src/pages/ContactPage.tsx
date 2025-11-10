import React from 'react'
import Hero from '../components/Hero'
import contactSlides from '../data/contactSlides'
import Footer from '../components/Footer'
import ContactForm from '../components/ContactForm'
import Nav from '../components/Nav'

export default function ContactPage() {
  return (
    <main>
      <Nav />
      <Hero slides={contactSlides} heightClasses="h-[25vh] sm:h-[30vh] md:h-[36vh] lg:h-[40vh]" />
      <section className="py-10">
        <div className="mx-auto max-w-6xl px-6">
          <h1 className="text-3xl font-bold text-center text-slate-900 mb-4">Свяжитесь с нами</h1>
          <p className="mt-4 sm:text-2xl text-slate-600 text-center" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.5rem)' }}>Заполните форму ниже, и мы свяжемся с вами.</p>
        </div>
      </section>
      <section className="py-10 bg-gray-100">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mt-4 mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
