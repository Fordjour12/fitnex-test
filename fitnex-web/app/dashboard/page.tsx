import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
	return (
		<div className="grid gap-4 place-content-center place-items-center min-h-screen">
			<Button asChild>
				<Link href="/sidequest"> Back to Side Quests </Link>
			</Button>
			<Button asChild>
				<Link href="/workout"> Back to Workout </Link>
			</Button>
			<Button asChild>
				<Link href="/exercise"> Back to Exercise </Link>
			</Button>
		</div>
	);
}
