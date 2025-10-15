import React from 'react'
import Hero from '../components/Hero'
import homeSlides from '../data/homeSlides'
import Features from '../components/Features'
import Teachers from '../components/Teachers'
import CTA from '../components/CTA'
import Footer from '../components/Footer'
import ContactForm from '../components/ContactForm'
import Nav from '../components/Nav'

export default function HomePage() {
  return (
    <main>
      <Nav />
      <Hero slides={homeSlides} heightClasses="h-[40vh] sm:h-[45vh] md:h-[55vh] lg:h-[50vh]" />
  <Features />
  <section className="teachers-container bg-gray-200">
    <div className="mx-auto">
      <Teachers />
    </div>
    </section>
    {/*   <CTA /> */}
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
