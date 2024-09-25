import Meteors from "@/components/magicui/meteors";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
	return (
		<div>
			<header className="bg-background mx-4 mt-4">
				<nav className="container mx-auto px-6 flex justify-between items-center">
					<div className="flex items-center">
						<span className="text-orange-400 mr-2">●</span>
						<span className="font-bold">Fitnex</span>
					</div>
					<div className="flex space-x-4">
						<a href="#" className="hover:text-gray-300">
							Home
						</a>
						<a href="#" className="hover:text-gray-300">
							About
						</a>
						<a href="#" className="hover:text-gray-300">
							Support
						</a>
						<a href="#" className="hover:text-gray-300">
							Download
						</a>
					</div>
					<Button variant="outline">Login</Button>
				</nav>
			</header>

			<div className="relative flex  w-full flex-col items-center justify-center overflow-hidden  bg-background md:shadow-xl mt-10">
				<Meteors number={60} />
				{/* <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
					Meteors

				</span> */}
				<div className="container mx-auto px-6 py-12 flex flex-col items-center text-center">
					<h2 className="text-sm font-semibold mb-4 tracking-wide">
						UNLOCK FITNESS POTENTIAL
					</h2>
					<h1 className="text-6xl font-bold mb-4 max-w-3xl">
						Empower Your Fitness Journey with Next-Gen Workout Dashboard
					</h1>
					<p className="text-lg mb-8 max-w-xl">
						Unlock seamless fitness tracking and streamline your workout
						experience with our innovative dashboard solution
					</p>
					<Button asChild>
						<Link href="/dashboard">Get Started</Link>
					</Button>
				</div>
			</div>

			{/* Placeholder for dashboard preview */}
			{/* Add more dashboard elements here */}
			{/* <div className="mt-12 bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full">
					<div className="h-80 bg-gradient-to-r from-gray-100 to-gray-200 p-6">
						<div className="bg-white rounded-lg p-4 shadow mb-4">
							<h3 className="font-bold">Workout Progress</h3>
						</div>
					</div>
				</div> */}

			{/* <div className="mt-12 flex justify-center space-x-8">
					<img src="/api/placeholder/100/40" alt="Amazon" className="h-8" />
					<img src="/api/placeholder/100/40" alt="Atlassian" className="h-8" />
					<img src="/api/placeholder/100/40" alt="GitHub" className="h-8" />
					<img
						src="/api/placeholder/100/40"
						alt="LaunchDarkly"
						className="h-8"
					/>
					<img src="/api/placeholder/100/40" alt="Netflix" className="h-8" />
					<img src="/api/placeholder/100/40" alt="Medium" className="h-8" />
				</div> */}
		</div>
	);
};

export default LandingPage;
