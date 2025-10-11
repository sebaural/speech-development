import React from 'react'
import Hero from '../components/Hero'
import featuresSlides from '../data/featuresSlides'
import Features from '../components/Features'
import Footer from '../components/Footer'
import ContactForm from '../components/ContactForm'
import Nav from '../components/Nav'

export default function FeaturesPage() {
  return (
    <main>
      <Nav />
      <Hero slides={featuresSlides} heightClasses="h-[28vh] sm:h-[32vh] md:h-[36vh] lg:h-[40vh]" />
      <Features />
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
