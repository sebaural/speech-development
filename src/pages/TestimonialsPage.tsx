import React from 'react'
import Hero from '../components/Hero'
import testimonialsSlides from '../data/testimonialsSlides'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'
import ContactForm from '../components/ContactForm'
import Nav from '../components/Nav'

export default function TestimonialsPage() {
  return (
    <main>
      <Nav />
      <Hero slides={testimonialsSlides} heightClasses="h-[30vh] sm:h-[36vh] md:h-[42vh] lg:h-[40vh]" />
      <Testimonials />
      <section className="py-12 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="text-xl font-semibold">Contact us</h3>
          <div className="mt-4 max-w-lg">
            <ContactForm />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
