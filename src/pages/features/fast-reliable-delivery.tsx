import React from 'react'
import Hero from '../../components/Hero'
import Footer from '../../components/Footer'
import FeatureCard from '../../components/FeatureCard'
import { featuresData } from '../../data/featuresData'
import Nav from '../../components/Nav'

const feature = featuresData.find((f) => f.slug === 'fast-reliable-delivery')!

export default function FastReliableDelivery(): JSX.Element {
  const heroSlides = [
    {
      title: feature.title,
      subtitle: feature.description,
    },
  ]

  return (
    <>
      <Nav />
      <Hero slides={heroSlides} autoplay={false} heightClasses="h-[30vh] sm:h-[35vh] md:h-[40vh]" />
      <main className="mx-auto max-w-4xl px-6 py-12">
  <FeatureCard title={feature.title} description={feature.longDescription || feature.description} variant="long" image={feature.image} imageRound />
      </main>
      <Footer />
    </>
  )
}