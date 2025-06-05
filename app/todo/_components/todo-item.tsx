"use client";

import { useEffect, useState } from "react";

import { toast } from "sonner";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { toggleTodoAction } from "@/server/actions/todo-actions";

import { Todo } from "@/lib/types/todo";
import { formatDate } from "@/lib/utils";

export default function TodoItem({ todo }: { todo: Todo }) {
  const [optimisticCompleted, setOptimisticCompleted] = useState<boolean>(
    todo.completed,
  );
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setOptimisticCompleted(todo.completed);
  }, [todo.completed]);

  async function handleToggle() {
    setIsLoading(true);
    setOptimisticCompleted((prev) => !prev);

    try {
      const result = await toggleTodoAction({
        id: todo.id,
        completed: !optimisticCompleted,
      });

      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
        setOptimisticCompleted(optimisticCompleted); // Rollback optimistic UI on failure
      }
    } catch (error: unknown) {
      toast.error((error as Error)?.message);
      setOptimisticCompleted(optimisticCompleted); // Rollback optimistic UI on failure
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <li
      className={`group rounded-lg border transition-all duration-200 hover:shadow-md ${
        optimisticCompleted
          ? "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50"
          : "border-gray-200 bg-white hover:border-blue-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:border-blue-600"
      }`}
    >
      <div className="flex items-center gap-4 p-4">
        <Checkbox
          id={todo.id}
          className="peer"
          checked={optimisticCompleted}
          disabled={isLoading}
          onCheckedChange={handleToggle}
        />

        <div className="min-w-0 flex-1">
          <Label
            htmlFor={todo.id}
            className={`cursor-pointer font-medium transition-colors duration-200 ${
              optimisticCompleted
                ? "text-gray-500 line-through dark:text-gray-400"
                : "text-gray-900 group-hover:text-blue-700 dark:text-white dark:group-hover:text-blue-300"
            }`}
          >
            {todo.title}
          </Label>

          <div className="mt-1 flex items-center gap-2">
            <span
              className={`text-xs transition-colors duration-200 ${
                optimisticCompleted
                  ? "text-gray-400 dark:text-gray-500"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              {formatDate(todo.updatedAt)}
            </span>

            {optimisticCompleted && (
              <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/20 dark:text-green-400">
                ✓ Completed
              </span>
            )}
          </div>
        </div>

        {isLoading && (
          <div className="flex items-center">
            <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-blue-600"></div>
          </div>
        )}
      </div>
    </li>
  );
}
