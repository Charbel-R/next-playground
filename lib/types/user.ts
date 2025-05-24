import { z } from "zod";
import { contactFormSchema, userFormSchema } from "../validations/schema";

export type UserFormData = z.infer<typeof userFormSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
