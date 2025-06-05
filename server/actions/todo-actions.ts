"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@clerk/nextjs/server";

import { createTodo, updateTodo } from "@/server/mutations/todo";

import prisma from "@/lib/prisma";
import {
  NewTodo,
  TodoActionState,
  todoActionInitialState,
} from "@/lib/types/todo";
import { convertFormDataToObj, validateFormData } from "@/lib/utils/form-utils";
import { newTodoSchema } from "@/lib/validations/schema";

export async function createTodoAction(
  state: TodoActionState,
  formData: FormData,
): Promise<TodoActionState> {
  // Step 1 - Check if the user is authenticated
  const { userId } = await auth();
  if (!userId) return { success: false, message: "Unauthorized" };

  // Step 2 - Check if the user exists in the database
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) return { success: false, message: "user not found" };

  try {
    // Step 3 - Validate the form data
    const newTodoObj = convertFormDataToObj(formData);

    const validationResult = validateFormData(newTodoObj, newTodoSchema);
    if (!validationResult.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validationResult.errors as Record<keyof NewTodo, string[]>,
      };
    }

    // Extract validated data
    const { title } = validationResult.data as { title: string };
    console.log("Creating todo for user with title:", title, userId);
    await createTodo(title, userId);
    return {
      success: true,
      message: "Todo added successfully.",
    };
  } catch (error: unknown) {
    console.log("Error creating todo:", error);
    return {
      success: false,
      message: "Failed to create todo.",
    };
  } finally {
    revalidatePath("/todo");
  }
}

interface ToggleTodoPayload {
  id: string;
  completed: boolean;
}

export async function toggleTodoAction({
  id,
  completed,
}: ToggleTodoPayload): Promise<{ success: boolean; message: string }> {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false, message: "Unauthorized" };

    if (!id) return { success: false, message: "Todo ID is required" };

    await updateTodo(id, completed);
    return { success: true, message: "Todo updated successfully" };
  } catch (error: unknown) {
    console.error("Error updating todo (direct):", error);
    return {
      success: false,
      message: (error as Error)?.message || "Failed to update todo",
    };
  } finally {
    revalidatePath("/todo");
  }
}
