"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@radix-ui/react-select";
import { Dumbbell, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

import { env } from "@/env/client";
import { useState } from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";

export function WorkoutListComponent() {
	const [workouts, setWorkouts] = useState<WorkoutType[]>();

	const base = env.NEXT_PUBLIC_BASE_URL;

	const {
		data: workoutData,
		isError,
		isLoading,
		isPending,
	} = useQuery({
		queryKey: ["workouts", { workouts }],
		queryFn: async () => {
			const response = await fetch(`${base}/api/v1/workouts`);
			return (await response.json()) as WorkoutType[];
		},
	});

	// const [searchTerm, setSearchTerm] = useState("");
	// const [filterType, setFilterType] = useState("");

	// const filteredQuests = workoutList.filter(
	// 	(quest) =>
	// 		quest.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
	// 		(filterType === "" || quest.type === filterType),
	// );

	return (
		<div className="container mx-auto px-4 py-8">
			<header className="text-center mb-8">
				<h1 className="text-3xl font-bold mb-2">My Workouts</h1>
				<p className="text-muted-foreground">
					"Every quest completed is a step towards a stronger, healthier you."
				</p>
			</header>

			<div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
				<div className="flex-1 w-full sm:w-auto">
					<div className="relative">
						<Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
						<Input
							type="text"
							placeholder="Search for workout..."
							className="pl-8"
						/>
					</div>
				</div>
				<Select>
					<SelectTrigger className="w-full sm:w-[180px]">
						<SelectValue placeholder="Filter by type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all-types">All types</SelectItem>
						<SelectItem value="strength">Strength</SelectItem>
						<SelectItem value="cardio">Cardio</SelectItem>
						<SelectItem value="flexibility">Flexibility</SelectItem>
					</SelectContent>
				</Select>
				<Link href="/workout/create-workout">
					<Button>
						<Dumbbell className="mr-2 h-4 w-4" /> Create New Workout
					</Button>
				</Link>
			</div>

			<div>
				{isError && <p>Error: error something happened</p>}
				{isLoading && isPending && <p>Loading...</p>}
				{!isLoading && !isPending && (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{workoutData?.map((workout) => (
							<Link href={`/workout/${workout.id}`} key={workout.id}>
								<Card className="h-full hover:shadow-lg transition-shadow duration-200">
									<CardHeader>
										<div className="w-16 h-16 mx-auto mb-2">
											<img
												src={workout.cover_image}
												alt={workout.name}
												className="w-full h-full object-cover rounded-full"
											/>
										</div>
										<CardTitle className="text-center">
											{workout.name}
										</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-center text-muted-foreground">
											{workout.description}
										</p>
									</CardContent>
									<CardFooter className="flex justify-between">
										<span className="text-sm font-medium capitalize">
											{workout.category}
										</span>
									</CardFooter>
								</Card>
							</Link>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
