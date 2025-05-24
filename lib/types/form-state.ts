// Type representing the possible values that can be extracted from FormData
export type FormDataObject = Record<
  string,
  string | File | boolean | undefined | (string | File)[]
>;

export type FormActionState<T> = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  data?: T;
};

/**
 * Helper function to create error responses consistently
 */
export function createFormErrRes<T>(
  message: string,
  errors?: Record<string, string[]>,
): FormActionState<T> {
  return {
    success: false,
    message,
    errors,
  };
}

/**
 * Helper function to create success responses consistently
 */
export function createFormSuccessRes<T>(
  message: string,
  data: T,
): FormActionState<T> {
  return {
    success: true,
    message,
    data,
  };
}
