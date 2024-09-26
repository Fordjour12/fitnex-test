import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

type CreateType = {
  createType: "workout" | "exercise" | "sidequest";
  data: WorkoutType | ExerciseType | SideQuestType;
};

type WorkoutType = {
  id: number;
  name: string;
  description: string;
  image: string;
  workouts: number;
  type: string;
  ctype: "workout";
};

type ExerciseType = {
  id: number;
  name: string;
  description: string;
  image: string;
  video_url: string;
  type: string;
  created_at: string;
  updated_at: string;
  ctype: "exercise";
};

type SideQuestType = {
  id: number;
  name: string;
  description: string;
  image: string;
  workouts: WorkoutType[];
  ctype: "sidequest";
};

export default function CreateComponent({ createType, data }: CreateType) {
  const renderComponent = () => {
    switch (createType) {
      case "workout":
        return <CreateWorkoutComponent workout={data as WorkoutType} />;
      case "exercise":
        return <CreateExerciseComponent exercise={data as ExerciseType} />;
      case "sidequest":
        return <CreateSideQuestComponent sidequest={data as SideQuestType} />;
      default:
        return <div>Error: Invalid createType</div>;
    }
  };

  return (
    <div>
      <h1>Create Component</h1>
      {renderComponent()}
    </div>
  );
}

type WorkoutComponentProps = {
  workout: WorkoutType;
};

export function CreateWorkoutComponent({ workout }: WorkoutComponentProps) {
  return (
    <div>
      <h1>Workout Component</h1>
      <p>Workout Name: {workout.name}</p>
      <p>Workout Description: {workout.description}</p>
      <p>Workout Image: {workout.image}</p>
      <p>Workout Workouts: {workout.workouts}</p>
      <p>Workout Type: {workout.type}</p>
    </div>
  );
}

type ExerciseComponentProps = {
  exercise: ExerciseType;
};

export function CreateExerciseComponent({ exercise }: ExerciseComponentProps) {
  return (
    <div>
      <h1>Exercise Component</h1>
      <p>Exercise Name: {exercise.name}</p>
      <p>Exercise Description: {exercise.description}</p>
      <p>Exercise Image: {exercise.image}</p>
      <p>Exercise Video URL: {exercise.video_url}</p>
      <p>Exercise Type: {exercise.type}</p>
      <p>Exercise Created At: {exercise.created_at}</p>
      <p>Exercise Updated At: {exercise.updated_at}</p>
    </div>
  );
}

type SideQuestComponentProps = {
  sidequest: SideQuestType;
};

export function CreateSideQuestComponent({
  sidequest,
}: SideQuestComponentProps) {
  const [questName, setQuestName] = useState("");
  const [questDescription, setQuestDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [workouts, setWorkouts] = useState<string[]>([]);

  const handleAddWorkout = (workout: string) => {
    if (workouts.length < 5 && !workouts.includes(workout)) {
      setWorkouts([...workouts, workout]);
    }
  };

  const handleRemoveWorkout = (workout: string) => {
    setWorkouts(workouts.filter((w) => w !== workout));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({ questName, questDescription, imageUrl, workouts });
  };

  const isFormValid =
    questName.trim() !== "" &&
    questDescription.trim() !== "" &&
    workouts.length > 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Create Side Quest</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section - Form */}
        <div className="w-full lg:w-1/2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="quest-name">Quest Name</Label>
              <Input
                id="quest-name"
                value={questName}
                onChange={(e) => setQuestName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quest-description">Quest Description</Label>
              <Textarea
                id="quest-description"
                value={questDescription}
                onChange={(e) => setQuestDescription(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quest-image">Quest Image URL</Label>
              <Input
                id="quest-image"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="space-y-2">
              <Label>Workouts (up to 5)</Label>
              <Select onValueChange={handleAddWorkout}>
                <SelectTrigger>
                  <SelectValue placeholder="Add a workout" />
                </SelectTrigger>
                <SelectContent>
                  {exercises.map((exercise) => (
                    <SelectItem key={exercise} value={exercise}>
                      {exercise}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex flex-wrap gap-2 mt-2">
                {workouts.map((workout) => (
                  <div
                    key={workout}
                    className="flex items-center bg-secondary text-secondary-foreground rounded-full px-3 py-1"
                  >
                    {workout}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="ml-2 h-4 w-4 p-0"
                      onClick={() => handleRemoveWorkout(workout)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={!isFormValid}>
              Create Quest
            </Button>
          </form>
        </div>

        {/* Right Section - Preview */}
        <div className="w-full lg:w-1/2">
          <Card className="w-full h-full">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {questName || "Your Side Quest Name"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {imageUrl && (
                <div className="w-full h-48 rounded-lg overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={questName}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              {!imageUrl && (
                <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-muted-foreground">Image Preview</span>
                </div>
              )}
              <p className="text-muted-foreground">
                {questDescription ||
                  "Your side quest description will appear here."}
              </p>
              {workouts.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Workouts:</h3>
                  <ul className="list-disc list-inside">
                    {workouts.map((workout) => (
                      <li key={workout}>{workout}</li>
                    ))}
                  </ul>
                </div>
              )}
              {workouts.length === 0 && (
                <p className="text-muted-foreground">
                  Add workouts to see them listed here.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
