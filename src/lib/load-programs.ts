import { createServerFn } from "@tanstack/react-start";
import { loadCollectionStretch, type CollectionItem } from "../whop.server";
import { sortPrograms } from "./program-meta";

export type Programs = { items: CollectionItem[]; failed: boolean };

// The whole catalog is five products, so one stretch reads all of it.
export const loadPrograms = createServerFn({ method: "GET" }).handler(
	async (): Promise<Programs> => {
		try {
			const stretch = await loadCollectionStretch("all", null);
			return {
				items: sortPrograms(stretch.items),
				failed: stretch.unread === true,
			};
		} catch {
			return { items: [], failed: true };
		}
	},
);
