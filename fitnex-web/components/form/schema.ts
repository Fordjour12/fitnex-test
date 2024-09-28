// "use client";

// import { z } from "zod";

// export const ExerciseSchema = z.object({
// 	name: z.string().min(1),
// 	description: z.string().min(1),
// 	imageUrl: z
// 		.instanceof(FileList)
// 		.refine((fileList) => fileList.length === 1, "Please select an image"),
// 	videoUrl: z
// 		.instanceof(FileList)
// 		.refine((fileList) => fileList.length === 1, "Please select a video"),
// });

// export type ExerciseSchemaType = z.infer<typeof ExerciseSchema>;
