"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export function CreateExerciseComponent() {
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseDescription, setExerciseDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({ exerciseName, exerciseDescription, videoUrl, imageUrl });
  };

  const isFormValid =
    exerciseName.trim() !== "" &&
    exerciseDescription.trim() !== "" &&
    videoUrl.trim() !== "" &&
    imageUrl.trim() !== "";

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Create Exercise</h1>
      <Link
        href="/exercise"
        className="inline-flex items-center text-primary hover:underline mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to All Exercises
      </Link>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section - Form */}


        <div className="w-full lg:w-1/2">







          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="quest-name">Exercise Name</Label>
              <Input
                id="exercise-name"
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quest-description">Exercise Description</Label>
              <Textarea
                id="exercise-description"
                value={exerciseDescription}
                onChange={(e) => setExerciseDescription(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quest-image">Exercise Image URL</Label>
              <Input
                id="exercise-image"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="quest-image">Exercise Video URL</Label>
              <Input
                id="video-url"
                type="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
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
                {exerciseName || "Your Exercise Name"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {imageUrl && (
                <div className="w-full h-48 rounded-lg overflow-hidden">
                  <img
                    src={imageUrl}
                    alt={exerciseName}
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
                {exerciseDescription ||
                  "Your exercise description will appear here."}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
