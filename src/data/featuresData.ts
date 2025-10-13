export type FeatureData = {
  slug: string
  title: string
  description: string
  longDescription?: string
  image?: string
  cta?: { text: string; href: string }
}

export const featuresData: FeatureData[] = [
  {
    slug: 'children',
    title: 'Дети',
    description:
      'Deploy quickly with predictable, audited release processes and robust monitoring.',
    longDescription:
      'Fast, reliable delivery: predictable releases, automated pipelines, observability and rollback strategies so your team ships with confidence.',
  image: '/images/features/kids.png',
    cta: { text: 'Read docs', href: '#delivery' },
  },
  {
    slug: 'teenagers',
    title: 'Подростки',
    description:
      'Components and interactions built with keyboard navigation and screen readers in mind.',
    longDescription:
      'Accessible by design: we prioritize semantic HTML, keyboard support, ARIA where needed, and visible focus states across components so everyone can use your product.',
  image: '/images/features/teenagers.png',
    cta: { text: 'Accessibility', href: '#accessibility' },
  },
 {
    slug: 'adults',
    title: 'Взрослые',
    description:
      'Design patterns and infrastructure that let you scale confidently as your product grows.',
    longDescription:
      'Scalable architecture: proven patterns, CI/CD pipelines, and infrastructure choices that keep performance and cost predictable at scale.',
  image: '/images/features/adults.png',
    cta: { text: 'Architecture', href: '#architecture' },
  },

]
