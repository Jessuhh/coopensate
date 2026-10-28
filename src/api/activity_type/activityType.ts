export const ACTIVITY_TYPES = {
	cycle: "Fietsen",
	eat_less_beef: "Minder rundvlees eten",
	eat_less_chicken: "Minder kip eten",
	eat_less_pork: "Minder varkensvlees eten",
	eat_less_lamb: "Minder lamsvlees eten",
	emission: "CO₂-uitstoot",
	carpool: "Carpoolen",
	no_tv: "Geen tv kijken",
	shorter_shower: "Korter douchen",
} as const satisfies Record<string, string>;

export type ActivityType = keyof typeof ACTIVITY_TYPES;

export const ACTIVITY_TYPE_UNIT = {
	kilometer: "km",
	gram: "g",
	day: " dag",
	minute: " minuten",
} as const satisfies Record<string, string>;

export type ActivityTypeUnit = keyof typeof ACTIVITY_TYPE_UNIT;
