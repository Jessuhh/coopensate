import { Progress as MantineProgress, Stack, Text } from "@mantine/core";
import type { Activities } from "../../api/useActivities";

const TRIP_DISTANCE_KM = 6233;
const VEHICLE_COUNT = 2;
const TOTAL_TRIP_DISTANCE_KM = TRIP_DISTANCE_KM * VEHICLE_COUNT;
export const KM_TO_EMISSION_RATIO = 170;
const TOTAL_TRIP_EMISSION = TOTAL_TRIP_DISTANCE_KM * KM_TO_EMISSION_RATIO;

type ProgressProps = {
	activities: Activities;
};

export default function Progress({ activities }: ProgressProps) {
	const totalEmission = activities.reduce(
		(partialSum, a) => partialSum + a.emission,
		0,
	);
	// % = deel / geheel * 100
	const percentageSaved = (totalEmission / TOTAL_TRIP_EMISSION) * 100;
	const saved = Math.round(percentageSaved * 100) / 100;

	return (
		<Stack>
			<Text>
				Reislengte: {TOTAL_TRIP_DISTANCE_KM}km ({VEHICLE_COUNT} voertuigen x{" "}
				{TRIP_DISTANCE_KM}km)
			</Text>
			<Text>Gespaard: {saved}%</Text>
			<MantineProgress value={saved} />
		</Stack>
	);
}
