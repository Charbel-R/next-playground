"use server";

import { userFormSchema } from "@/lib//validations/schema";
import { type FormActionState } from "@/lib/types/form-state";
import { type UserFormData } from "@/lib/types/user";
import { convertFormDataToObj, validateFormData } from "@/lib/utils/form-utils";

export async function submitUserForm(
  _prevState: FormActionState<UserFormData>,
  formData: FormData,
): Promise<FormActionState<UserFormData>> {
  // Convert FormData to object and validate
  const formDataObj = convertFormDataToObj(formData);
  const validation = validateFormData(formDataObj, userFormSchema);

  if (!validation.success) {
    return {
      success: false,
      message: "Validation failed",
      errors: validation.errors as Record<keyof UserFormData, string[]>,
    };
  }

  try {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const data = validation.data;

    // Business logic validation
    if (data.email === "error@example.com") {
      return {
        success: false,
        message: "This email address is not allowed.",
      };
    }

    // Process the data (save to database, send email, etc.)
    console.log("Form submitted successfully:", data);

    return {
      success: true,
      message: "Form submitted successfully!",
    };
  } catch (error) {
    // Only handles unexpected errors (database, network, etc.)
    console.error("Error during form submission:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}
