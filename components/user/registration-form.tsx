"use client";

import { useActionState, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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

import { submitUserForm } from "@/server/actions/user-actions";

import { formActionInitialState } from "@/lib/types/form-state";
import { UserFormData } from "@/lib/types/user";
import {
  registrationFormInitialValues,
  userFormSchema,
} from "@/lib/validations/schema";

export function RegistrationForm() {
  const [state, formAction, isPending] = useActionState(
    submitUserForm,
    formActionInitialState,
  );

  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: registrationFormInitialValues,
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
    if (!state.success && state.errors) {
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
  }, [state.success, state.message]); // Ensure dependencies are correct

  return (
    <Form {...form}>
      <form action={formAction} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your full name"
                  disabled={isPending}
                  {...field}
                  className="h-11 transition-all duration-200 focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
              <FormLabel className="text-sm font-medium">
                Email Address
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  disabled={isPending}
                  {...field}
                  className="h-11 transition-all duration-200 focus:ring-2 focus:ring-ring focus:ring-offset-2"
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
              <FormLabel className="text-sm font-medium">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about yourself..."
                  rows={4}
                  disabled={isPending}
                  {...field}
                  value={field.value ?? ""} // Ensure controlled component handles undefined
                  className="min-h-[100px] resize-none transition-all duration-200 focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="h-11 w-full transform bg-gradient-to-r from-primary to-primary/90 font-medium text-primary-foreground transition-all duration-200 hover:scale-[1.02] hover:from-primary/90 hover:to-primary active:scale-[0.98]"
          disabled={
            isPending ||
            !form.formState.isValid ||
            form.formState.isSubmitting ||
            form.formState.isLoading
          }
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Submitting...
            </div>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </Form>
  );
}
