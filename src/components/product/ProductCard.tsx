import { Link } from "@tanstack/react-router";
import { metaFor } from "../../lib/program-meta";

type ProductCardProps = {
	title: string;
	slug: string;
	image?: string;
	priceLabel?: string;
};

export function ProductCard({
	title,
	slug,
	image,
	priceLabel,
}: ProductCardProps) {
	const tags = metaFor(slug)?.tags ?? [];
	return (
		<Link to="/products/$slug" params={{ slug }} className="card">
			{image ? (
				<img src={image} alt={title} className="card__img" loading="lazy" />
			) : (
				<div className="card__img" />
			)}
			<div className="card__body">
				{tags.length > 0 ? (
					<div className="tags">
						{tags.map((tag) => (
							<span className="tag" key={tag}>
								{tag}
							</span>
						))}
					</div>
				) : null}
				<h3 className="card__title">{title}</h3>
				<div className="card__foot">
					<b>{priceLabel ?? ""}</b>
					<span>VIEW →</span>
				</div>
			</div>
		</Link>
	);
}
