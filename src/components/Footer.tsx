import React from 'react'

export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-6xl px-6 py-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex">
          <div className="font-semibold"><img src="/images/РИР_лого.png" alt="Речь и Развитие" className="h-16 md:h-12 lg:h-19 w-auto" /></div>
          <p className="mt-3 text-sm text-slate-600">© {new Date().getFullYear()} Речь и Развитие. Все права защищены.</p>
        </div>
        <div className="flex items-center text-sm text-slate-600">
          <p>Вопросы? Посетите нашу <a href="/contact" className="text-accent underline">страницу контактов</a>, чтобы связаться с нами.</p>
        </div>
      </div>
    </footer>
  )
}
