import z from "zod";

import { todo } from "@/lib/generated/prisma";
import { newTodoSchema } from "@/lib/validations/schema";

import { FormActionState, FormErrorState } from "../form-state";

export type Todo = todo;

export type NewTodo = z.infer<typeof newTodoSchema>;

export const newTodoInitialValues: NewTodo = {
  title: "",
};

export type TodoActionState = FormActionState<NewTodo>;

export const todoActionInitialState: TodoActionState = {
  success: false,
  message: "",
  errors: undefined,
};
