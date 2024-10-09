"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SingleWorkoutViewComponent from "@/components/workout/single-workout-view";
import { useQuery } from "@tanstack/react-query";
import { OctagonAlert } from "lucide-react";

export default function page({ params }: { params: { id: string } }) {
	const workoutId = params.id;
	const { data, isError, isLoading } = useQuery({
		queryKey: ["workoutId", { workoutId }],
		queryFn: async () => {
			const response = await fetch(
				`http://localhost:8085/api/v1/workout/${workoutId}`,
			);
			return (await response.json()) as Promise<WorkoutFullType>;
		},
	});

	console.log(data);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return (
			<Alert variant="destructive">
				<OctagonAlert className="h-4 w-4" />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>
					Failed to load exercise. Please try again.
				</AlertDescription>
			</Alert>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<SingleWorkoutViewComponent {...(data as WorkoutFullType)} />
		</div>
	);
}
