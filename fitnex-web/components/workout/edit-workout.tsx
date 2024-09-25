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
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, X } from "lucide-react";
import { useState } from "react";

interface Exercise {
	id: string;
	name: string;
	type: string;
}

interface Workout {
	id: string;
	name: string;
	description: string;
	imageUrl: string;
	exercise: Exercise[];
}

const workoutTypes = [
	"Strength",
	"Cardio",
	"Flexibility",
	"Balance",
	"Endurance",
];

// Mock data for the existing side quest
const existingWorkout: Workout = {
	id: "1",
	name: "30-Day Ab Challenge",
	description:
		"Transform your core in just 30 days with this intensive ab workout program.",
	imageUrl: "/placeholder.svg?height=100&width=100",
	exercise: [
		{ id: "w1", name: "Crunches", type: "Strength" },
		{ id: "w2", name: "Plank", type: "Strength" },
		{ id: "w3", name: "Russian Twists", type: "Strength" },
	],
};

export function EditWorkoutComponent() {
	const [workout, setWorkout] = useState<Workout>(existingWorkout);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setWorkout({ ...workout, [e.target.name]: e.target.value });
	};

	const handleAddWorkout = () => {
		if (workout.exercise.length < 5) {
			setWorkout({
				...workout,
				exercise: [
					...workout.exercise,
					{ id: `w${Date.now()}`, name: "", type: "" },
				],
			});
		}
	};

	const handleRemoveWorkout = (id: string) => {
		setWorkout({
			...workout,
			exercise: workout.exercise.filter((workout) => workout.id !== id),
		});
	};

	const handleWorkoutChange = (
		id: string,
		field: keyof Workout,
		value: string,
	) => {
		setWorkout({
			...workout,
			exercise: workout.exercise.map((workout) =>
				workout.id === id ? { ...workout, [field]: value } : workout,
			),
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Here you would typically send the updated data to your backend
		console.log("Updated Workout :", workout);
	};

	const handleCancel = () => {
		// Here you would typically redirect to the side quest overview page
		console.log("Edit cancelled");
	};

	const isFormValid =
		workout.name.trim() !== "" &&
		workout.description.trim() !== "" &&
		workout.exercise.length > 0 &&
		workout.exercise.every(
			(workout) => workout.name.trim() !== "" && workout.type !== "",
		);

	return (
		<div className="container mx-auto px-4 py-8">
			<Card className="w-full max-w-2xl mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl font-bold">Edit Workout </CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">Quest Name</Label>
							<Input
								id="name"
								name="name"
								value={workout.name}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="description">Quest Description</Label>
							<Textarea
								id="description"
								name="description"
								value={workout.description}
								onChange={handleInputChange}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="imageUrl">Quest Image URL</Label>
							<Input
								id="imageUrl"
								name="imageUrl"
								type="url"
								value={workout.imageUrl}
								onChange={handleInputChange}
								placeholder="https://example.com/image.jpg"
							/>
						</div>
						<div className="space-y-2">
							<Label>Workouts (up to 5)</Label>
							{workout.exercise.map((workout, index) => (
								<div key={workout.id} className="flex items-center space-x-2">
									<Input
										value={workout.name}
										onChange={(e) =>
											handleWorkoutChange(workout.id, "name", e.target.value)
										}
										placeholder="Workout name"
										className="flex-grow"
									/>
									<Select
										value={workout.type}
										onValueChange={(value) =>
											handleWorkoutChange(workout.id, "type", value)
										}
									>
										<SelectTrigger className="w-[180px]">
											<SelectValue placeholder="Select type" />
										</SelectTrigger>
										<SelectContent>
											{workoutTypes.map((type) => (
												<SelectItem key={type} value={type}>
													{type}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<Button
										type="button"
										variant="ghost"
										size="icon"
										onClick={() => handleRemoveWorkout(workout.id)}
									>
										<X className="h-4 w-4" />
									</Button>
								</div>
							))}
							{workout.exercise.length < 5 && (
								<Button
									type="button"
									variant="outline"
									onClick={handleAddWorkout}
									className="mt-2"
								>
									<PlusCircle className="mr-2 h-4 w-4" /> Add Workout
								</Button>
							)}
						</div>
					</form>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button type="button" variant="outline" onClick={handleCancel}>
						Cancel
					</Button>
					<Button type="submit" disabled={!isFormValid} onClick={handleSubmit}>
						Update Quest
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
