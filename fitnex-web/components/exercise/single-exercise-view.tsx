"use client";

import { DeleteModalComponent } from "@/components/delete-modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export interface SingleExerciseType {
	id: number;
	name: string;
	description: string;
	video_url: string;
	image_url: string;
	created_at: string;
	updated_at: string;
}

export function SingleExerciseViewComponent({
	...exercise
}: SingleExerciseType) {
	const [isPlaying, setIsPlaying] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null); // Reference to the video player

	const togglePlay = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause();
			} else {
				videoRef.current.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	const router = useRouter();
	const queryClient = useQueryClient();

	// useMutation for deleting exercise
	const deleteMutation = useMutation({
		mutationFn: async (exerciseId: string) => {
			return await fetch(
				`http://localhost:8085/api/v1/delete-exercise/${exerciseId}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["exercises"],
				exact: true,
			});
			router.push("/exercise");
		},
		onError: (error) => {
			console.error("Error deleting exercise", error);
		},
	});

	const deleteExerciserFn = (exerciseId: string) => {
		deleteMutation.mutate(exerciseId);
	};

	return (
		<div className="container mx-auto px-4 py-8">
			<Link
				href="/exercise"
				className="inline-flex items-center text-primary hover:underline mb-6"
			>
				<ArrowLeftIcon className="mr-2 h-4 w-4" />
				Back to All Exercises
			</Link>

			<div className="flex flex-col lg:flex-row gap-8">
				{/* Video Player */}
				<div className="lg:w-2/3">
					<Card className="w-full aspect-video bg-emerald-800 relative overflow-hidden">
						<video
							ref={videoRef} // Attach the ref to control playback
							className="w-full h-full object-cover"
							poster={exercise.image_url}
						>
							<source src={exercise?.video_url} type="video/mp4" />
							<track kind="captions" />
						</video>

						{/* Play/Pause button overlay */}
						<div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
							<Button
								onClick={togglePlay}
								variant="secondary"
								size="lg"
								className="text-white bg-emerald-600 hover:bg-emerald-700"
							>
								{isPlaying ? "Pause" : "Play"}
							</Button>
						</div>
					</Card>
				</div>

				{/* Exercise Details */}
				<div className="lg:w-1/3">
					<Card>
						<CardHeader>
							<div className="w-full h-48 mb-4 overflow-hidden rounded-md">
								<img
									src={exercise?.image_url}
									alt={exercise?.name}
									className="w-full h-full object-cover"
								/>
							</div>
							<CardTitle className="text-2xl font-bold">
								{exercise?.name}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<p className="text-muted-foreground mb-4">
								{exercise?.description}
							</p>
							<div>
								<p>
									<span className="font-medium">Added on:</span>{" "}
									{exercise.created_at}
								</p>
								<p>
									<span className="font-medium">Last updated:</span>{" "}
									{exercise.updated_at}
								</p>
							</div>
							<div className="flex gap-4 mt-4">
								<Button>
									<Link
										href="/exercise/update/[id]"
										as={`/exercise/update/${exercise?.id}`}
									>
										Edit Exercise
									</Link>
								</Button>

								<DeleteModalComponent
									itemName={exercise?.name}
									onDelete={() => deleteExerciserFn(String(exercise.id))}
									buttonName={"Delete Exercise"}
								/>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>

			{/* See similar exercises */}
			<div className="mt-8">
				<h3>See similar exercises</h3>
			</div>
		</div>
	);
}
