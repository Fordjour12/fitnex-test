"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Dumbbell } from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";

// Mock data for the side quest

const workoutdata = {
	id: 1,
	name: "Full Body Circuit",
	category: "Strength",
	description:
		"A workout with a mix of strength exercises and timed rest periods.",
	estimated_time: 45,
	cover_image: "circuit.png",
	difficulty_level: "Intermediate",
	workout_exercises: [
		{
			order_index: 1,
			type: "exercise",
			exercise_id: 101,
			reps: 15,
			set: 2,
		},
		{
			order_index: 2,
			type: "exercise",
			exercise_id: 102,
			reps: 20,
			set: 2,
		},
		{
			order_index: 3,
			type: "exercise",
			exercise_id: 103,
			duration: 30,
			set: 2,
		},
		{
			order_index: 4,
			type: "rest",
			duration: 60,
		},
		{
			order_index: 5,
			type: "exercise",
			exercise_id: 104,
			reps: 15,
			set: 2,
		},
		{
			order_index: 6,
			type: "exercise",
			exercise_id: 105,
			reps: 10,
			set: 2,
		},
		{
			order_index: 7,
			type: "rest",
			duration: 60,
			set: 2,
		},
	],
};

export function WorkoutOverviewComponent() {
	return (
		<div className="container mx-auto px-4 py-8">
			<Link
				href="/workout"
				className="inline-flex items-center text-primary hover:underline mb-6"
			>
				<ArrowLeft className="mr-2 h-4 w-4" />
				Back to Workouts
			</Link>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div className="md:col-span-2">
					<h1 className="text-3xl font-bold mb-4">{workoutdata.name}</h1>
					<p className="text-muted-foreground mb-6">
						{workoutdata.description}
					</p>
					<div className="flex flex-row gap-4 ">
						<p className="text-sm">{workoutdata.estimated_time} minutes</p>
						<Badge>{workoutdata.difficulty_level}</Badge>
						<Badge variant={"outline"}>{workoutdata.category}</Badge>
					</div>

					<h2 className="text-2xl font-semibold mb-4">Workouts</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						{workoutdata.workout_exercises.map((workout) => (
							<Card key={workoutdata.id}>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										{workout.exercise_id}
									</CardTitle>
									<Dumbbell className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{workout.reps ? `${workout.reps} reps` : workout.duration}
									</div>
								</CardContent>
							</Card>
						))}

						{/* {sideQuest.workouts.map((workout) => (
							<Card key={workout.id}>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										{workout.name}
									</CardTitle>
									<Dumbbell className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{workout.reps ? `${workout.reps} reps` : workout.duration}
									</div>
								</CardContent>
							</Card>
						))} */}
					</div>
				</div>

				<div>
					<Card>
						<CardContent className="flex flex-col items-center pt-6">
							<div className="w-40 h-40 rounded-full overflow-hidden mb-4">
								<img
									src={workoutdata.cover_image}
									alt={workoutdata.name}
									className="w-full h-full object-cover"
								/>
							</div>
							<h3 className="text-xl font-semibold mb-2">{workoutdata.name}</h3>
							<p className="text-center text-muted-foreground mb-4">
								{workoutdata.workout_exercises.length} workouts
							</p>
							<Button className="w-full">Start Workout</Button>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
