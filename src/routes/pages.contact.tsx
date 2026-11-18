import { createFileRoute } from "@tanstack/react-router";
import { SUPPORT_EMAIL } from "../lib/program-meta";

export const Route = createFileRoute("/pages/contact")({
	head: () => ({
		meta: [
			{ title: "Contact | FitnessCA" },
			{
				name: "description",
				content:
					"Questions about an order, a download link, or one of our programs? Get in touch.",
			},
		],
	}),
	component: ContactPage,
});

function ContactPage() {
	return (
		<div className="light on-light doc">
			<div className="wrap">
				<div className="doc__inner">
					<h1>Contact</h1>
					<p style={{ marginTop: 28 }}>
						Questions about an order, a download link, or one of our programs?
						Get in touch. Please include your order number if your question is
						about a purchase.
					</p>
					<p>
						<b>Email:</b>{" "}
						<a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
					</p>
					<p>
						<b>Response time:</b> we aim to reply within 2 business days.
					</p>
					<p>
						We can't give personal medical advice. For health questions, please
						talk to your physician.
					</p>
					<a className="btn btn--black" href={`mailto:${SUPPORT_EMAIL}`}>
						Email us
					</a>
				</div>
			</div>
		</div>
	);
}
