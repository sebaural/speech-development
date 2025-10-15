import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'
import FeatureCard from '../../components/FeatureCard'
import { featuresData } from '../../data/featuresData'
import Nav from '../../components/Nav'

// This page corresponds to the 'teenagers' feature in featuresData
const feature = featuresData.find((f) => f.slug === 'teenagers')!

export default function Teenagers(): JSX.Element {
  const navigate = useNavigate()
  
  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    navigate('/contact')
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
          <h2 className="text-2xl font-bold text-slate-900 mb-6">{feature.title}</h2>
          <div className="whitespace-pre-line text-slate-700 leading-relaxed">
            {feature.longDescription || feature.description}
          </div>
          
          <div className="mt-8 flex justify-center">
            <Link
              to="/contact"
              onClick={handleContactClick}
              className="inline-flex items-center bg-accent hover:bg-accent-dark text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
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