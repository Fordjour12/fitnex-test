"use client";
import {
  SingleExerciseViewComponent,
  SingleExerciseViewProps
} from "@/components/exercise/single-exercise-view";
import { env } from "@/env/client";
import { useQuery } from "@tanstack/react-query";

export default function page({ params }: { params: { id: string } }) {
  const exerciseId = params.id;
  const base = env.NEXT_PUBLIC_BASE_URL;
  

  const { data } = useQuery({
    queryKey: ["exercise", { exerciseId }],
    queryFn: async () => {
      const response = await fetch(`${base}/exercise/${exerciseId}`);
      return (await response.json()) as SingleExerciseViewProps["exercise"];
    },
  });


  return (
    <div className="container mx-auto px-4 py-8">
      <SingleExerciseViewComponent exercise={data} />
    </div>
  );
}
