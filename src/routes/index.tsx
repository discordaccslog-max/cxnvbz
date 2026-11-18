import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductCard } from "../components/product/ProductCard";
import { loadPrograms } from "../lib/load-programs";

export const Route = createFileRoute("/")({
	loader: () => loadPrograms(),
	head: () => ({
		meta: [
			{ title: "FitnessCA | Digital Training Programs" },
			{
				name: "description",
				content:
					"Downloadable PDF programs and guides for strength and mobility, plus a training tracker spreadsheet. Delivered by email. Nothing ships.",
			},
		],
	}),
	component: HomePage,
});

const faqs: [string, string][] = [
	[
		"Is this a physical product?",
		"No. Every product is a digital download: PDF guides, plus a spreadsheet with the Progressive Overload Training Guide. Nothing is shipped.",
	],
	[
		"How do I receive my program?",
		"After payment you receive an email with your download link. Links work for 30 days, so save your files to your device.",
	],
	[
		"What equipment do I need?",
		"It depends on the program, and each product page lists it. The Home Workout Starter Kit needs no equipment. The others use a mat, dumbbells, or gym equipment as described on their pages.",
	],
	[
		"Which program should I start with?",
		"If you're new to training, look at Beginner Strength Foundations or the Home Workout Starter Kit. The Progressive Overload Training Guide is written for people who already train regularly.",
	],
	[
		"Can I get a refund?",
		"Because the products are delivered instantly, all sales are final once your download link is issued, except for defective or inaccessible files, duplicate charges, or where a refund is required by law.",
	],
	[
		"Is this medical advice?",
		"No. The programs are for general fitness and educational purposes only. Consult a physician before beginning any exercise program, and stop if you experience pain.",
	],
];

function HomePage() {
	const { items, failed } = Route.useLoaderData();
	const singles = items.filter((i) => i.slug !== "complete-strength-bundle");
	const bundle = items.find((i) => i.slug === "complete-strength-bundle");
	const fan = items.slice(0, 3);
	return (
		<>
			<section className="hero">
				<div className="wrap hero__grid">
					<div>
						<p className="eyebrow">Digital training programs</p>
						<h1 className="display">
							Train with a plan.
							<br />
							<em>On your schedule.</em>
						</h1>
						<p className="hero__lede">
							Downloadable PDF programs and guides for strength and mobility,
							plus a training tracker spreadsheet. Every program lists the
							format, what's included, the equipment you need, and the
							difficulty level, so you know exactly what you're getting.
						</p>
						<div className="hero__cta">
							<Link to="/programs" className="btn btn--gold">
								Explore programs <span aria-hidden="true">→</span>
							</Link>
							<a href="#how-it-works" className="btn btn--ghost">
								How it works
							</a>
						</div>
						<div className="stats">
							<div>
								<strong>5</strong>
								<span>Programs</span>
							</div>
							<div>
								<strong>PDF</strong>
								<span>Download format</span>
							</div>
							<div>
								<strong>Email</strong>
								<span>Delivery</span>
							</div>
						</div>
					</div>
					<div className="fan" aria-hidden="true">
						{fan.map((item) =>
							item.image ? <img key={item.id} src={item.image} alt="" /> : null,
						)}
					</div>
				</div>
			</section>

			<section className="section dark" id="programs">
				<div className="wrap">
					<div className="section-head">
						<div>
							<p className="eyebrow">The programs</p>
							<h2 className="display">
								Four programs. <em>Plainly described.</em>
							</h2>
						</div>
						<p className="lede" style={{ fontSize: 16 }}>
							Each program is a one-time purchase delivered digitally. Open any
							program to see its format, full contents, required equipment, and
							difficulty level.
						</p>
					</div>
					{failed && items.length === 0 ? (
						<p className="empty" role="alert">
							The programs didn't load. Please refresh the page.
						</p>
					) : (
						<div className="cards cards--4">
							{singles.map((item) => (
								<ProductCard
									key={item.id}
									title={item.title}
									slug={item.slug}
									image={item.image ?? undefined}
									priceLabel={item.priceLabel ?? undefined}
								/>
							))}
						</div>
					)}

					{bundle ? (
						<div className="bundle">
							<div>
								<p className="eyebrow">The bundle</p>
								<h2 className="display">All four programs in one purchase.</h2>
								<ol>
									{singles.map((item, i) => (
										<li key={item.id}>
											<b>{String(i + 1).padStart(2, "0")}</b>
											{item.title}
										</li>
									))}
								</ol>
								<div className="bundle__price">
									<strong>{bundle.priceLabel}</strong>
									<span>Bought separately at current prices: $133.99</span>
								</div>
								<Link
									to="/products/$slug"
									params={{ slug: bundle.slug }}
									className="btn btn--gold"
								>
									View the bundle <span aria-hidden="true">→</span>
								</Link>
							</div>
							{bundle.image ? (
								<img
									className="bundle__img"
									src={bundle.image}
									alt={bundle.title}
								/>
							) : null}
						</div>
					) : null}
				</div>
			</section>

			<section className="section light on-light">
				<div className="wrap">
					<p className="eyebrow">Before you buy</p>
					<h2 className="display" style={{ fontSize: "clamp(34px,4.4vw,54px)" }}>
						Know exactly what you're getting.
					</h2>
					<p className="lede" style={{ marginTop: 24, maxWidth: 520 }}>
						Every product page answers the same four questions in plain
						language, before you reach checkout.
					</p>
					<div className="four">
						<div>
							<small>01</small>
							<h3>Format and length</h3>
							<p>File format and page count, listed on every product page.</p>
						</div>
						<div>
							<small>02</small>
							<h3>What's included, and what isn't</h3>
							<p>
								A plain list of the contents, plus a clear note on what the
								program does not include.
							</p>
						</div>
						<div>
							<small>03</small>
							<h3>Equipment you need</h3>
							<p>
								Exactly what you need to follow along, from no equipment at all
								to a full gym.
							</p>
						</div>
						<div>
							<small>04</small>
							<h3>Difficulty level</h3>
							<p>
								Beginner, intermediate, or all levels, stated plainly so you can
								pick the right starting point.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="section dark" id="how-it-works">
				<div className="wrap">
					<p className="eyebrow">How it works</p>
					<h2 className="display" style={{ fontSize: "clamp(34px,4.4vw,54px)" }}>
						From checkout to your first session.
					</h2>
					<div className="steps">
						<div className="step">
							<div className="step__n">01</div>
							<h3>Choose a program</h3>
							<p>
								Compare format, equipment, and difficulty on each product page
								and pick the one that fits.
							</p>
						</div>
						<div className="step">
							<div className="step__n">02</div>
							<h3>Check out</h3>
							<p>
								Everything is digital, so there's no shipping step and no
								shipping fee.
							</p>
						</div>
						<div className="step">
							<div className="step__n">03</div>
							<h3>Get your files</h3>
							<p>
								Your download link is emailed after payment. Save the files to
								any device.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="section light on-light" id="faq">
				<div className="wrap faq-grid">
					<div>
						<p className="eyebrow">Questions</p>
						<h2 className="display">Good to know before you buy.</h2>
						<p className="lede">
							Something else? Email{" "}
							<a href="mailto:fitnesscasupport@outlook.com">
								fitnesscasupport@outlook.com
							</a>
							. We aim to reply within 2 business days.
						</p>
					</div>
					<div className="faq">
						{faqs.map(([q, a]) => (
							<details key={q}>
								<summary>{q}</summary>
								<p>{a}</p>
							</details>
						))}
					</div>
				</div>
			</section>
		</>
	);
}
