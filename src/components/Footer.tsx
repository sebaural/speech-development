import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="font-semibold">BrandName</div>
          <p className="mt-3 text-sm text-slate-600">© {new Date().getFullYear()} BrandName. All rights reserved.</p>
        </div>
        <div className="text-sm text-slate-600">
          <p>Questions? Visit our <a href="/contact" className="text-accent underline">Contact page</a> to reach out.</p>
        </div>
      </div>
    </footer>
  )
}
