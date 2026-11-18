import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

const M = (
	<a href="mailto:fitnesscasupport@outlook.com">fitnesscasupport@outlook.com</a>
);

export type DocPage = {
	title: string;
	updated?: string;
	description: string;
	body: ReactNode;
};

const UPDATED = "October 17, 2026";

export const DOC_PAGES: Record<string, DocPage> = {
	"medical-disclaimer": {
		title: "Medical Disclaimer",
		updated: UPDATED,
		description:
			"FitnessCA programs are for general fitness and educational purposes only and are not medical advice.",
		body: (
			<>
				<p>
					The programs, guides, and other content sold or published by FitnessCA
					are for general fitness and educational purposes only. They are not
					medical advice and are not a substitute for professional medical
					advice, diagnosis, or treatment.
				</p>
				<h2>Not medical advice</h2>
				<p>
					Our products are not intended to diagnose, treat, cure, or prevent any
					disease, injury, or medical condition. Buying or using our products
					does not create a doctor-patient, therapist-patient, or other
					professional relationship, and the people who create FitnessCA
					programs are not acting as your physician, physical therapist, or
					other healthcare provider.
				</p>
				<h2>Consult a physician first</h2>
				<p>
					Talk to a physician or other qualified healthcare provider before you
					begin any exercise program, change your activity level, or follow any
					of the information in our products. This is especially important if
					you:
				</p>
				<ul>
					<li>are pregnant, may be pregnant, or have recently given birth;</li>
					<li>
						have a heart condition, high or low blood pressure, diabetes, or any
						other medical condition;
					</li>
					<li>have a current or past injury, or joint, back, or bone problems;</li>
					<li>take any medication; or</li>
					<li>have not exercised regularly for some time.</li>
				</ul>
				<h2>Stop if something feels wrong</h2>
				<p>
					Stop exercising immediately if you experience pain, chest pain or
					pressure, dizziness, light-headedness, unusual shortness of breath,
					numbness, or nausea. Seek medical attention if symptoms continue. In
					an emergency, call your local emergency number.
				</p>
				<h2>Assumption of risk</h2>
				<p>
					All physical activity carries some risk of injury. You choose to take
					part voluntarily, and you are responsible for exercising within your
					own limits, using safe technique, making sure your equipment is in
					good condition, and exercising in a safe space. To the fullest extent
					permitted by law, FitnessCA is not responsible for any injury or harm
					resulting from use of our products.
				</p>
				<h2>No guarantee of results</h2>
				<p>
					Individual results vary depending on many factors, including
					consistency, training history, sleep, nutrition, and health. We do not
					promise or guarantee any particular outcome.
				</p>
				<h2>Nutrition</h2>
				<p>
					Our products do not include individual nutrition or diet plans. For
					nutrition advice, consult a registered dietitian or your physician.
				</p>
				<h2>Age</h2>
				<p>Our products are designed for adults aged 18 and over.</p>
				<h2>Questions</h2>
				<p>Email {M}.</p>
			</>
		),
	},
	"refund-policy": {
		title: "Refund Policy",
		updated: UPDATED,
		description:
			"All FitnessCA products are digital and delivered immediately. Here is when we give refunds.",
		body: (
			<>
				<p>
					All of our products are digital and are delivered immediately after
					payment. For that reason, all sales are final once your download link
					has been issued, except in the situations listed below.
				</p>
				<h2>When we will give a refund</h2>
				<p>
					We will refund your purchase (or, if you prefer, replace the files)
					if:
				</p>
				<ul>
					<li>
						The files are defective or you can't access them, and we are unable
						to fix the problem within 5 business days of you contacting us;
					</li>
					<li>You were charged more than once for the same product by mistake;</li>
					<li>We did not deliver the product you paid for; or</li>
					<li>
						A refund is required by the consumer protection laws that apply to
						you.
					</li>
				</ul>
				<h2>When we will not give a refund</h2>
				<ul>
					<li>You changed your mind after the download link was issued.</li>
					<li>You did not use the product, or did not finish it.</li>
					<li>
						You did not get a particular result. Individual results vary and no
						outcome is guaranteed.
					</li>
					<li>
						You don't have the equipment listed on the product page. Please
						check the "Equipment required" section before buying.
					</li>
				</ul>
				<h2>How to request a refund</h2>
				<p>
					Email {M} within 14 days of your purchase. Include your order number
					and a short description of the problem (for example, a screenshot of
					an error message). We will reply within 2 business days.
				</p>
				<p>
					Approved refunds are returned to your original payment method within
					10 business days. Your bank or card provider may take a few more days
					to show the refund.
				</p>
				<h2>Customers in the EU and UK</h2>
				<p>
					Under EU and UK consumer law you normally have 14 days to cancel an
					online purchase. For digital content, that right ends once delivery
					begins, if you have agreed to immediate delivery and acknowledged that
					you lose the right to cancel. At checkout you are asked to give that
					agreement and acknowledgement before you can place your order. Your
					rights for faulty digital content are not affected.
				</p>
				<h2>Questions</h2>
				<p>
					If you have a problem with your order, please contact us first. Most
					access issues can be fixed quickly.
				</p>
			</>
		),
	},
	"shipping-policy": {
		title: "Shipping Policy",
		updated: UPDATED,
		description:
			"All FitnessCA products are digital. Nothing ships, and there are no shipping charges.",
		body: (
			<>
				<p>
					All FitnessCA products are digital. We do not ship any physical items,
					and there are no shipping charges.
				</p>
				<ul>
					<li>
						<b>How you receive your order:</b> after payment, we send an email
						with your download link.
					</li>
					<li>
						<b>When:</b> usually within minutes of payment.
					</li>
					<li>
						<b>How long links work:</b> download links expire 30 days after they
						are issued. Save your files to your device.
					</li>
					<li>
						<b>Didn't receive it?</b> Check your spam or promotions folder. If it
						isn't there after 1 hour, email {M} with your order number.
					</li>
				</ul>
				<p>
					See our{" "}
					<Link to="/pages/$slug" params={{ slug: "refund-policy" }}>
						Refund Policy
					</Link>{" "}
					for what happens if a file is defective or can't be accessed.
				</p>
			</>
		),
	},
	"privacy-policy": {
		title: "Privacy Policy",
		updated: UPDATED,
		description:
			"What personal information FitnessCA collects, how we use it, and your choices.",
		body: (
			<>
				<p>
					This Privacy Policy explains what personal information FitnessCA
					("we", "us") collects when you visit our website or buy our digital
					products, how we use it, who we share it with, and the choices and
					rights you have.
				</p>
				<h2>Information we collect</h2>
				<ul>
					<li>
						<b>Information you give us at checkout:</b> your email address,
						name, country, and postal code, and your choice about marketing
						emails.
					</li>
					<li>
						<b>Information you send us:</b> anything you include when you email
						us.
					</li>
					<li>
						<b>Payment information:</b> payments are handled by our payment
						provider. We do not see or store your full card number.
					</li>
					<li>
						<b>Order information:</b> what you bought, when, the price paid, and
						the consents you gave at checkout.
					</li>
					<li>
						<b>Technical information:</b> our hosting provider automatically
						processes basic request data, such as IP address, browser type, and
						the pages requested, to deliver and secure the website.
					</li>
				</ul>
				<p>
					We do not ask for health or medical information, and we ask that you
					do not send it to us.
				</p>
				<h2>Cookies and local storage</h2>
				<p>
					We do not use advertising cookies. Your cart is saved in your
					browser's local storage on your own device so it is still there when
					you come back; it is not sent to us until you check out. Our payment
					provider may set cookies that are needed to process your payment
					securely.
				</p>
				<h2>How we use your information</h2>
				<ul>
					<li>To process your order and deliver your digital products (contract).</li>
					<li>
						To send order confirmations, download links, and service messages
						(contract).
					</li>
					<li>
						To answer your questions and provide customer support (contract /
						legitimate interests).
					</li>
					<li>To prevent fraud and keep our website secure (legitimate interests).</li>
					<li>To meet legal, tax, and accounting obligations (legal obligation).</li>
					<li>
						To send marketing emails, only if you opted in at checkout. You can
						unsubscribe at any time (consent).
					</li>
				</ul>
				<p>
					The items in brackets are the legal bases we rely on under the EU and
					UK General Data Protection Regulation (GDPR).
				</p>
				<h2>Who we share it with</h2>
				<p>
					We share personal information only with service providers that help us
					run the store, and only as needed for the purposes above:
				</p>
				<ul>
					<li>
						<b>Hosting:</b> the provider that hosts this website.
					</li>
					<li>
						<b>Payments:</b> our payment provider, which processes your payment.
					</li>
					<li>
						<b>Email:</b> the email service we use to send receipts, download
						links, and, if you opt in, marketing emails.
					</li>
				</ul>
				<p>
					We may also disclose information if required by law, to protect our
					rights, or as part of a sale or transfer of our business. We do not
					sell or share personal information for targeted advertising.
				</p>
				<h2>How long we keep information</h2>
				<p>
					We keep order records for as long as applicable tax and accounting
					laws require. We keep other information only as long as needed for the
					purposes described above.
				</p>
				<h2>Your rights</h2>
				<p>
					<b>EEA, UK, and Switzerland (GDPR):</b> you have the right to access,
					correct, delete, or restrict use of your personal information; to
					object to processing based on legitimate interests; to data
					portability; to withdraw consent at any time; and to complain to your
					local data protection authority.
				</p>
				<p>
					<b>California (CCPA/CPRA) and other US states with privacy laws:</b>{" "}
					you have the right to know what personal information we collect and
					how we use and disclose it; to access, correct, and delete it; and not
					to be treated differently for exercising these rights. We do not sell
					or share personal information, and we do not collect sensitive
					personal information. You may use an authorized agent to make a
					request on your behalf.
				</p>
				<h2>How to make a request</h2>
				<p>
					Email {M} with the subject line "Privacy Request" and tell us what you
					would like us to do. We may need to verify your identity before acting
					on your request. We will respond within the time required by law
					(generally one month under GDPR and 45 days under CCPA).
				</p>
				<h2>Children</h2>
				<p>
					Our website and products are not intended for anyone under 18, and we
					do not knowingly collect personal information from children. If you
					believe a child has given us personal information, please contact us
					and we will delete it.
				</p>
				<h2>International transfers</h2>
				<p>
					Our service providers may process your information in countries other
					than the one you live in, including the United States. Where required,
					we rely on recognized safeguards such as the European Commission's
					Standard Contractual Clauses.
				</p>
				<h2>Security</h2>
				<p>
					We use reasonable measures to protect your information, including
					encrypted connections and signed, expiring download links, but no
					method of transmission or storage is completely secure.
				</p>
				<h2>Changes to this policy</h2>
				<p>
					We may update this Privacy Policy. We will post the new version here
					and update the date above.
				</p>
				<h2>Contact</h2>
				<p>FitnessCA · {M}</p>
			</>
		),
	},
};
