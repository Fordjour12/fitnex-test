"use client";
import {
  type SingleExerciseType,
  SingleExerciseViewComponent,
} from "@/components/exercise/single-exercise-view";
import { env } from "@/env/client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function page({ params }: { params: { id: string } }) {
  const exerciseId = params.id;
  const base = env.NEXT_PUBLIC_BASE_URL;
  const [singleExercise, setSingleExercise] =
    useState<SingleExerciseType | null>();

  const { data } = useQuery({
    queryKey: ["exercise", { exerciseId }],
    queryFn: async () => {
      const response = await fetch(`${base}/exercise/${exerciseId}`);
      return (await response.json()) as SingleExerciseType;
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <SingleExerciseViewComponent exercise={data} />
    </div>
  );
}
