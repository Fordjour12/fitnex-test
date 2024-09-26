"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function CreateExerciseComponent() {
  const [exerciseName, setExerciseName] = useState("");
  const [questDescription, setQuestDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({ exerciseName, questDescription, imageUrl });
  };

  const isFormValid =
    exerciseName.trim() !== "" &&
    questDescription.trim() !== ""

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Create Exercise</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section - Form */}
        <div className="w-full lg:w-1/2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="quest-name">Exercise Name</Label>
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
              <Label htmlFor="quest-image">Quest Image URL</Label>
              <Input
                id="quest-image"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
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

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
