// Type representing the possible values that can be extracted from FormData
export type RawObject = Record<
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
  data?: T;
};

export type FormActionState<T> = FormErrorState | FormSuccessState<T>;

export const formActionInitialState: FormErrorState = {
  success: false,
  message: "",
  errors: undefined,
};
