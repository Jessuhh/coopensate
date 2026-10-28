import { Text, Tooltip } from "@mantine/core";
import {
	ACTIVITY_TYPE_UNIT,
	type ActivityType,
	type ActivityTypeUnit,
} from "../../api/activity_type/activityType";
import type { Activity } from "../../api/useActivities";
import { round } from "../../utils/round";
import { KM_TO_EMISSION_RATIO } from "./_progress";

type ActivityProps = {
	activity: Activity;
};

const ACTIVITY_DESCRIPTION = {
	cycle: "te fietsen",
	eat_less_beef: "minder rundvlees te eten",
	eat_less_chicken: "minder kip te eten",
	eat_less_pork: "minder varkensvlees te eten",
	eat_less_lamb: "minder schaapsvlees te eten",
	emission: "minder CO₂ uit te stoten",
	carpool: "te carpoolen",
	no_tv: "geen tv te kijken",
	shorter_shower: "korter te douchen",
} as const satisfies Record<string, string>;

export default function Activity({ activity }: ActivityProps) {
	const km_saved = activity.emission / KM_TO_EMISSION_RATIO;

	return (
		<Text>
			{activity.profiles.name} heeft{" "}
			<Tooltip label={`${activity.emission}g CO₂`} inline>
				<Text inherit span>
					{round(km_saved)}km
				</Text>
			</Tooltip>{" "}
			gespaard door{" "}
			{round(activity.emission / activity.activities_types?.emission_factor)}
			{
				ACTIVITY_TYPE_UNIT[activity.activities_types.unit as ActivityTypeUnit]
			}{" "}
			{ACTIVITY_DESCRIPTION[activity.type_id as ActivityType]}
		</Text>
	);
}
