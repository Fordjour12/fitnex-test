"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

const isClient = typeof window !== "undefined";

export const ExerciseSchema = z.object({
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

export type ExerciseSchemaType = z.infer<typeof ExerciseSchema>;

export default function CreateExerciseForm() {
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
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-10">
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

			{/* Real-time Preview Section */}
			<div className="w-full p-10 border rounded-lg">
				<h2 className="text-2xl font-bold mb-4">Exercise Preview</h2>
				{/* Display the form values in real-time */}
				<p>
					<strong>Name:</strong> {watchedValues.name || "No name entered"}
				</p>
				<p>
					<strong>Description:</strong>{" "}
					{watchedValues.description || "No description entered"}
				</p>
				{/* Display the image preview */}
				{watchedValues.imageUrl?.length ? (
					<img
						src={URL.createObjectURL(watchedValues.imageUrl[0])}
						alt="Exercise  Preview"
						className="my-4 max-h-40"
					/>
				) : (
					<p>No image uploaded</p>
				)}
				{/* Display the video preview */}
				{watchedValues.videoUrl?.length ? (
					<video controls className="my-4 max-h-40">
						<source src={URL.createObjectURL(watchedValues.videoUrl[0])} />
						<track kind="captions" />
					</video>
				) : (
					<p>No video uploaded</p>
				)}
			</div>
		</div>
	);
}
