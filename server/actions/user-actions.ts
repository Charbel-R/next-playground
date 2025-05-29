"use server";

import { userFormSchema } from "@/lib//validations/schema";
import {
  type FormActionState,
  createFormErrRes,
  createFormSuccessRes,
} from "@/lib/types/form-state";
import { type UserFormData } from "@/lib/types/user";
import { validateFormData } from "@/lib/utils/form-utils";

export async function submitUserForm(
  prevState: FormActionState<UserFormData>,
  formData: FormData,
): Promise<FormActionState<UserFormData>> {
  // Validate form data - handles its own errors gracefully
  const validation = validateFormData(formData, userFormSchema);

  if (!validation.success) {
    return createFormErrRes(
      "Please fix the validation errors",
      validation.errors,
    );
  }

  try {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = validation.data;

    // Business logic validation
    if (data.email === "error@example.com") {
      return createFormErrRes("This email is not allowed", {
        email: ["This email address is not permitted."],
      });
    }

    // Process the data (save to database, send email, etc.)
    console.log("Form submitted successfully:", data);

    return createFormSuccessRes<UserFormData>(
      "Registration submitted successfully!",
      data,
    );
  } catch (error) {
    // Only handles unexpected errors (database, network, etc.)
    console.error("Error during form submission:", error);
    return createFormErrRes(
      "An unexpected error occurred during submission. Please try again.",
    );
  }
}
