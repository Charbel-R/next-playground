"use client";

import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitUserForm } from "@/server/actions/user-actions";
import { userFormSchema } from "@/lib/validations/schema";
import type { FormActionState } from "@/lib/types/form-state";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"; // <-- ADD THIS IMPORT
import { UserFormData } from "@/lib/types/user";

// Updated initialState to match lib/types.ts and better reflect useActionState
const initialState: FormActionState<UserFormData> = {
  success: false, // Default to false
  message: "", // Default to empty string
  errors: undefined,
  data: undefined,
};

export function RegistrationForm() {
  const [state, formAction, isPending] = useActionState(
    submitUserForm,
    initialState,
  );

  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
      age: undefined, // Default to undefined for optional numbers
      message: "", // Default to empty string for optional strings
    },
    // Make validation interactive: validate on every change
    mode: "onChange", // Validate as user types
    reValidateMode: "onChange", // Re-validate on every change
    shouldFocusError: true, // Focus first error field on submit
  });

  // Handle server-side validation errors and general messages
  useEffect(() => {
    if (state.message) {
      // Display toast based on success status
      if (state.success) {
        toast.success(state.message);
      } else {
        toast.error(state.message);
      }
    }

    // Set errors coming from the server zodValidation to their respective fields
    if (state.errors) {
      Object.entries(state.errors).forEach(([field, messages]) => {
        if (field !== "_form" && messages && messages.length > 0) {
          form.setError(field as keyof UserFormData, {
            type: "server",
            message: messages[0],
          });
        }
      });
    }

    // Reset the form on success
    if (state.success) {
      form.reset();
    }
  }, [state, form]); // Ensure dependencies are correct

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-center text-2xl font-bold">User Registration</h1>
      <Form {...form}>
        <form action={formAction} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter your age"
                    disabled={isPending}
                    {...field}
                    // Handle change to number. Zod's coerce will handle string to number
                    // But input elements return strings, so manual Number() conversion is needed here for RHF.
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? undefined : Number(value));
                    }}
                    value={field.value ?? ""} // Ensure controlled component handles undefined
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about yourself..."
                    rows={4}
                    disabled={isPending}
                    {...field}
                    value={field.value ?? ""} // Ensure controlled component handles undefined
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={
              isPending ||
              !form.formState.isValid ||
              form.formState.isSubmitting ||
              form.formState.isLoading
            }
          >
            {isPending ? "Submitting..." : "Submit Form"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
