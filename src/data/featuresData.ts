export type FeatureData = {
  slug: string
  title: string
  description: string
  longDescription?: string
  cta?: { text: string; href: string }
}

export const featuresData: FeatureData[] = [
  {
    slug: 'fast-reliable-delivery',
    title: 'Fast, reliable delivery',
    description:
      'Deploy quickly with predictable, audited release processes and robust monitoring.',
    longDescription:
      'Fast, reliable delivery: predictable releases, automated pipelines, observability and rollback strategies so your team ships with confidence.',
    cta: { text: 'Read docs', href: '#delivery' },
  },
  {
    slug: 'accessible-by-design',
    title: 'Accessible by design',
    description:
      'Components and interactions built with keyboard navigation and screen readers in mind.',
    longDescription:
      'Accessible by design: we prioritize semantic HTML, keyboard support, ARIA where needed, and visible focus states across components so everyone can use your product.' +
      'Accessible by design: we prioritize semantic HTML, keyboard support, ARIA where needed, and visible focus states across components so everyone can use your product.' +
      'Accessible by design: we prioritize semantic HTML, keyboard support, ARIA where needed, and visible focus states across components so everyone can use your product.',
    cta: { text: 'Accessibility', href: '#accessibility' },
  },
  {
    slug: 'scalable-architecture',
    title: 'Scalable architecture',
    description:
      'Design patterns and infrastructure that let you scale confidently as your product grows.',
    longDescription:
      'Scalable architecture: proven patterns, CI/CD pipelines, and infrastructure choices that keep performance and cost predictable at scale.',
    cta: { text: 'Architecture', href: '#architecture' },
  },
  {
    slug: 'enterprise-support',
    title: 'Enterprise support',
    description:
      'SLA-backed support and onboarding to keep your team productive and secure.',
    longDescription:
      'Enterprise support: dedicated onboarding, SLAs, security reviews, and priority incident handling for mission-critical systems.',
    cta: { text: 'Contact sales', href: '/contact' },
  },
]