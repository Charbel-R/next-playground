import { z } from "zod";

import { contactFormSchema, userFormSchema } from "../validations/schema";

// Define types for user and contact form data based on the schemas
export type UserFormData = z.infer<typeof userFormSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
