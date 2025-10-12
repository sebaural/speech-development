import type { Slide } from '../components/Hero'

const homeSlides: Slide[] = [
  {
    title: 'Welcome to Our Redesign',
    subtitle: 'A modern, professional experience built for trust and growth.',
    cta: { text: 'Наши педагоги', href: '/testimonials' },
    png: '/images/hero_speech-on-line.png',
    mobilePng: '/images/hero_speech-on-line.mobile.png',
    objectPosition: 'center 20%',
  },
  {
    title: 'Welcome to Наши Услуги',
    subtitle: 'A modern, professional experience built for trust and growth.',
    cta: { text: 'Наши Услуги', href: '/features' },
    png: '/images/speech-on-line_2.jpeg',
    mobilePng: '/images/speech-on-line_2.jpeg',
    objectPosition: 'center 20%',
  },
  {
    title: 'Позвоните Нам',
    subtitle: 'Мы всегда на связи',
    cta: { text: 'Подать Заявку', href: '/contact' },
    png: '/images/HP_hero_BG.jpg',
    mobilePng: '/images/HP_hero_BG.jpg',
    objectPosition: 'center 20%',
  },
]

export default homeSlides
