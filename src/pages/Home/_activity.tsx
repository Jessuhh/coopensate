import { Text } from "@mantine/core";
import type { Activity } from "../../api/useActivities";
import { KM_TO_EMISSION_RATIO } from "./_progress";

type ActivityProps = {
	activity: Activity;
};

export default function Activity({ activity }: ActivityProps) {
	const km_saved = activity.emission / KM_TO_EMISSION_RATIO;

	return (
		<Text>
			{activity.profiles.name} heeft {km_saved}km ({activity.emission} gram CO2)
			gespaard door{" "}
			{activity.emission / activity.activities_types?.emission_factor}km te
			fietsen
		</Text>
	);
}
