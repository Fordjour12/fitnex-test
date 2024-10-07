"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";

const isClient = typeof window !== "undefined";

const WorkoutSchema = z.object({
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
    : z.any(),
  difficulty_level: z.string().min(1, "Workout difficulty level is required"),
  workout_exercises: z.array(
    z.object({
      order_index: z
        .number()
        .min(1, "Workout exercise order index is required"),
      type: z.enum(["rest", "exercise"]),
      exercise_id: z.number().optional(),
      reps: z.number().optional(),
      duration: z.number().optional(),
      set: z.number().optional(),
    }),
  ),
});

type WorkoutSchemaType = z.infer<typeof WorkoutSchema>;

export default function CreateWorkoutComponent() {
  const [preview, setPreview] = useState<WorkoutSchemaType>();

  const form = useForm<WorkoutSchemaType>({
    resolver: zodResolver(WorkoutSchema),
  });

  const fileRef = form.register("cover_image");

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "workout_exercises",
  });

 

  const onSubmit = async (values: WorkoutSchemaType) => {
    setPreview(values);

    console.log(values);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("estimated_time", String(values.estimated_time));

    // Correctly handle file input
    if (
    	values.cover_image &&
    	values.cover_image instanceof FileList &&
    	values.cover_image.length > 0
    ) {
    	const coverFile = values.cover_image.item(0);
    	if (coverFile) {
    		formData.append("cover_image", coverFile);
    	}
    }

    formData.append("difficulty_level", values.difficulty_level);

    // Ensure all other fields are appended correctly
    values.workout_exercises.forEach((exercise, index) => {
      formData.append(
        `workout_exercises[${index}][order_index]`,
        String(exercise.order_index),
      );
      formData.append(`workout_exercises[${index}][type]`, exercise.type);
      if (exercise.type === "exercise") {
        formData.append(
          `workout_exercises[${index}][exercise_id]`,
          String(exercise.exercise_id),
        );
        formData.append(
          `workout_exercises[${index}][reps]`,
          String(exercise.reps),
        );
        formData.append(
          `workout_exercises[${index}][duration]`,
          String(exercise.duration),
        );
        formData.append(
          `workout_exercises[${index}][set]`,
          String(exercise.set),
        );
      }
    });

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
    <div className="container mx-auto p-4">
      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Create Workout</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Workout Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter workout name" {...field} />
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
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter workout description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="strength">Strength</SelectItem>
                          <SelectItem value="cardio">Cardio</SelectItem>
                          <SelectItem value="flexibility">
                            Flexibility
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="estimated_time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated Time (minutes)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number.parseInt(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cover_image"
                  render={() => (
                    <FormItem>
                      <FormLabel>Cover Image</FormLabel>
                      <FormControl>
                        <Input type="file" accept="image/*" {...fileRef} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="difficulty_level"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty Level</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">
                            Intermediate
                          </SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <h3 className="text-lg font-semibold mb-2">
                    Workout Exercises
                  </h3>
                  <ScrollArea className="h-[300px] w-full border rounded">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Type</TableHead>
                          <TableHead>Exercise ID</TableHead>
                          <TableHead>Reps</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Set</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {fields.map((field, index) => (
                          <TableRow key={field.id}>
                            <TableCell>
                              <FormField
                                control={form.control}
                                name={`workout_exercises.${index}.type`}
                                render={({ field }) => (
                                  <FormItem>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        <SelectItem value="exercise">
                                          Exercise
                                        </SelectItem>
                                        <SelectItem value="rest">
                                          Rest
                                        </SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </FormItem>
                                )}
                              />
                            </TableCell>
                            <TableCell>
                              {form.watch(`workout_exercises.${index}.type`) ===
                                "exercise" && (
                                  <FormField
                                    control={form.control}
                                    name={`workout_exercises.${index}.exercise_id`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input
                                            type="number"
                                            {...field}
                                            onChange={(e) =>
                                              field.onChange(
                                                Number.parseInt(e.target.value),
                                              )
                                            }
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                )}
                            </TableCell>
                            <TableCell>
                              {form.watch(`workout_exercises.${index}.type`) ===
                                "exercise" && (
                                  <FormField
                                    control={form.control}
                                    name={`workout_exercises.${index}.reps`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input
                                            type="number"
                                            {...field}
                                            onChange={(e) =>
                                              field.onChange(
                                                Number.parseInt(e.target.value),
                                              )
                                            }
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                )}
                            </TableCell>
                            <TableCell>
                              <FormField
                                control={form.control}
                                name={`workout_exercises.${index}.duration`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input
                                        type="number"
                                        {...field}
                                        onChange={(e) =>
                                          field.onChange(
                                            Number.parseInt(e.target.value),
                                          )
                                        }
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </TableCell>
                            <TableCell>
                              {form.watch(`workout_exercises.${index}.type`) ===
                                "exercise" && (
                                  <FormField
                                    control={form.control}
                                    name={`workout_exercises.${index}.set`}
                                    render={({ field }) => (
                                      <FormItem>
                                        <FormControl>
                                          <Input
                                            type="number"
                                            {...field}
                                            onChange={(e) =>
                                              field.onChange(
                                                Number.parseInt(e.target.value),
                                              )
                                            }
                                          />
                                        </FormControl>
                                      </FormItem>
                                    )}
                                  />
                                )}
                            </TableCell>
                            <TableCell>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => remove(index)}
                              >
                                <TrashIcon className="h-4 w-4" />
                                <span className="sr-only">Remove exercise</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      append({
                        order_index: fields.length + 1,
                        type: "exercise",
                        exercise_id: 0,
                        reps: 0,
                        duration: 0,
                        set: 1,
                      })
                    }
                    className="mt-2"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Exercise
                  </Button>
                </div>
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              {preview ? (
                <pre className="whitespace-pre-wrap">
                  {JSON.stringify(preview, null, 2)}
                </pre>
              ) : (
                <p>Submit the form to see the preview</p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
