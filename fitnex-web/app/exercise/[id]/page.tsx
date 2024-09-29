"use client";
import {
	type SingleExerciseType,
	SingleExerciseViewComponent,
} from "@/components/exercise/single-exercise-view";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { env } from "@/env/client";
import { useQuery } from "@tanstack/react-query";
import { OctagonAlert } from "lucide-react";

export default function page({ params }: { params: { id: string } }) {
	const exerciseId = params.id;
	const base = env.NEXT_PUBLIC_BASE_URL;

	const { data, isLoading, isError } = useQuery({
		queryKey: ["exerciseid", { exerciseId }],
		queryFn: async () => {
			const response = await fetch(
				`http://localhost:8085/api/v1/exercise/${exerciseId}`,
			);

			return (await response.json()) as Promise<SingleExerciseType>;
		},
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	console.log(data);

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
			<SingleExerciseViewComponent {...(data as SingleExerciseType)} />
		</div>
	);
}
