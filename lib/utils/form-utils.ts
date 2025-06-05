import { z } from "zod";

import { RawObject } from "@/lib/types/form-state";

/**
 * Extract and validate FormData with Zod schema.
 * Returns either validated data or formatted errors.
 */
export function validateFormData<T>(
  data: T,
  schema: z.ZodSchema<T>,
):
  | { success: true; data: T }
  | { success: false; errors: Record<keyof T, string[]> } {
  try {
    const result = schema.safeParse(data);

    if (!result.success) {
      return { success: false, errors: formatZodErrors<T>(result.error) };
    }

    return { success: true, data: result.data };
  } catch (error) {
    // This catch block would primarily handle errors from `convertFormDataToObject`
    // if any unexpected issues occur there, or if `schema.safeParse` itself
    // throws an uncaught error (though it shouldn't for typical Zod usage).
    return {
      success: false,
      errors: {
        _form: ["An unexpected validation error occurred"],
      } as Record<keyof T, string[]>,
    };
  }
}

// Formats Zod errors into a Record suitable for react-hook-form.
function formatZodErrors<T>(error: z.ZodError): Record<keyof T, string[]> {
  const errors: Record<keyof T, string[]> = {} as Record<keyof T, string[]>;
  error.errors.forEach((err) => {
    const path = err.path.length > 0 ? err.path.join(".") : "_form";
    const key = path as keyof T;
    if (!errors[key]) {
      errors[key] = [];
    }
    errors[key].push(err.message);
  });
  return errors;
}

/**
 * Converts FormData entries into a plain JavaScript object.
 * Handles multiple values for the same key (e.g., from checkboxes).
 * Converts empty string values to `undefined` for Zod's optional fields.
 */
export function convertFormDataToObj(formData: FormData): RawObject {
  const rawData: RawObject = {};

  for (const [key, value] of formData.entries()) {
    // Check for "on" value for checkboxes that might be missing in FormData if unchecked
    // This is a common pattern for checkboxes that only send a value if checked
    if (
      typeof value === "string" &&
      value === "on" &&
      formData.get(key) === "on"
    ) {
      rawData[key] = true; // Assume 'on' means true for simple checkboxes
    } else if (key in rawData) {
      // Handle multiple values (e.g., multiple select, checkboxes with same name)
      const existingValue = rawData[key];
      if (Array.isArray(existingValue)) {
        existingValue.push(value);
      } else {
        rawData[key] = [existingValue as string | File, value];
      }
    } else {
      // Convert empty strings to undefined for optional fields in Zod
      rawData[key] = value === "" ? undefined : value;
    }
  }
  return rawData;
}

/**
 * Converts form values object to FormData for server submission.
 * Handles type conversion for different field types.
 * Supports File objects for file uploads.
 * Converts numbers and booleans to strings for FormData compatibility.
 */
export function convertValuesToFormData(
  values: Record<string, unknown>,
): FormData {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (typeof value === "number") {
        formData.append(key, value.toString());
      } else if (typeof value === "string") {
        formData.append(key, value);
      } else if (typeof value === "boolean") {
        formData.append(key, value.toString());
      } else if (value instanceof File) {
        formData.append(key, value);
      } else {
        // Convert other types to string
        formData.append(key, String(value));
      }
    }
  });

  return formData;
}
