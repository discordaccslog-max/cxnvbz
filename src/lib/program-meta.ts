// Display details the catalog doesn't carry, keyed by the source store's slug.
export type ProgramMeta = {
	slug: string;
	tags: string[];
	medical: string;
	results: string;
	refundWhat: "program" | "guide" | "bundle";
};

const MED_STD =
	"is for general fitness and educational purposes only and is not medical advice. It is not intended to diagnose, treat, cure, or prevent any disease or condition. Consult a physician before beginning any exercise program, especially if you are pregnant, injured, or have a medical condition. Stop exercising immediately if you experience pain, dizziness, or shortness of breath.";

const RESULTS =
	"Individual results vary depending on factors such as consistency, training history, sleep, nutrition, and health. No specific outcome is guaranteed.";

export const PROGRAMS: ProgramMeta[] = [
	{
		slug: "beginner-strength-foundations",
		tags: ["Beginner", "PDF"],
		medical: `This program ${MED_STD}`,
		results: RESULTS,
		refundWhat: "program",
	},
	{
		slug: "home-workout-starter-kit",
		tags: ["Beginner", "PDF"],
		medical: `This guide ${MED_STD}`,
		results: RESULTS,
		refundWhat: "guide",
	},
	{
		slug: "mobility-flexibility-program",
		tags: ["All levels", "PDF"],
		medical:
			"This guide is for general fitness and educational purposes only and is not medical advice or physical therapy. It is not intended to diagnose, treat, cure, or prevent any disease, injury, or condition. Consult a physician before beginning any exercise program, especially if you are pregnant, injured, or have a medical condition. Stop immediately if you experience pain, dizziness, or numbness.",
		results:
			"Individual results vary depending on factors such as consistency, training history, and health. No specific outcome is guaranteed.",
		refundWhat: "guide",
	},
	{
		slug: "progressive-overload-training-guide",
		tags: ["Intermediate", "PDF", "Spreadsheet"],
		medical: `This guide ${MED_STD}`,
		results: RESULTS,
		refundWhat: "guide",
	},
	{
		slug: "complete-strength-bundle",
		tags: ["Bundle", "PDF", "Spreadsheet"],
		medical: `These programs ${MED_STD.replace("is for", "are for").replace("is not medical", "are not medical").replace("It is not intended", "They are not intended")}`,
		results: RESULTS,
		refundWhat: "bundle",
	},
];

export const ORDER = PROGRAMS.map((p) => p.slug);

export function metaFor(slug: string): ProgramMeta | undefined {
	return PROGRAMS.find((p) => p.slug === slug);
}

export function sortPrograms<T extends { slug: string }>(items: T[]): T[] {
	const rank = (slug: string) => {
		const at = ORDER.indexOf(slug);
		return at === -1 ? ORDER.length : at;
	};
	return [...items].sort((a, b) => rank(a.slug) - rank(b.slug));
}

export const SUPPORT_EMAIL = "fitnesscasupport@outlook.com";
