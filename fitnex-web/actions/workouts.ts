"use server";

import { env } from "@/env/server";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type WorkoutType = {
  id: number;
  name: string;
  description: string;
  image: string;
  workouts: number;
  type: string;
};

export async function getAllWorkouts() {
  // const [workout, setWorkout] = useState<WorkoutType>();
  // const base = env.BASE_URL;
  // const {
  // 	data: WorkoutType,
  // 	isError,
  // 	isPending,
  // 	isLoading,
  // } = useQuery({
  // 	queryKey: ["workout", { workout }],
  // 	queryFn: async () => {
  // 		const response = await fetch(`${base}/workout`);
  // 		return (await response.json()) as WorkoutType;
  // 	},
  // });
}
