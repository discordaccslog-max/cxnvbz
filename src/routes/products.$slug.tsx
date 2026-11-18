// whop-storefront-overlay: 2 (keep this line: whop-app-new reads it)
import {
	createFileRoute,
	Link,
	notFound,
	useRouter,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { preloadHints } from "@whop/elements";
import { Fragment, useState } from "react";
import { BusyRegion } from "../components/checkout/BusyRegion";
import { ExpressBuy } from "../components/checkout/ExpressBuy";
import { ENVIRONMENT } from "../lib/checkout/environment";
import { logFailure } from "../lib/checkout/order.handlers";
import {
	type Amount,
	money,
	type PageQuote,
	quotedPrice,
} from "../lib/checkout/order";
import { CHECKOUT_SETTINGS } from "../lib/checkout/settings";
import { useCartStore } from "../lib/cart";
import {
	type ProductView,
	useVariantSelection,
} from "../lib/variant-selection";
import { ProductCard } from "../components/product/ProductCard";
import { loadPrograms } from "../lib/load-programs";
import { metaFor } from "../lib/program-meta";
import { loadProductView } from "../whop.server";

const loadProduct = createServerFn({ method: "GET" })
	.validator((slug: string): unknown => slug)
	.handler(async ({ data }): Promise<ProductView> => {
		let product: ProductView | null;
		try {
			product = await loadProductView(data);
		} catch (failure) {
			logFailure("Loading a product", failure);
			throw failure;
		}
		if (!product) throw notFound();
		return product;
	});

export const Route = createFileRoute("/products/$slug")({
	loader: async ({ params }) => {
		const [product, programs] = await Promise.all([
			loadProduct({ data: params.slug }),
			loadPrograms(),
		]);
		return { product, programs, slug: params.slug };
	},
	head: ({ loaderData }) => ({
		meta: loaderData
			? [
					{ title: `${loaderData.product.title} | FitnessCA` },
					{
						name: "description",
						content: (
							loaderData.product.description ?? loaderData.product.title
						)
							.replace(/\s+/g, " ")
							.slice(0, 160),
					},
					{ property: "og:title", content: loaderData.product.title },
					...(loaderData.product.image
						? [{ property: "og:image", content: loaderData.product.image }]
						: []),
				]
			: [],
		links: CHECKOUT_SETTINGS.requireTermsAgreement
			? []
			: [...preloadHints({ environment: ENVIRONMENT })],
	}),
	component: ProductPage,
	errorComponent: ProductLoadFailed,
});

// A product the store couldn't read right now (Whop slow or refusing, another
// request's catalog listing failing) is offered again, never shown as gone.
function ProductLoadFailed() {
	const router = useRouter();
	return (
		<section className="wrap doc">
			<p role="alert" className="copy">
				This product didn't load.{" "}
				<button
					type="button"
					className="btn btn--black"
					onClick={() => void router.invalidate()}
				>
					Try again
				</button>
			</p>
		</section>
	);
}

// With adaptive pricing the variant's quote prices the line, in the buyer's
// currency, as the wallet sheet shows it. Until it comes, or when none does,
// the price the server read in that currency (`shownPrice`) shows.
function PriceLine({
	price,
	quoted,
}: {
	price: Amount | null;
	quoted: ReturnType<typeof quotedPrice>;
}) {
	if (quoted) {
		return (
			<p>
				{quoted.struck ? (
					<>
						<s>{money(quoted.struck.units, quoted.struck.money)}</s>{" "}
					</>
				) : null}
				{money(quoted.price.units, quoted.price.money)}
			</p>
		);
	}
	return price ? <p>{money(price.units, price.money)}</p> : null;
}

type Block =
	| { kind: "heading"; text: string }
	| { kind: "list"; items: string[] }
	| { kind: "para"; text: string };

// The product description is plain text: ALL-CAPS lines are section headings,
// "- " lines are bullets, and everything else is a paragraph.
function parseDescription(text: string): Block[] {
	const blocks: Block[] = [];
	for (const raw of text.split("\n")) {
		const line = raw.trim();
		if (!line) continue;
		if (line.startsWith("- ")) {
			const last = blocks[blocks.length - 1];
			if (last?.kind === "list") last.items.push(line.slice(2));
			else blocks.push({ kind: "list", items: [line.slice(2)] });
		} else if (/^[A-Z' ]{6,}$/.test(line)) {
			blocks.push({ kind: "heading", text: line });
		} else {
			blocks.push({ kind: "para", text: line });
		}
	}
	return blocks;
}

function titleCase(text: string) {
	return text.charAt(0) + text.slice(1).toLowerCase();
}

function Inline({ text }: { text: string }) {
	const match = /^(Not included:|Format:|Delivery:|Formats:|Beginner to intermediate\.|Beginner\.|Intermediate\.|All levels\.|None\.)(.*)$/.exec(
		text,
	);
	if (!match) return <>{text}</>;
	return (
		<>
			<b>{match[1]}</b>
			{match[2]}
		</>
	);
}

function Sections({ blocks }: { blocks: Block[] }) {
	// Everything before the first heading is the lead, then one section per heading.
	const lead: Block[] = [];
	const sections: { title: string; body: Block[] }[] = [];
	for (const block of blocks) {
		if (block.kind === "heading") sections.push({ title: block.text, body: [] });
		else if (sections.length === 0) lead.push(block);
		else sections[sections.length - 1].body.push(block);
	}
	const render = (body: Block[]) =>
		body.map((block, i) =>
			block.kind === "list" ? (
				<ul key={i}>
					{block.items.map((item) => (
						<li key={item}>
							<Inline text={item} />
						</li>
					))}
				</ul>
			) : block.kind === "para" ? (
				<p key={i} className="copy">
					<Inline text={block.text} />
				</p>
			) : null,
		);
	return (
		<>
			{lead.map((block, i) =>
				block.kind === "para" ? (
					<p key={i} className={i === 0 ? "lead" : "copy"}>
						{block.text}
					</p>
				) : null,
			)}
			{sections.map((section) => (
				<div className="psec" key={section.title}>
					<h2>{titleCase(section.title).toUpperCase()}</h2>
					{render(section.body)}
				</div>
			))}
		</>
	);
}

function ProductPage() {
	const { product, programs } = Route.useLoaderData();
	const addLine = useCartStore((state) => state.addLine);
	const openCart = useCartStore((state) => state.openCart);
	const { options, selected, select, plan, isBuyable } =
		useVariantSelection(product);
	const [buying, setBuying] = useState(false);
	const [quote, setQuote] = useState<PageQuote | null>(null);
	const lineTitle =
		options.length > 0 && plan?.title
			? `${product.title} – ${plan.title}`
			: product.title;
	const meta = metaFor(
		programs.items.find((item) => item.id === product.id)?.slug ?? "",
	);
	const blocks = parseDescription(product.description ?? "");
	const others = programs.items.filter((item) => item.id !== product.id);

	return (
		<>
			<section className="pdp light on-light">
				<div className="wrap pdp__grid">
					<div className="pdp__media">
						{product.image ? (
							<img src={product.image} alt={product.title} />
						) : null}
					</div>
					<div>
						<div className="crumbs">
							<Link to="/programs">Programs</Link> / {product.title}
						</div>
						<p className="eyebrow">FitnessCA · Digital program</p>
						<h1>{product.title}</h1>
						<BusyRegion busy={buying} style={{ display: "grid", gap: "1rem" }}>
							{options.map((option, index) => (
								<fieldset
									key={option.name}
									style={{
										border: "none",
										padding: 0,
										margin: 0,
										display: "grid",
										gap: "0.5rem",
									}}
								>
									<legend>{option.label}</legend>
									<div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
										{option.values.map((value) => {
											const isSelected = selected[option.name] === value;
											const buyable = isBuyable(index, value);
											return (
												<button
													key={value}
													type="button"
													aria-pressed={isSelected}
													onClick={() => select(option.name, value)}
													style={{
														fontWeight: isSelected ? 700 : 400,
														textDecoration: buyable ? "none" : "line-through",
														opacity: buyable ? 1 : 0.5,
													}}
												>
													{value}
												</button>
											);
										})}
									</div>
								</fieldset>
							))}
							{plan ? (
								<>
									<div className="pdp__price">
										<PriceLine
											price={plan.shownPrice}
											quoted={quotedPrice(quote, plan.id)}
										/>
									</div>
									<div className="note">
										<b>Digital product.</b> Delivered by email after payment.
										Nothing is shipped.
									</div>
									<div className="note">
										<b>All sales are final once your download link is issued</b>
										, except for defective files, duplicate charges, or where
										required by law.{" "}
										<Link to="/pages/$slug" params={{ slug: "refund-policy" }}>
											Refund Policy
										</Link>
									</div>
									<div className="pdp__buy">
										{plan.available ? (
											<>
												<button
													type="button"
													className="btn btn--black"
													onClick={() => {
														addLine({
															planId: plan.id,
															title: lineTitle,
															quantity: 1,
															image: product.image ?? undefined,
														});
														openCart();
													}}
												>
													Add to cart
												</button>
												<a
													href={`https://whop.com/checkout/${plan.id}`}
													target="_blank"
													rel="noopener noreferrer"
													className="btn btn--gold"
												>
													Buy now
												</a>
												{plan.checkout ? (
													<ExpressBuy
														planId={plan.id}
														title={lineTitle}
														plan={plan.checkout}
														onBusyChange={setBuying}
														onQuote={setQuote}
													/>
												) : null}
											</>
										) : (
											<button type="button" className="btn btn--black" disabled>
												Sold out
											</button>
										)}
									</div>
								</>
							) : options.length > 0 ? (
								<p className="copy">This combination is not available.</p>
							) : null}
						</BusyRegion>

						<Sections blocks={blocks} />

						<div className="psec">
							<h2>REFUND TERMS</h2>
							<p className="copy">
								This {meta?.refundWhat === "bundle" ? "bundle" : "product"} is
								delivered instantly, so{" "}
								<b>all sales are final once your download link is issued</b>,
								except if the files are defective or can't be accessed and we
								can't fix the problem, if you were charged more than once by
								mistake, or where a refund is required by law. Full details:{" "}
								<Link to="/pages/$slug" params={{ slug: "refund-policy" }}>
									Refund Policy
								</Link>
								.
							</p>
							<p className="copy">
								Customers in the EU/UK: by completing your purchase you request
								immediate access to digital content and acknowledge that your
								14-day right of withdrawal ends once delivery begins.
							</p>
						</div>
						{meta ? (
							<>
								<div className="psec">
									<h2>MEDICAL DISCLAIMER</h2>
									<p className="copy">
										{meta.medical} Read the full{" "}
										<Link to="/pages/$slug" params={{ slug: "medical-disclaimer" }}>
											Medical Disclaimer
										</Link>
										.
									</p>
								</div>
								<div className="psec">
									<h2>RESULTS DISCLAIMER</h2>
									<p className="copy">{meta.results}</p>
								</div>
							</>
						) : null}
						<div className="note" style={{ marginTop: 28 }}>
							For general fitness and educational purposes only, not medical
							advice. Consult a physician before starting any exercise program.{" "}
							<Link to="/pages/$slug" params={{ slug: "medical-disclaimer" }}>
								Medical Disclaimer
							</Link>
						</div>
					</div>
				</div>
			</section>

			{others.length > 0 ? (
				<section className="pdp__more">
					<div className="wrap">
						<h2>More programs</h2>
						<div className="cards cards--4">
							{others.map((item) => (
								<Fragment key={item.id}>
									<ProductCard
										title={item.title}
										slug={item.slug}
										image={item.image ?? undefined}
										priceLabel={item.priceLabel ?? undefined}
									/>
								</Fragment>
							))}
						</div>
					</div>
				</section>
			) : null}
		</>
	);
}
