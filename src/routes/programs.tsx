import { createFileRoute } from "@tanstack/react-router";
import { ProductCard } from "../components/product/ProductCard";
import { loadPrograms } from "../lib/load-programs";

export const Route = createFileRoute("/programs")({
	loader: () => loadPrograms(),
	head: () => ({
		meta: [
			{ title: "All programs | FitnessCA" },
			{
				name: "description",
				content:
					"Downloadable PDF programs and guides, plus a training tracker spreadsheet. Every item is a digital product, and nothing is shipped.",
			},
		],
	}),
	component: ProgramsPage,
});

function ProgramsPage() {
	const { items, failed } = Route.useLoaderData();
	return (
		<div className="dark" style={{ minHeight: "70vh" }}>
			<div className="wrap pagehead">
				<p className="eyebrow">All programs</p>
				<h1 className="display">Training Programs</h1>
				<p className="lede">
					Downloadable PDF programs and guides, plus a training tracker
					spreadsheet. Every item is a digital product, and nothing is shipped.
					Each product page lists the format, what's included, equipment needed,
					and difficulty level.
				</p>
			</div>
			<div className="wrap" style={{ paddingBottom: 100 }}>
				{failed && items.length === 0 ? (
					<p className="empty" role="alert">
						The programs didn't load. Please refresh the page.
					</p>
				) : (
					<div className="cards">
						{items.map((item) => (
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
			</div>
		</div>
	);
}
