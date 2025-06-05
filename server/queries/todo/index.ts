import prisma from "@/lib/prisma";
import { Todo } from "@/lib/types/todo";

export async function getTodos(userId: string): Promise<Todo[]> {
  try {
    // create a delay to simulate a slow database query

    const todos = await prisma.todo.findMany({
      where: { clerkUserId: userId },
      orderBy: { createdAt: "desc" },
    });
    return todos as Todo[];
  } catch (error) {
    throw new Error(`Failed to fetch todos: ${(error as Error).message}`);
  }
}

export async function getTodoById(id: string): Promise<Todo | null> {
  try {
    return await prisma.todo.findUnique({ where: { id } });
  } catch (error) {
    throw new Error(`Failed to fetch todo: ${(error as Error).message}`);
  }
}
