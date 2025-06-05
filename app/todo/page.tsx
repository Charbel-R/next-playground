import { Suspense } from "react";

import { auth } from "@clerk/nextjs/server";

import NewTodoForm from "./_components/new-todo-form";
import TodoList from "./_components/todo-list";

export default async function Home() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) {
    return redirectToSignIn();
  }

  return (
    <>
      {/* Fixed background - completely separate from scrolling content */}
      <div className="fixed inset-0 -z-20">
        <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2739&q=80')] bg-cover bg-center bg-no-repeat"></div>
      </div>

      {/* Fixed overlay for better text readability */}
      <div className="fixed inset-0 -z-10 bg-white/40 dark:bg-gray-900/50"></div>

      {/* Scrollable content */}
      <div className="relative min-h-screen">
        <section className="relative pb-12 pt-8 sm:pb-16 sm:pt-12 lg:pb-24 lg:pt-16">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Main content with 2/3 and 1/3 layout */}
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
              {/* Left column - Header and Add New Task Form (2/3 width) */}
              <div className="lg:col-span-2">
                {/* Header */}
                <div className="mb-8 text-center lg:mb-12">
                  <h1 className="mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text font-serif text-4xl font-bold text-transparent dark:from-white dark:to-gray-300 sm:text-5xl lg:text-6xl">
                    Task Manager
                  </h1>
                  <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
                    Stay organized and productive with your personal task
                    management system
                  </p>
                </div>

                {/* Add new todo form */}
                <div className="max-h-fit rounded-2xl border border-white/30 bg-white/80 p-6 shadow-xl backdrop-blur-md dark:border-gray-600/40 dark:bg-gray-800/90 lg:p-8">
                  <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
                    Add New Task
                  </h2>
                  <NewTodoForm />
                </div>
              </div>

              {/* Right column - Todo List (1/3 width) */}
              <div className="lg:col-span-1">
                <div className="rounded-2xl border border-white/30 bg-white/80 p-6 shadow-xl backdrop-blur-md dark:border-gray-600/40 dark:bg-gray-800/90 lg:p-8">
                  <h2 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
                    Your Tasks
                  </h2>
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center py-12">
                        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
                        <span className="ml-3 text-gray-600 dark:text-gray-400">
                          Loading tasks...
                        </span>
                      </div>
                    }
                  >
                    <TodoList clerkId={userId} />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
