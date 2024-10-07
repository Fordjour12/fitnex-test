"use client";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
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
import Link from "next/link";

export type WorkoutType = {
	id: number;
	name: string;
	category: string;
	description: string;
	estimated_time: number;
	cover_image: string;
	difficulty_level: string;
	workout_exercises: {
		order_index: number;
		type: string;
		exercise_id?: number;
		execise_id?: number;
		reps?: number;
		duration?: number;
		set?: number;
	}[];
};

// Mock data for workouts
const workoutdata = [
	{
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
				execise_id: 101,
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
			{ order_index: 4, type: "rest", duration: 60 },
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
			{ order_index: 7, type: "rest", duration: 60, set: 2 },
		],
	},
];

/*
const [workouts, setWorkouts] = useState<WorkoutType[]>();

const base = env.NEXT_PUBLIC_BASE_URL;

const { data } = useQuery({
	queryKey: ["workouts", { workouts }],
	queryFn: async () => {
		const response = await fetch(`${base}/workout`);
		return (await response.json()) as WorkoutType[];
	},
});
*/

export function WorkoutListComponent() {
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

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{workoutdata.map((workout) => (
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
								<CardTitle className="text-center">{workout.name}</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-center text-muted-foreground">
									{workout.description}
								</p>
							</CardContent>
							<CardFooter className="flex justify-between">
								<Badge>
									<span className="text-sm font-medium capitalize">
										{workout.category}
									</span>
								</Badge>
							</CardFooter>
						</Card>
					</Link>
				))}
			</div>
		</div>
	);
}
