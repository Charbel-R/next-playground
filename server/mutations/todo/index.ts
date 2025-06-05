import prisma from "@/lib/prisma";
import { Todo } from "@/lib/types/todo";

export async function createTodo(
  title: string,
  clerkId: string,
): Promise<Todo> {
  try {
    const todo = await prisma.todo.create({
      data: {
        title,
        clerkUserId: clerkId,
      },
    });
    return todo;
  } catch (error) {
    throw new Error(`Failed to create todo: ${(error as Error).message}`);
  }
}

export async function updateTodo(
  id: string,
  completed: boolean,
): Promise<Todo> {
  try {
    const todo = await prisma.todo.update({
      where: { id },
      data: { completed },
    });
    return todo;
  } catch (error) {
    throw new Error(`Failed to update todo: ${(error as Error).message}`);
  }
}
