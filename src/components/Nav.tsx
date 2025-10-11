import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Nav(): JSX.Element {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-lg font-bold focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          BrandName
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link to="/" className="text-sm">Home</Link>
          <Link to="/features" className="text-sm">Features</Link>
          <Link to="/testimonials" className="text-sm">Testimonials</Link>
          <Link to="/contact" className="text-sm">Contact</Link>
        </nav>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="md:hidden p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <span className="sr-only">Toggle menu</span>
          {open ? (
            // X / close icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger icon
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* mobile menu */}
      {open && (
        <div id="mobile-menu" className="md:hidden bg-white border-t">
          <div className="px-6 py-4 flex flex-col gap-3">
            <Link to="/" onClick={() => setOpen(false)} className="block">Home</Link>
            <Link to="/features" onClick={() => setOpen(false)} className="block">Features</Link>
            <Link to="/testimonials" onClick={() => setOpen(false)} className="block">Testimonials</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="block">Contact</Link>
          </div>
        </div>
      )}
    </header>
  )
}
