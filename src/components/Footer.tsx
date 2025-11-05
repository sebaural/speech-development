import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center gap-3">
          <div className="font-semibold">
            <img 
              src="/images/logo_new.png" 
              alt="Речь и Развитие" 
              className="h-8 md:h-12 lg:h-19 w-auto"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="text-sm text-slate-600">© {new Date().getFullYear()} Речь и Развитие. Все права защищены.</p>
        </div>
        <div className="flex items-center text-sm text-slate-600">
          <p>Вопросы? Посетите нашу <a href="/contact" className="text-accent underline">страницу контактов</a>, чтобы связаться с нами.</p>
          <a href="/sitemap" className="sr-only">Карта сайта</a>
        </div>
      </div>
    </footer>
  )
}
