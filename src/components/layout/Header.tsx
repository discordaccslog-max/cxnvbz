import { Link, useRouterState } from "@tanstack/react-router";
import { CHECKOUT_SETTINGS } from "../../lib/checkout/settings";
import { CountryPicker } from "./CountryPicker";

type HeaderProps = {
	onCartOpen: () => void;
	cartCount: number;
	buyerCountry?: string;
};

export function Header({ onCartOpen, cartCount, buyerCountry }: HeaderProps) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const active = (path: string) =>
		(path === "/" ? pathname === "/" : pathname.startsWith(path))
			? "active"
			: undefined;
	return (
		<>
			<div className="topbar">
				Digital programs only · Delivered by email · Nothing ships
			</div>
			<header className="site-header">
				<div className="wrap site-header__row">
					<Link to="/" className="logo">
						FITNESSCA
					</Link>
					<nav className="nav" aria-label="Main">
						<Link to="/" className={active("/")}>
							Home
						</Link>
						<Link to="/programs" className={active("/programs")}>
							Programs
						</Link>
						<Link to="/" hash="faq">
							FAQ
						</Link>
						<Link to="/pages/contact" className={active("/pages/contact")}>
							Contact
						</Link>
					</nav>
					{CHECKOUT_SETTINGS.adaptivePricing ? (
						<CountryPicker buyerCountry={buyerCountry} />
					) : null}
					<button
						type="button"
						className="cart-btn"
						onClick={onCartOpen}
						aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
					>
						<svg
							width="18"
							height="18"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden="true"
						>
							<path d="M6 7h12l-1 14H7L6 7Z" />
							<path d="M9 7a3 3 0 0 1 6 0" />
						</svg>
						{cartCount > 0 ? cartCount : null}
					</button>
				</div>
			</header>
		</>
	);
}
