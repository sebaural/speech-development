import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'
import FeatureCard from '../../components/FeatureCard'
import { featuresData } from '../../data/featuresData'
import Nav from '../../components/Nav'

// This page corresponds to the 'adults' feature in featuresData
const feature = featuresData.find((f) => f.slug === 'adults')!

export default function Adults(): JSX.Element {
  const navigate = useNavigate()
  
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    navigate('/contact')
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 0)
  }

  const handleAllServicesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    navigate('/features')
    // Scroll to top after navigation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 0)
  }

  return (
    <>
      <Nav />
      {feature.featureImage && (
        <div className="w-full md:mx-auto md:max-w-6xl md:px-6">
          <img 
            src={feature.featureImage} 
            alt={feature.title}
            className="w-full h-64 sm:h-80 md:h-96 object-cover md:rounded-lg"
          />
        </div>
      )}
      <main className="mx-auto max-w-4xl md:max-w-6xl px-6 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-3xl font-bold text-slate-900 mb-6">{feature.title}</h1>
          <div className="whitespace-pre-line text-slate-700" style={{ lineHeight: '1.4' }}>
            {feature.longDescription || feature.description}
          </div>
          
                  <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/features"
            onClick={handleAllServicesClick}
            className="inline-block bg-slate-600 text-white px-6 py-3 rounded-lg hover:bg-slate-700 transition-colors duration-200 text-center"
          >
            Все услуги
          </Link>
          <Link
            to="/contact"
            onClick={handleContactClick}
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 text-center"
          >
            Свяжитесь с нами
          </Link>
        </div>
        </div>
      </main>
      <Footer />
    </>
  )
}