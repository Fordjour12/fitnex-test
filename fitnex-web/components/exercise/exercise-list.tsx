"use client";

/*import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";*/
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { env } from "@/env/client";
import { useQuery } from "@tanstack/react-query";
import { Dumbbell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export type ExerciseType = {
	id: number;
	name: string;
	description: string;
	image_url: string;
	video_url: string;
	created_at: string;
	updated_at: string;
};

export function ExerciseListComponent() {
	// const [searchTerm, setSearchTerm] = useState("");
	// const [filterType, setFilterType] = useState("");
	const [exercises, setExercises] = useState<ExerciseType[]>();

	const base = env.NEXT_PUBLIC_BASE_URL;

	// const filteredQuests = workoutList.filter(
	//   (quest) =>
	//     quest.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
	//     (filterType === "" || quest.type === filterType),
	// );

	const {
		data: exercisesData,
		isError,
		isPending,
		isLoading,
	} = useQuery({
		queryKey: ["exercises", { exercises }],
		queryFn: async () => {
			const response = await fetch("http://localhost:8085/api/v1/exercise");
			return (await response.json()) as ExerciseType[];
		},
	});

	return (
		<div className="container mx-auto px-4 py-8">
			<header className="text-center mb-8">
				<h1 className="text-3xl font-bold mb-2">My Exercises</h1>
				<p className="text-muted-foreground">
					Every exercise completed is a step towards a stronger, healthier you.
				</p>
			</header>

			<div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
				{/*<div className="flex-1 w-full sm:w-auto">
          <
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
        </Select>*/}
				<Link href="/exercise/create-workout">
					<Button>
						<Dumbbell className="mr-2 h-4 w-4" /> Create New Exercise
					</Button>
				</Link>
			</div>
			{/* 
			<div>
				{isError && <p>Error: error something happened</p>}
				{isLoading && isPending}
				{!isLoading && !isPending && (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{exercisesData?.map((exercise) => (
							<Link href={`/exercise/${exercise.id}`} key={exercise.id}>
								<Card className="h-full hover:shadow-lg transition-shadow duration-200">
									<CardHeader>
										<div className="w-16 h-16 mx-auto mb-2">
											<Image
												width={200}
												height={100}
												src={exercise.image}
												alt={exercise.name}
												className="w-full h-full object-cover rounded-full"
											/>
										</div>
										<CardTitle className="text-center">
											{exercise.name}
										</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-center text-muted-foreground">
											{exercise.description}
										</p>
									</CardContent>
									<CardFooter className="flex justify-between">
										<span className="text-sm font-medium capitalize">
											{exercise.type}
										</span>
									</CardFooter>
								</Card>
							</Link>
						))}
					</div>
				)}
			</div> */}

			<div>
				{isError && <p>Error: error something happened</p>}
				{isLoading && isPending}
				{!isLoading && !isPending && (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{exercisesData?.map((exercise) => (
							<Link href={`/exercise/${exercise.id}`} key={exercise.id}>
								<Card className="h-full hover:shadow-lg transition-shadow duration-200">
									<CardHeader>
										<div className="w-16 h-16 mx-auto mb-2">
											<Image
												width={200}
												height={100}
												src={exercise.image_url}
												alt={exercise.name}
												className="w-full h-full object-cover rounded-full"
											/>
										</div>
										<CardTitle className="text-center">
											{exercise.name}
										</CardTitle>
									</CardHeader>
									<CardContent>
										<p className="text-center text-muted-foreground">
											{exercise.description}
										</p>
									</CardContent>
									<CardFooter className="flex justify-between">
										<span className="text-sm font-medium capitalize">
											{exercise.created_at}
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
