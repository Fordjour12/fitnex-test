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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { ExerciseSchema, type ExerciseSchemaType } from "./schema";

export default function CreateExerciseForm() {
	const form = useForm<ExerciseSchemaType>({
		resolver: zodResolver(ExerciseSchema),
	});

	const fileRef = form.register("imageUrl");

	const onSubmit = (data: ExerciseSchemaType) => {
		console.log(data);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-10">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => {
						return (
							<FormItem>
								<FormLabel>Exercise Name</FormLabel>
								<FormControl>
									<Input placeholder="Sit-ups" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => {
						return (
							<FormItem>
								<FormLabel htmlFor="quest-description">
									Exercise Description
								</FormLabel>
								<FormControl>
									<Textarea id="exercise-description" required {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				<FormField
					control={form.control}
					name="videoUrl"
					render={({ field }) => {
						return (
							<FormItem>
								<FormLabel>Exercise Video</FormLabel>
								<FormControl>
									<Input
										type="file"
										accept="video/*"
										placeholder="shadcn"
										{...fileRef}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>

				<FormField
					control={form.control}
					name="imageUrl"
					render={({ field }) => {
						return (
							<FormItem>
								<FormLabel>Image URL</FormLabel>
								<FormControl>
									<Input
										type="file"
										accept="image/*"
										placeholder="shadcn"
										{...fileRef}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						);
					}}
				/>
				<Button type="submit" className="my-4">
					Submit
				</Button>
			</form>
		</Form>
	);
}
