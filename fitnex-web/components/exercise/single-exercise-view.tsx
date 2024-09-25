"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle,CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

export interface SingleExerciseType {
  id: number;
  name: string;
  description: string;
  video_url: string;
  image_url: string;
  created_at: string;
  updated_at: string;
}

interface SingleExerciseViewProps {
  exercise: SingleExerciseType;
}

export function SingleExerciseViewComponent({
  exercise,
}: SingleExerciseViewProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Here you would typically control the video playback
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/sidequest"
        className="inline-flex items-center text-primary hover:underline mb-6"
      >
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        Back to Side Quests
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Video Player */}
        <div className="lg:w-2/3">
          <Card className="w-full aspect-video bg-emerald-800 relative overflow-hidden">
            <video
              className="w-full h-full object-cover"
              poster={exercise?.image_url}
            >
              <source src={exercise?.video_url} type="video/mp4" />
              <track kind="captions" />
            </video>

            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <Button
                onClick={togglePlay}
                variant="secondary"
                size="lg"
                className="text-white bg-emerald-600 hover:bg-emerald-700"
              >
                {isPlaying ? "Pause" : "Play"}
              </Button>
            </div>
          </Card>
        </div>

        {/* Exercise Details */}
        <div className="lg:w-1/3">
          <Card>
            <CardHeader>
              <div className="w-full h-48 mb-4 overflow-hidden rounded-md">
                <img
                  src={exercise?.image_url}
                  alt={exercise?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardTitle className="text-2xl font-bold">
                {exercise?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                {exercise?.description}
              </p>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Added on:</span>{" "}
                  {new Date(exercise?.created_at).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Last updated:</span>{" "}
                  {new Date(exercise?.updated_at).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <h3>See Also</h3>

            {/*<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {exercise?.workouts?.map((workout) => (
              <Link href={`/workout/${workout.id}`} key={workout.id}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto mb-2">
                      <img
                        src={workout.image}
                        alt={workout.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <CardTitle className="text-center">{workout.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-muted-foreground">
                      {workout.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      {workout.workouts} workouts
                    </span>
                    <span className="text-sm font-medium capitalize">
                      {workout.type}
                    </span>
                  </CardFooter>
                </Card>
              </Link>
              ))}*/}
          </div
        </div>

      </div>
    </div>
  );
}
