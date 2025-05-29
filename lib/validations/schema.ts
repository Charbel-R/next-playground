import { z } from "zod";

export const userFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z
    .string()
    .max(500, "Message must be less than 500 characters")
    .optional(),
});

export const registrationFormInitialValues = {
  name: "",
  email: "",
  message: "",
};

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  urgent: z.boolean().optional(),
});
