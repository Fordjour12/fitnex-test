import { serve } from "bun";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { poweredBy } from "hono/powered-by";


import Workout from "./workout.json"
import Exercise from "./exercise.json"

const app = new Hono();

app.use(poweredBy());
app.use(cors());
app.use(logger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/workout", (c) => {
  return c.json(Workout);
});

app.get("/exercise", (c) => {
  return c.json(Exercise);
});

app.get("/exercise/:id", (c) => {
  const exerciseId = c.req.param("id");
  const exercise = Exercise.find((exercise) => exercise.id === Number(exerciseId));
  return c.json(exercise);
});

app.get("/workout/:id", (c) => {
  const workoutId = c.req.param("id");
  const workout = Workout.find((workout) => workout.id === Number(workoutId));
  return c.json(workout);
});

app.get("/exercise/:id/workouts", (c) => {
  return c.json(Workout);
});

serve({
  fetch: app.fetch,
  port: 4000,
});
