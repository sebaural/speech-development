import type { Slide } from '../components/Hero'

const homeSlides: Slide[] = [
  {
    title: 'Современные технологии для развития',
    subtitle: 'Инновационные методы и подходы для вашего успеха.',
  cta: { text: 'Наши педагоги', href: '/teachers' },
    png: '/images/hero_speech-on-line.png',
    mobilePng: '/images/services.mobile.png',
    objectPosition: 'center 20%',
  },
  {
    title: 'Наши Услуги',
    subtitle: 'развивать восприятие, воображение, мышление, внимание, память, речь',
    cta: { text: 'Узнать больше', href: '/features' },
    png: '/images/speech-on-line_2.jpeg',
    mobilePng: '/images/speech-on-line_2.jpeg',
    objectPosition: 'center 20%',
  },
  {
    title: 'ЖДЕМ ВАС',
    subtitle: 'Будем рады услышать, как мы можем Вам помочь.',
    cta: { text: 'Подать Заявку', href: '/contact' },
    png: '/images/HP_hero_BG.jpg',
    mobilePng: '/images/HP_hero_BG.jpg',
    objectPosition: 'center 20%',
  },
]

export default homeSlides
