import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";

const isClient = typeof window !== "undefined";

const exerciseRestEnum = z.enum(["rest", "exercise"]);

export const WorkoutSchema = z.object({
	name: z.string().min(1, "Workout name is required"),
	description: z.string().min(1, "Workout description is required"),
	category: z.string().min(1, "Workout category is required"),
	estimated_time: z.number().min(1, "Workout estimated time is required"),
	cover_image: isClient
		? z
				.any()
				.refine(
					(fileList) => fileList instanceof FileList && fileList.length === 1,
					"Please select an image",
				)
		: z.any(), // Fallback for server-side rendering
	difficulty_level: z.string().min(1, "Workout difficulty level is required"),
	workout_exercises: z.array(
		z.object({
			order_index: z
				.number()
				.min(1, "Workout exercise order index is required"),
			type: z.enum(["rest", "exercise"]),
			// z.string().min(1, "Workout exercise type is required"),
			exercise_id: z.number().min(1, "Workout exercise id is required"),
			reps: z.number().min(1, "Workout exercise reps is required"),
			duration: z.number().min(1, "Workout exercise duration is required"),
			set: z.number().min(1, "Workout exercise set is required"),
		}),
	),
});

export type WorkoutSchemaType = z.infer<typeof WorkoutSchema>;

export default function CreateWorkoutForm() {
	const form = useForm<WorkoutSchemaType>({
		resolver: zodResolver(WorkoutSchema),
	});

	const fileRef = form.register("cover_image");

	const watchedValues = form.watch();

	const onSubmit = async (data: WorkoutSchemaType) => {
		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("description", data.description);

		if (data.cover_image && data.cover_image.length > 0) {
			const videoFile = data.cover_image.item(0);
			if (videoFile) {
				formData.append("video", videoFile);
			}
		}

		mutation.mutate(formData);
	};

	const mutation = useMutation({
		mutationFn: async (formData: FormData) => {
			const response = await fetch(
				"http://localhost:8085/api/v1/create-workout",
				{
					method: "POST",
					body: formData,
				},
			);

			if (!response.ok) {
				throw new Error("Failed to submit workout");
			}

			return response.json();
		},
		onSuccess: (data) => {
			console.log("Workout created successfully", data);
			form.reset();
		},
		onError: (error) => {
			console.error("Error creating workout", error);
		},
	});

	return (
		<div className="container mx-auto px-4 py-8">
			<FormField
				control={form.control}
				name="cover_image"
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
		</div>
	);
}
