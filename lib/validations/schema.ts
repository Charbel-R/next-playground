import { z } from "zod";

export const userFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  age: z.coerce
    .number({
      invalid_type_error: "Age must be a number",
    })
    .int("Age must be a whole number")
    .min(13, "You must be at least 13 years old")
    .max(120, "Age must be less than 120")
    .optional(),
  message: z
    .string()
    .max(500, "Message must be less than 500 characters")
    .optional(),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  urgent: z.boolean().optional(),
});
