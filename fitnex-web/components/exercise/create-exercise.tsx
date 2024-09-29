"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";

const isClient = typeof window !== "undefined";

const ExerciseSchema = z.object({
	name: z.string().min(1, "Exercise name is required"),
	description: z.string().min(1, "Exercise description is required"),
	imageUrl: isClient
		? z
				.any()
				.refine(
					(fileList) => fileList instanceof FileList && fileList.length === 1,
					"Please select an image",
				)
		: z.any(), // Fallback for server-side rendering
	videoUrl: isClient
		? z
				.any()
				.refine(
					(fileList) => fileList instanceof FileList && fileList.length === 1,
					"Please select a video",
				)
		: z.any(), // Fallback for server-side rendering
});

type ExerciseSchemaType = z.infer<typeof ExerciseSchema>;

export function CreateExerciseComponent() {
	// const [exerciseName, setExerciseName] = useState("");
	// const [exerciseDescription, setExerciseDescription] = useState("");
	// const [videoUrl, setVideoUrl] = useState("");
	// const [imageUrl, setImageUrl] = useState("");

	// const handleSubmit = (e: React.FormEvent) => {
	// 	e.preventDefault();
	// 	// Here you would typically send the data to your backend
	// 	console.log({ exerciseName, exerciseDescription, videoUrl, imageUrl });
	// };

	// const isFormValid =
	// 	exerciseName.trim() !== "" &&
	// 	exerciseDescription.trim() !== "" &&
	// 	videoUrl.trim() !== "" &&
	// 	imageUrl.trim() !== "";

	const form = useForm<ExerciseSchemaType>({
		resolver: zodResolver(ExerciseSchema),
	});

	const fileRef = form.register("imageUrl");
	const fileRef2 = form.register("videoUrl");

	const watchedValues = form.watch();

	const onSubmit = async (data: ExerciseSchemaType) => {
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("description", data.description);

		if (data.videoUrl && data.videoUrl.length > 0) {
			const videoFile = data.videoUrl.item(0);
			if (videoFile) {
				formData.append("video", videoFile);
			}
		}

		const imageFile = data.imageUrl.item(0);
		if (imageFile) {
			formData.append("image", imageFile);
		}

		mutation.mutate(formData);
	};

	const mutation = useMutation({
		mutationFn: async (formData: FormData) => {
			const response = await fetch(
				"http://localhost:8085/api/v1/create-exercise",
				{
					method: "POST",
					body: formData,
				},
			);

			if (!response.ok) {
				throw new Error("Failed to submit exercise");
			}

			return response.json();
		},
		onSuccess: (data) => {
			console.log("Exercise created successfully", data);
			form.reset();
		},
		onError: (error) => {
			console.error("Error creating exercise", error);
		},
	});

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-8 text-center">Create Exercise</h1>
			<Link
				href="/exercise"
				className="inline-flex items-center text-primary hover:underline mb-6"
			>
				<ArrowLeft className="mr-2 h-4 w-4" />
				Back to All Exercises
			</Link>
			<div className="flex flex-col lg:flex-row gap-8">
				{/* Left Section - Form */}

				<div className="w-full lg:w-1/2">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-full p-10"
						>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Exercise Name</FormLabel>
										<FormControl>
											<Input placeholder="Sit-ups" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel htmlFor="quest-description">
											Exercise Description
										</FormLabel>
										<FormControl>
											<Textarea id="exercise-description" required {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="videoUrl"
								render={() => (
									<FormItem>
										<FormLabel>Exercise Video</FormLabel>
										<FormControl>
											<Input type="file" accept="video/*" {...fileRef2} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="imageUrl"
								render={() => (
									<FormItem>
										<FormLabel>Image URL</FormLabel>
										<FormControl>
											<Input type="file" accept="image/*" {...fileRef} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button type="submit" className="my-4">
								Submit
							</Button>
						</form>
					</Form>

					{/* <form onSubmit={handleSubmit} className="space-y-6">
						<div className="space-y-2">
							<Label htmlFor="quest-name">Exercise Name</Label>
							<Input
								id="exercise-name"
								value={exerciseName}
								onChange={(e) => setExerciseName(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="quest-description">Exercise Description</Label>
							<Textarea
								id="exercise-description"
								value={exerciseDescription}
								onChange={(e) => setExerciseDescription(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="quest-image">Exercise Image URL</Label>
							<Input
								id="exercise-image"
								type="url"
								value={imageUrl}
								onChange={(e) => setImageUrl(e.target.value)}
								placeholder="https://example.com/image.jpg"
							/>
						</div>

						<div className="space-y-2">
							<Label htmlFor="quest-image">Exercise Video URL</Label>
							<Input
								id="video-url"
								type="url"
								value={videoUrl}
								onChange={(e) => setVideoUrl(e.target.value)}
								placeholder="https://example.com/image.jpg"
							/>
						</div>

						<Button type="submit" className="w-full" disabled={!isFormValid}>
							Create Quest
						</Button>
					</form> */}
				</div>

				{/* Right Section - Preview */}
				<div className="w-full lg:w-1/2">
					<Card className="w-full h-full">
						<CardHeader>
							<CardTitle className="text-2xl font-bold">
								{watchedValues.name || "Your Exercise Name"}
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							{watchedValues.imageUrl?.length ? (
								<div className="w-full h-48 rounded-lg overflow-hidden">
									<img
										src={URL.createObjectURL(watchedValues.imageUrl[0])}
										alt="Exercise  Preview"
										className="my-4 max-h-40"
									/>
								</div>
							) : (
								<div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
									<span className="text-muted-foreground">Image Preview</span>
								</div>
							)}
							{watchedValues.videoUrl?.length ? (
								<div className="w-full h-48 rounded-lg overflow-hidden">
									<video controls className="my-4 max-h-40">
										<source
											src={URL.createObjectURL(watchedValues.videoUrl[0])}
										/>
										<track kind="captions" />
									</video>
								</div>
							) : (
								<div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
									<span className="text-muted-foreground">Video Preview</span>
								</div>
							)}

							<p className="text-muted-foreground">
								{watchedValues.description || "No description entered"}
							</p>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
