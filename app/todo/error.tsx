"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const isFetchError = error.message.includes("Failed to fetch todos");

  if (isFetchError) {
    return (
      <section className="py-24">
        <div className="container max-w-2xl">
          <h1 className="font-serif text-3xl font-medium">
            Keep track of your tasks
          </h1>

          <Card className="mt-12 border-destructive">
            <CardHeader className="text-center">
              <CardTitle className="text-lg text-destructive">
                Failed to Load Todos
              </CardTitle>
              <CardDescription>
                There was an error loading your todos. Please try again.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="mb-4 text-4xl">⚠️</div>
              <Button onClick={reset} variant="destructive">
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24">
      <div className="container max-w-2xl">
        <h1 className="font-serif text-3xl font-medium">
          Keep track of your tasks
        </h1>
        <Card className="mt-12 border-destructive">
          <CardHeader className="text-center">
            <CardTitle className="text-lg text-destructive">
              Something went wrong!
            </CardTitle>
            <CardDescription>
              An unexpected error occurred while loading your todos.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <div className="mb-4 text-4xl">💥</div>
            <Button onClick={reset} variant="destructive">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
