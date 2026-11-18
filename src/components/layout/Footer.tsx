import { Link } from "@tanstack/react-router";
import { SUPPORT_EMAIL } from "../../lib/program-meta";

export function Footer() {
	return (
		<>
			<div className="disclaimer">
				<div className="wrap">
					<span className="ico">i</span>
					<p style={{ margin: 0 }}>
						FitnessCA programs are for general fitness and educational purposes
						only and are not medical advice. Consult a physician before
						beginning any exercise program, and stop if you experience pain.
						Individual results vary, and no outcome is guaranteed.{" "}
						<Link to="/pages/$slug" params={{ slug: "medical-disclaimer" }}>
							Medical Disclaimer
						</Link>
					</p>
				</div>
			</div>
			<footer className="footer">
				<div className="wrap">
					<div className="footer__grid">
						<div>
							<h4>FitnessCA</h4>
							<p>
								Digital fitness programs: downloadable PDF guides and a training
								tracker spreadsheet. Nothing ships.
							</p>
							<p>
								For general fitness and educational purposes only, not medical
								advice. Individual results vary.
							</p>
						</div>
						<div>
							<h4>Policies &amp; info</h4>
							<ul>
								<li>
									<Link to="/pages/$slug" params={{ slug: "privacy-policy" }}>
										Privacy Policy
									</Link>
								</li>
								<li>
									<Link to="/pages/$slug" params={{ slug: "refund-policy" }}>
										Refund Policy
									</Link>
								</li>
								<li>
									<Link to="/pages/$slug" params={{ slug: "shipping-policy" }}>
										Shipping Policy
									</Link>
								</li>
								<li>
									<Link to="/pages/$slug" params={{ slug: "medical-disclaimer" }}>
										Medical Disclaimer
									</Link>
								</li>
								<li>
									<Link to="/pages/contact">Contact</Link>
								</li>
							</ul>
						</div>
						<div>
							<h4>Contact</h4>
							<p>
								<a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: "inherit" }}>
									{SUPPORT_EMAIL}
								</a>
							</p>
							<p>We aim to reply within 2 business days.</p>
						</div>
					</div>
					<div className="footer__copy">© 2026 FitnessCA</div>
				</div>
			</footer>
		</>
	);
}
