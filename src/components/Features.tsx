import React from 'react'
import { Link } from 'react-router-dom'
import FeatureCard from './FeatureCard'
import { featuresData } from '../data/featuresData'

const icons = [
	<svg
		className="h-6 w-6"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		aria-hidden
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M13 10V3L4 14h7v7l9-11h-7z"
		/>
	</svg>,
	<svg
		className="h-6 w-6"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		aria-hidden
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M12 2v20M2 12h20"
		/>
	</svg>,
	<svg
		className="h-6 w-6"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		aria-hidden
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M3 7h18M3 12h18M3 17h18"
		/>
	</svg>,
	<svg
		className="h-6 w-6"
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
					<h2 className="text-3xl font-bold">Features</h2>
					<p className="mt-2 text-slate-600">
						Capabilities that help you ship faster and build with confidence.
					</p>
				</header>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
					{featuresData.map((f, idx) => (
						<Link
							key={f.slug}
							to={`/features/${f.slug}`}
							className="no-underline focus:outline-none"
							aria-label={`View details for ${f.title}`}
						>
							<FeatureCard
								title={f.title}
								description={f.description}
								icon={icons[idx % icons.length]}
								// remove CTA here to avoid nested links; detail page handles CTAs
								className="cursor-pointer"
							/>
						</Link>
					))}
				</div>

			</div>
		</section>
	)
}
