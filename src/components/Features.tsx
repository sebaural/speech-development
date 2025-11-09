import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import FeatureCard from './FeatureCard'
import { featuresData } from '../data/featuresData'

const icons = [
	<img
		className="h-20 w-20 object-contain"
		src="/images/features/kids.png"
		alt=""
		loading="lazy"
		decoding="async"
		aria-hidden="true"
	/>,
	<img
		className="h-20 w-20 object-contain"
		src="/images/features/teenagers.png"
		alt=""
		loading="lazy"
		decoding="async"
		aria-hidden="true"
	/>,
	<img
		className="h-20 w-20 object-contain"
		src="/images/features/adults.png"
		alt=""
		loading="lazy"
		decoding="async"
		aria-hidden="true"
	/>,
]

export default function Features(): JSX.Element {
	const navigate = useNavigate()

	const handleFeatureClick = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
		e.preventDefault()
		navigate(`/features/${slug}`)
		// Scroll to top after navigation
		setTimeout(() => {
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}, 0)
	}

	return (
		<section className="py-12 bg-slate-50">
			<div className="mx-auto max-w-6xl px-6">
				<header className="mb-8 text-center">
					<h2 className="text-3xl font-bold">Наши Услуги</h2>
					<p className="mt-2 text-slate-600">
						Работа с детьми, подростками и взрослыми по развитию речи и навыков общения.
					</p>
					<div className="first-meeting-desc mt-6 text-slate-600 lg:max-w-[75%] lg:mx-auto">
						<h3 className="font-bold text-lg">Что вас ждёт на первой встрече?</h3>
						<p className='mt-5'>Первое занятие — это знакомство, которое ни к чему не обязывает, но даёт много полезной информации!</p>
						<p>Проведём его в тёплой, игровой атмосфере, чтобы ребёнок чувствовал себя уверенно и комфортно.</p>
					</div>
				</header>

				{/* Use an auto-fit CSS grid so cards grow to fill available width regardless of count */}
				<div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(220px,1fr))]">
					{featuresData.map((f, idx) => (
						<Link
							key={f.slug}
							to={`/features/${f.slug}`}
							onClick={(e) => handleFeatureClick(e, f.slug)}
							className="features-item no-underline focus:outline-none flex h-full"
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
