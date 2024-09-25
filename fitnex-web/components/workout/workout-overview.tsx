"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Dumbbell } from "lucide-react";
import Link from "next/link";

// Mock data for the side quest
const sideQuest = {
  id: 1,
  name: "30-Day Ab Challenge",
  description:
    "Transform your core in just 30 days with this intensive ab workout program. Perfect for beginners and advanced fitness enthusiasts alike.",
  image: "/placeholder.svg?height=200&width=200",
  workouts: [
    { id: 1, name: "Crunches", reps: 20 },
    { id: 2, name: "Plank", duration: "30 seconds" },
    { id: 3, name: "Russian Twists", reps: 30 },
    { id: 4, name: "Leg Raises", reps: 15 },
    { id: 5, name: "Mountain Climbers", duration: "45 seconds" },
  ],
};

export function WorkoutOverviewComponent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/sidequest"
        className="inline-flex items-center text-primary hover:underline mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Side Quests
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{sideQuest.name}</h1>
          <p className="text-muted-foreground mb-6">{sideQuest.description}</p>

          <h2 className="text-2xl font-semibold mb-4">Workouts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sideQuest.workouts.map((workout) => (
              <Card key={workout.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {workout.name}
                  </CardTitle>
                  <Dumbbell className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {workout.reps ? `${workout.reps} reps` : workout.duration}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <Card>
            <CardContent className="flex flex-col items-center pt-6">
              <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
                <img
                  src={sideQuest.image}
                  alt={sideQuest.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{sideQuest.name}</h3>
              <p className="text-center text-muted-foreground mb-4">
                {sideQuest.workouts.length} workouts
              </p>
              <Button className="w-full">Start Quest</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
