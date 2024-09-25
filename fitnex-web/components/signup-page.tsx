"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export function SignupPageComponent() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 2000));
		setIsLoading(false);
		// Handle signup logic here
		console.log("Signup attempted with:", name, email, password);
	};

	return (
		<div className="flex h-screen ">
			{/* Left side - Image */}
			<div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
				<img
					src="/placeholder.svg?height=1080&width=1080"
					alt="Signup visual"
					className="object-cover w-full h-full"
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-50" />
			</div>

			{/* Right side - Signup Form */}
			<div className="w-full lg:w-1/2 flex items-center justify-center p-8">
				<div className="w-full max-w-md space-y-8">
					<div className="text-center">
						<h2 className="mt-6 text-3xl font-bold">Create your account</h2>
						<p className="mt-2 text-sm">Join us and start your journey today</p>
					</div>
					<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
						<div className="space-y-4">
							<div>
								<Label htmlFor="name" className="block text-sm font-medium ">
									Full Name
								</Label>
								<Input
									id="name"
									name="name"
									type="text"
									autoComplete="name"
									required
									className="mt-1 border border-gray-600  "
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div>
								<Label htmlFor="email" className="block text-sm font-medium">
									Email address
								</Label>
								<Input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="mt-1 border border-gray-600"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div>
								<Label
									htmlFor="password"
									className="block text-sm font-medium "
								>
									Password
								</Label>
								<Input
									id="password"
									name="password"
									type="password"
									autoComplete="new-password"
									required
									className="mt-1 border border-gray-600 "
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
						</div>

						<div>
							<Button
								type="submit"
								className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
								disabled={isLoading}
							>
								{isLoading ? (
									<Loader2 className="h-5 w-5 animate-spin" />
								) : (
									"Sign up"
								)}
							</Button>
						</div>
					</form>
					<p className="mt-2 text-center text-sm text-gray-600">
						Already have an account?{" "}
						<a
							href="#"
							className="font-medium text-purple-600 hover:text-purple-500"
						>
							Sign in
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}
