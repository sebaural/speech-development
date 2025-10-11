import React from 'react'

export interface FeatureCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  cta?: { text: string; href: string }
  className?: string
}

/**
 * Reusable feature card
 * - Accessible: keyboard focusable, clear focus-visible ring
 * - Lightweight: accepts an icon node, optional CTA
 */
export default function FeatureCard({
  title,
  description,
  icon,
  cta,
  className = '',
}: FeatureCardProps): JSX.Element {
  return (
    <article
      className={`Feature-Card  group relative flex flex-col gap-4 rounded-lg border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md focus-within:shadow-md transition-shadow ${className}`}
      tabIndex={0}
      aria-labelledby={`feature-title-${title.replace(/\s+/g, '-')}`}
    >
      <div className="flex items-start gap-4">
        {icon && <div className="shrink-0 text-accent">{icon}</div>}
        <div>
          <h3 id={`feature-title-${title.replace(/\s+/g, '-')}`} className="text-lg font-semibold text-slate-900">
            {title}
          </h3>
          <p className="mt-2 text-sm text-slate-600">{description}</p>
        </div>
      </div>

      {cta ? (
        <div className="mt-auto">
          <a
            href={cta.href}
            className="inline-flex items-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-label={cta.text}
          >
            {cta.text}
          </a>
        </div>
      ) : null}
    </article>
  )
}