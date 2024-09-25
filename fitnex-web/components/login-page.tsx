"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export function LoginPageComponent() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		// Simulate API call
		await new Promise((resolve) => setTimeout(resolve, 2000));
		setIsLoading(false);
		// Handle login logic here
		console.log("Login attempted with:", email, password);
	};

	return (
		<div className="flex h-screen ">
			{/* Left side - Image */}
			<div className="hidden lg:block lg:w-1/2">
				<img
					src="/placeholder.svg?height=1080&width=1080"
					alt="Login visual"
					className="object-cover w-full h-full"
				/>
			</div>

			{/* Right side - Login Form */}
			<div className="w-full lg:w-1/2 flex items-center justify-center p-8">
				<div className="w-full max-w-md space-y-8">
					<div className="text-center">
						<h2 className="mt-6 text-3xl font-bold">Welcome back</h2>
						<p className="mt-2 text-sm">Please sign in to your account</p>
					</div>
					<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
						<div className="space-y-4">
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
								<Label htmlFor="password" className="block text-sm font-medium">
									Password
								</Label>
								<Input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="mt-1 border border-gray-600"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
						</div>

						<div>
							<Button type="submit" className="w-full" disabled={isLoading}>
								{isLoading ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										Please wait
									</>
								) : (
									"Sign in"
								)}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
