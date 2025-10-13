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
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-semibold">Свяжитесь с нами</h2>
          <p className="mt-4 text-slate-600">Заполните форму ниже, и мы свяжемся с вами.</p>
        </div>
      </section>
      <section className="py-12 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mt-4 max-w-lg">
            <ContactForm />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
