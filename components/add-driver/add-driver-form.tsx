"use client";

// 1. Import the necessary components and hooks.
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

// 2. Define your form schema.
export const addDriverFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
});

export default function AddDriverForm({
  setShowSheet,
}: {
  setShowSheet: (showSheet: boolean) => void;
}) {
  // 3. Define your form.
  const form = useForm<z.infer<typeof addDriverFormSchema>>({
    resolver: zodResolver(addDriverFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  // 4. Define a submit handler.
  function onSubmit(values: z.infer<typeof addDriverFormSchema>) {
    // Save the form values to localStorage
    localStorage.setItem("personData", JSON.stringify(values));
    // Reset the form
    form.reset();
    // Close the sheet
    setShowSheet(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 px-4 pb-4"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Lisa"
                  {...field}
                  className="text-md"
                  autoFocus
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Simpson" {...field} className="text-md" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? <span className="animate-spin">Saving...</span> : "Save"}
        </Button>
      </form>
    </Form>
  );
}
