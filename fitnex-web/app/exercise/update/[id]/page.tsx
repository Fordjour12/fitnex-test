"use client"
import type { SingleExerciseType } from "@/components/exercise/single-exercise-view";
import { UpdateExerciseComponent } from "@/components/exercise/update-exercise";
import { env } from "@/env/client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function page({ params }: { params: { id: string } }) {
  const exerciseId = params.id;

  const base = env.NEXT_PUBLIC_BASE_URL


  const { data } = useQuery({
    queryKey: ["exercise", { exerciseId }],
    queryFn: async () => {
      const response = await fetch(`${base}/exercise/${exerciseId}`);
      return (await response.json()) as SingleExerciseType;
    },
  });


  return (
    <UpdateExerciseComponent exercise={data} />
  );
}
