import type { ReactNode } from "react";
import { useEffect } from "react";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
	useRouterState,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { CartDrawer } from "../components/cart/CartDrawer";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { useCartStore } from "../lib/cart";
import { locatedOrUnknown } from "../lib/checkout/countries";
import { buyerCountry } from "../lib/checkout/order.server";
import { ORDER_COMPLETE_PATH } from "../lib/checkout/shared";
// This file replaces the one the scaffold generated, which is where the global
// stylesheet was imported — without this line Tailwind and the reset never load.
import styles from "../styles.css?url";

function RootDocument({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			{/* Scripts belongs inside body: as a sibling of body the browser moves
			    it on parse, and the relocated nodes no longer match hydration. */}
			<body>
				{children}
				<Scripts />
			</body>
		</html>
	);
}

// Read when the server renders the first page: Cloudflare places the buyer by
// IP, which doesn't change between pages, so navigating never reads it again.
const loadBuyerCountry = createServerFn({ method: "GET" }).handler(() => ({
	buyerCountry: buyerCountry() ?? null,
}));

function RootLayout() {
	const located = Route.useLoaderData();
	const cartOpen = useCartStore((state) => state.open);
	const openCart = useCartStore((state) => state.openCart);
	const closeCart = useCartStore((state) => state.closeCart);
	const cartCount = useCartStore((state) =>
		state.lines.reduce((total, line) => total + line.quantity, 0),
	);
	useEffect(() => {
		void useCartStore.persist.rehydrate();
	}, []);
	// Checkout and order confirmation draw their own header, and store links
	// there would pull the buyer away mid-purchase.
	const pathname = useRouterState({
		select: (state) => state.location.pathname,
	});
	const focused =
		pathname.startsWith("/checkout") ||
		pathname.startsWith(ORDER_COMPLETE_PATH);

	if (focused) return <Outlet />;

	return (
		<div
			style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
		>
			<Header
				onCartOpen={openCart}
				cartCount={cartCount}
				buyerCountry={located.buyerCountry ?? undefined}
			/>
			<main style={{ flex: 1 }}>
				<Outlet />
			</main>
			<Footer />
			<CartDrawer open={cartOpen} onClose={closeCart} />
		</div>
	);
}

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ content: "width=device-width, initial-scale=1", name: "viewport" },
			{ title: "FitnessCA | Digital Training Programs" },
		],
		links: [{ rel: "stylesheet", href: styles }],
	}),
	loader: () => locatedOrUnknown(loadBuyerCountry()),
	staleTime: Number.POSITIVE_INFINITY,
	component: RootLayout,
	shellComponent: RootDocument,
});
