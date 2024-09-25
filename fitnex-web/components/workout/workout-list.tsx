"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Dumbbell, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock data for workouts
const workoutList = [
	{
		id: 1,
		name: "30-Day Ab Challenge",
		description: "Transform your core in just 30 days",
		image: "/placeholder.svg?height=100&width=100",
		workouts: 5,
		type: "strength",
	},
	{
		id: 2,
		name: "Couch to 5K",
		description: "Start running with this beginner-friendly program",
		image: "/placeholder.svg?height=100&width=100",
		workouts: 3,
		type: "cardio",
	},
	{
		id: 3,
		name: "Yoga for Flexibility",
		description: "Improve your flexibility with daily yoga sessions",
		image: "/placeholder.svg?height=100&width=100",
		workouts: 4,
		type: "flexibility",
	},
	{
		id: 4,
		name: "HIIT Blast",
		description: "High-intensity interval training for quick results",
		image: "/placeholder.svg?height=100&width=100",
		workouts: 6,
		type: "cardio",
	},
	{
		id: 5,
		name: "Strength Foundations",
		description: "Build a strong base with fundamental exercises",
		image: "/placeholder.svg?height=100&width=100",
		workouts: 5,
		type: "strength",
	},
	{
		id: 6,
		name: "Mindful Movement",
		description: "Combine meditation with gentle exercises",
		image: "/placeholder.svg?height=100&width=100",
		workouts: 3,
		type: "flexibility",
	},
];

export function WorkoutListComponent() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterType, setFilterType] = useState("");

	const filteredQuests = workoutList.filter(
		(quest) =>
			quest.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
			(filterType === "" || quest.type === filterType),
	);

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
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="pl-8"
						/>
					</div>
				</div>
				<Select value={filterType} onValueChange={setFilterType}>
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
				<Link href="/sidequest/create-side-quest">
					<Button>
						<Dumbbell className="mr-2 h-4 w-4" /> Create New Workout
					</Button>
				</Link>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{filteredQuests.map((quest) => (
					<Link href={`/sidequest/${quest.id}`} key={quest.id}>
						<Card className="h-full hover:shadow-lg transition-shadow duration-200">
							<CardHeader>
								<div className="w-16 h-16 mx-auto mb-2">
									<img
										src={quest.image}
										alt={quest.name}
										className="w-full h-full object-cover rounded-full"
									/>
								</div>
								<CardTitle className="text-center">{quest.name}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-center text-muted-foreground">
									{quest.description}
								</p>
							</CardContent>
							<CardFooter className="flex justify-between">
								<span className="text-sm text-muted-foreground">
									{quest.workouts} workouts
								</span>
								<span className="text-sm font-medium capitalize">
									{quest.type}
								</span>
							</CardFooter>
						</Card>
					</Link>
				))}
			</div>

			{filteredQuests.length === 0 && (
				<div className="text-center mt-8">
					<p className="text-muted-foreground">
						No side quests found. Try adjusting your search or filter.
					</p>
				</div>
			)}
		</div>
	);
}
