import React from 'react'

export interface FeatureCardProps {
  title: string
  description: string
  icon?: React.ReactNode
  image?: string
  imageRound?: boolean
  variant?: 'compact' | 'long'
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
  image,
  imageRound = false,
  variant = 'compact',
  cta,
  className = '',
}: FeatureCardProps): JSX.Element {
  return (
    <article
      className={`Feature-Card  group relative flex flex-col gap-4 rounded-lg border border-slate-300 bg-white p-6 shadow-sm hover:shadow-md focus-within:shadow-md transition-shadow ${className}`}
      tabIndex={0}
      aria-labelledby={`feature-title-${title.replace(/\s+/g, '-')}`}
    >
      {/* show image only in the long variant */}
      {variant === 'long' && image ? (
        imageRound ? (
          <div className="mb-4 flex justify-center">
            <img 
              src={image} 
              alt={title} 
              className="w-36 h-36 object-cover rounded-full"
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : (
          <div className="mb-4 overflow-hidden rounded-md">
            <img 
              src={image} 
              alt={title} 
              className="w-full h-44 object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        )
      ) : null}

      {/* Icon on top, centered */}
      {icon ? (
        <div className="mb-3 flex justify-center">
          <div className="inline-flex items-center justify-center rounded-full bg-slate-100 text-accent">
            {icon}
          </div>
        </div>
      ) : null}

      <div>
        <h3 id={`feature-title-${title.replace(/\s+/g, '-')}`} className="text-lg font-semibold text-slate-900 text-center">
          {title}
        </h3>
        <p className="mt-2 text-sm text-slate-600 text-center">{description}</p>
      </div>

      <button className="ReadMore inline-flex items-center rounded-md bg-accent px-4 py-2 text-white w-[55%] mx-auto justify-center text-sm">
        Узнать подробнее
      </button>

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