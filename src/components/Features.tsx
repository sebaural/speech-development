import React from 'react'
import { Link } from 'react-router-dom'
import FeatureCard from './FeatureCard'
import { featuresData } from '../data/featuresData'

const icons = [
	<img
		className="h-20 w-20 object-contain"
		src="/images/features/kids.png"
		alt=""
		loading="lazy"
		aria-hidden="true"
	/>,
	<img
		className="h-20 w-20 object-contain"
		src="/images/features/teenagers.png"
		alt=""
		loading="lazy"
		aria-hidden="true"
	/>,
	<img
		className="h-20 w-20 object-contain"
		src="/images/features/adults.png"
		alt=""
		loading="lazy"
		aria-hidden="true"
	/>,
	<svg
		className="h-20 w-20"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		aria-hidden
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M16 11V7a4 4 0 10-8 0v4M5 21h14"
		/>
	</svg>,
]

export default function Features(): JSX.Element {
	return (
		<section className="py-12 bg-slate-50">
			<div className="mx-auto max-w-6xl px-6">
				<header className="mb-8 text-center">
					<h2 className="text-3xl font-bold">Наши Услуги</h2>
					<p className="mt-2 text-slate-600">
						Работа с детьми, подростками и взрослыми по развитию речи и навыков общения.
					</p>
				</header>

				{/* Use an auto-fit CSS grid so cards grow to fill available width regardless of count */}
				<div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
					{featuresData.map((f, idx) => (
						<Link
							key={f.slug}
							to={`/features/${f.slug}`}
							className="no-underline focus:outline-none flex h-full"
							aria-label={`View details for ${f.title}`}
						>
							<FeatureCard
								title={f.title}
								description={f.description}
								icon={icons[idx % icons.length]}
								// remove CTA here to avoid nested links; detail page handles CTAs
								className="cursor-pointer flex-1 h-full"
							/>
						</Link>
					))}
				</div>

			</div>
		</section>
	)
}
