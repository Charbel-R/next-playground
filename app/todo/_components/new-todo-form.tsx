"use client";

import { useActionState, useEffect, useRef, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { createTodoAction } from "@/server/actions/todo-actions";

import { todoActionInitialState } from "@/lib/types/todo";
import { NewTodo, newTodoInitialValues } from "@/lib/types/todo";
import { newTodoSchema } from "@/lib/validations/schema";

export default function NewTodoForm() {
  const [state, dispatch, isPending] = useActionState(
    createTodoAction,
    todoActionInitialState,
  );

  const form = useForm<NewTodo>({
    resolver: zodResolver(newTodoSchema),
    defaultValues: newTodoInitialValues,
    mode: "onChange",
    reValidateMode: "onSubmit",
    shouldFocusError: true, // Focus first error field on submit
  });

  //  Use formState.isValid for real-time validation status
  const { isValid } = form.formState;

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
      form.reset(newTodoInitialValues);
    } else {
      toast.error(state.message);
    }

    // Handle server validation errors if the state is an error state
    if (!state.success && state.errors) {
      Object.entries(state.errors).forEach(([field, messages]) => {
        form.setError(field as keyof NewTodo, {
          type: "server",
          message: messages[0],
        });
      });
    }
  }, [state.success, state.message, form]);

  return (
    <Form {...form}>
      <form action={dispatch}>
        <div className="flex gap-3">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="What needs to be done?"
                      className="h-12 border-gray-300 text-base focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600 dark:focus:border-blue-400"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            disabled={isPending || !isValid}
            className="h-12 bg-gradient-to-r from-blue-600 to-purple-600 px-6 font-medium text-white shadow-lg transition-all duration-200 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                Adding...
              </div>
            ) : (
              "Add Task"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
