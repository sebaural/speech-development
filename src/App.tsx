import React from 'react'
import { Routes, Route, useParams, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import FeaturesPage from './pages/FeaturesPage'
import TestimonialsPage from './pages/TestimonialsPage'
import ContactPage from './pages/ContactPage'
import FastReliableDelivery from './pages/features/fast-reliable-delivery'
import AccessibleByDesign from './pages/features/accessible-by-design'
import ScalableArchitecture from './pages/features/scalable-architecture'
import EnterpriseSupport from './pages/features/enterprise-support'
import Hero from './components/Hero'
import FeatureCard from './components/FeatureCard'
import Footer from './components/Footer'
import { featuresData } from './data/featuresData'

export default function App(): JSX.Element {
  // Inline dynamic feature-detail route component to avoid a missing import error
  function FeatureDetail(): JSX.Element {
    const { slug } = useParams<{ slug?: string }>()
    const feature = featuresData.find((f) => f.slug === slug)

    if (!feature) {
      return (
        <main className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="text-2xl font-semibold">Feature not found</h2>
          <p className="mt-4 text-slate-600">The feature you requested could not be found.</p>
          <div className="mt-6">
            <Link to="/features" className="text-accent underline">Back to features</Link>
          </div>
        </main>
      )
    }

    const heroSlides = [
      {
        title: feature.title,
        subtitle: feature.description,
        cta: feature.cta,
      },
    ]

    return (
      <>
        <Hero slides={heroSlides} autoplay={false} heightClasses="h-[30vh] sm:h-[35vh] md:h-[40vh]" />
        <main className="mx-auto max-w-4xl px-6 py-12">
          <FeatureCard title={feature.title} description={feature.longDescription || feature.description} />
          <div className="mt-6">
            <Link to="/features" className="text-accent underline">Back to features</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/features" element={<FeaturesPage />} />

      {/* per-feature static pages */}
      <Route path="/features/fast-reliable-delivery" element={<FastReliableDelivery />} />
      <Route path="/features/accessible-by-design" element={<AccessibleByDesign />} />
      <Route path="/features/scalable-architecture" element={<ScalableArchitecture />} />
      <Route path="/features/enterprise-support" element={<EnterpriseSupport />} />

      {/* dynamic per-slug route handled inline to avoid unresolved import */}
      <Route path="/features/:slug" element={<FeatureDetail />} />

      <Route path="/testimonials" element={<TestimonialsPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  )
}
