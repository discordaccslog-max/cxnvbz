import { createFileRoute, notFound } from "@tanstack/react-router";
import { DOC_PAGES } from "../lib/pages-content";

export const Route = createFileRoute("/pages/$slug")({
	loader: ({ params }) => {
		if (!Object.hasOwn(DOC_PAGES, params.slug)) throw notFound();
		return { slug: params.slug };
	},
	head: ({ params }) => {
		const page = Object.hasOwn(DOC_PAGES, params.slug)
			? DOC_PAGES[params.slug]
			: undefined;
		return {
			meta: page
				? [
						{ title: `${page.title} | FitnessCA` },
						{ name: "description", content: page.description },
					]
				: [],
		};
	},
	component: DocPageView,
});

function DocPageView() {
	const { slug } = Route.useLoaderData();
	const page = DOC_PAGES[slug];
	return (
		<div className="light on-light doc">
			<div className="wrap">
				<div className="doc__inner">
					<h1>{page.title}</h1>
					{page.updated ? (
						<p className="updated">Last updated: {page.updated}</p>
					) : null}
					{page.body}
				</div>
			</div>
		</div>
	);
}
