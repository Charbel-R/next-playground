import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function TodoNotFound() {
  return (
    <div className="py-12 text-center">
      <div className="mb-6">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
          <span className="text-3xl">📝</span>
        </div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
          No tasks yet
        </h3>
        <p className="mx-auto max-w-sm text-gray-600 dark:text-gray-400">
          You haven't created any tasks yet. Start by adding your first task
          above to get organized!
        </p>
      </div>

      <div className="mx-auto max-w-md rounded-lg bg-gray-50 p-4 dark:bg-gray-800/50">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          💡 <strong>Pro tip:</strong> Use clear, actionable descriptions for
          your tasks to stay productive.
        </p>
      </div>
    </div>
  );
}
