import { Group, Paper, ScrollArea, Stack } from "@mantine/core";
import useActivities from "../../api/useActivities";
import Activity from "./_activity";
import ActivityInput from "./_activityInput";
import Progress from "./_progress";
import classes from "./Home.module.css";

export default function Home() {
	const { data: activities, isPending, error } = useActivities();

	if (isPending) return <p>Laden...</p>;
	if (error) return <p>Er ging iets mis.</p>;

	return (
		<Group className={classes.wrapper} align="flex-start" grow>
			<Stack className={classes.leftPanel}>
				<ActivityInput />
				<ScrollArea className={classes.log}>
					<Stack>
						{activities?.map((activity) => (
							<Activity key={activity.id} activity={activity} />
						))}
					</Stack>
				</ScrollArea>
			</Stack>
			<Paper className={classes.rightPanel}>
				<Progress activities={activities} />
			</Paper>
		</Group>
	);
}
