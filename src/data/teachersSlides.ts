import type { Slide } from '../components/Hero'

const teachersSlides: Slide[] = [
  {
    

title: 'Клиенты любят работать с нами',
    subtitle: 'Профессиональные педагоги и современные методики.',
    cta: { text: 'Узнайте о наших методах', href: '/features' },
    png: '/images/work-with-teenagers.png',
    mobilePng: '/images/work-with-teenagers.mobile.png',
    objectPosition: 'center 30%',
  },
  {
    title: 'Работа с детьми',
    subtitle: 'Комплексный подход к развитию вашего ребёнка',
    cta: { text: 'Услуги', href: '/features/children' },
    png: '/images/lesson-on-line.webp',
    mobilePng: '/images/Benefits+of+Pediatric+Speech+Therapy+for+Children.mobile.webp',
    objectPosition: 'center 30%',
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

export default teachersSlides
