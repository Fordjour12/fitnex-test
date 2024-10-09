type WorkoutFullType = {
	id: number;
	name: string;
	category: string;
	description: string;
	estimated_time: number;
	cover_image: string;
	difficulty_level: string;
	workout_exercises: {
		order_index: number;
		type: string;
		exercise_id?: number;
		execise_id?: number;
		reps?: number;
		duration?: number;
		set?: number;
	}[];
};

type WorkoutType = Omit<WorkoutFullType, "workout_exercises">;
