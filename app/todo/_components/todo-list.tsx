import { getTodos } from "@/server/queries/todo";

import { Todo } from "@/lib/types/todo";
import { tryCatch } from "@/lib/utils/try-catch";

import TodoItem from "./todo-item";
import TodoNotFound from "./todo-notFound";

interface TodoListProps {
  clerkId: string;
}

export default async function TodoList({ clerkId }: TodoListProps) {
  const { data: todos, error } = await tryCatch<Todo[]>(getTodos(clerkId));
  if (error) throw new Error(`Failed to fetch todos: ${error.message}`);

  if (todos.length === 0) return <TodoNotFound />;

  // Separate completed and pending todos
  const pendingTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="space-y-6">
      {/* Pending todos */}
      {pendingTodos.length > 0 && (
        <div>
          <div className="mb-4 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <h3 className="font-medium text-gray-900 dark:text-white">
              Pending ({pendingTodos.length})
            </h3>
          </div>
          <ul className="space-y-3">
            {pendingTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        </div>
      )}

      {/* Completed todos */}
      {completedTodos.length > 0 && (
        <div>
          <div className="mb-4 flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <h3 className="font-medium text-gray-600 dark:text-gray-400">
              Completed ({completedTodos.length})
            </h3>
          </div>
          <ul className="space-y-3">
            {completedTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        </div>
      )}

      {/* Summary */}
      <div className="border-t border-gray-200 pt-4 dark:border-gray-700">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Total tasks: {todos.length}</span>
          <span>
            {completedTodos.length}/{todos.length} completed
          </span>
        </div>
        {todos.length > 0 && (
          <div className="mt-2 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-300"
              style={{
                width: `${(completedTodos.length / todos.length) * 100}%`,
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}
