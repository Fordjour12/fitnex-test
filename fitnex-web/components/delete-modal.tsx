// "use client";

// import { Button } from "@/components/ui/button";
// import {
// 	Dialog,
// 	DialogContent,
// 	DialogDescription,
// 	DialogFooter,
// 	DialogHeader,
// 	DialogTitle,
// 	DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { AlertTriangle } from "lucide-react";
// import { useEffect, useState } from "react";

// interface DeleteModalProps {
// 	questName: string;
// 	onDelete: () => void;
// }

// export function DeleteModalComponent({
// 	questName,
// 	onDelete,
// }: DeleteModalProps) {
// 	const [isOpen, setIsOpen] = useState(false);
// 	const [confirmWord, setConfirmWord] = useState("");
// 	const [isValid, setIsValid] = useState(false);

// 	const requiredWord = "DELETE";

// 	useEffect(() => {
// 		setIsValid(confirmWord.toUpperCase() === requiredWord);
// 	}, [confirmWord]);

// 	const handleDelete = () => {
// 		if (isValid) {
// 			onDelete();
// 			setIsOpen(false);
// 			setConfirmWord("");
// 		}
// 	};

// 	return (
// 		<Dialog open={isOpen} onOpenChange={setIsOpen}>
// 			<DialogTrigger asChild>
// 				<Button variant="destructive">Delete Side Quest</Button>
// 			</DialogTrigger>
// 			<DialogContent className="sm:max-w-[425px]">
// 				<DialogHeader>
// 					<DialogTitle className="flex items-center gap-2 text-destructive">
// 						<AlertTriangle className="h-5 w-5" />
// 						Delete Side Quest
// 					</DialogTitle>
// 					<DialogDescription className="text-base font-semibold">
// 						Are you sure you want to delete &quot;{questName}&quot;?
// 					</DialogDescription>
// 				</DialogHeader>
// 				<div className="py-4 space-y-4">
// 					<p className="text-sm text-muted-foreground">
// 						This action will permanently delete this side quest and all
// 						associated workouts. This action cannot be undone.
// 					</p>
// 					<div className="space-y-2">
// 						<p className="text-sm font-medium">
// 							To confirm, type DELETE in the box below:
// 						</p>
// 						<Input
// 							type="text"
// 							value={confirmWord}
// 							onChange={(e) => setConfirmWord(e.target.value)}
// 							placeholder="Type DELETE to confirm"
// 							className="w-full"
// 						/>
// 					</div>
// 				</div>
// 				<DialogFooter className="sm:justify-start">
// 					<Button
// 						type="button"
// 						variant="destructive"
// 						onClick={handleDelete}
// 						disabled={!isValid}
// 						className="w-full sm:w-auto"
// 					>
// 						Delete
// 					</Button>
// 					<Button
// 						type="button"
// 						variant="outline"
// 						onClick={() => {
// 							setIsOpen(false);
// 							setConfirmWord("");
// 						}}
// 						className="w-full sm:w-auto"
// 					>
// 						Cancel
// 					</Button>
// 				</DialogFooter>
// 			</DialogContent>
// 		</Dialog>
// 	);
// }

"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

interface DeleteModalProps {
	itemName: string;
	onDelete: () => void;
	buttonName?: string;
}

export function DeleteModalComponent({
	itemName,
	onDelete,
	buttonName,
}: DeleteModalProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [confirmWord, setConfirmWord] = useState("");
	const [isValid, setIsValid] = useState(false);

	const requiredWord = "DELETE";

	useEffect(() => {
		setIsValid(confirmWord.toUpperCase() === requiredWord);
	}, [confirmWord]);

	const handleDelete = () => {
		if (isValid) {
			onDelete();
			setIsOpen(false);
			setConfirmWord("");
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="destructive">Delete {itemName}</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2 text-destructive">
						<AlertTriangle className="h-5 w-5" />
						Delete {itemName}
					</DialogTitle>
					<DialogDescription className="text-base font-semibold">
						Are you sure you want to delete &quot;{itemName}&quot;?
					</DialogDescription>
				</DialogHeader>
				<div className="py-4 space-y-4">
					<p className="text-sm text-muted-foreground">
						This action will permanently delete this {itemName.toLowerCase()}.
						This action cannot be undone.
					</p>
					<div className="space-y-2">
						<p className="text-sm font-medium">
							To confirm, type DELETE in the box below:
						</p>
						<Input
							type="text"
							value={confirmWord}
							onChange={(e) => setConfirmWord(e.target.value)}
							placeholder="Type DELETE to confirm"
							className="w-full"
						/>
					</div>
				</div>
				<DialogFooter className="sm:justify-start">
					<Button
						type="button"
						variant="destructive"
						onClick={handleDelete}
						disabled={!isValid}
						className="w-full sm:w-auto"
					>
						{buttonName ? buttonName : "Delete"}
					</Button>
					<Button
						type="button"
						variant="outline"
						onClick={() => {
							setIsOpen(false);
							setConfirmWord("");
						}}
						className="w-full sm:w-auto"
					>
						Cancel
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
