import React from 'react'
import SiteMap from '../components/SiteMap'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function SiteMapPage() {
  return (
    <>
      <Nav />
      <main>
        <SiteMap />
      </main>
      <Footer />
    </>
  )
}