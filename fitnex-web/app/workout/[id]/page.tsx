import type { WorkoutType } from "@/components/workout/workout-list";
import { WorkoutOverviewComponent } from "@/components/workout/workout-overview";
import { useQuery } from "@tanstack/react-query";

export default function page({ params }: { params: { id: string } }) {
	const workoutId = params.id;

	let workout: WorkoutType;

	const { data, isError, isLoading } = useQuery({
		queryKey: ["workout", { workoutId }],
		queryFn: async () => {
			const response = await fetch(
				`http://localhost:8085/api/v1/workout/${workoutId}`,
			);
			return (await response.json()) as WorkoutType;
		},
	});

	return <WorkoutOverviewComponent />;
}
