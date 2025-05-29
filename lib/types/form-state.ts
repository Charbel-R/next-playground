// Type representing the possible values that can be extracted from FormData
export type FormDataObject = Record<
  string,
  string | File | boolean | undefined | (string | File)[]
>;

export type FormErrorState = {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
};

export type FormSuccessState<T> = {
  success: true;
  message: string;
  data: T;
};

export type FormActionState<T> = FormErrorState | FormSuccessState<T>;

/**
 * Helper function to create error responses consistently
 */
export function createFormErrRes(
  message: string,
  errors?: Record<string, string[]>,
): FormErrorState {
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
): FormSuccessState<T> {
  return {
    success: true,
    message,
    data,
  };
}
