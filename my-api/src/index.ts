import { serve } from "bun";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { poweredBy } from "hono/powered-by";


import Workout from "./workout.json"

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

serve({
	fetch: app.fetch,
	port: 4000,
});
