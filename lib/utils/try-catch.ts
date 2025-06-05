type Success<T> = {
  data: T;
  error: null;
};

type Failure<E = Error> = {
  data: null;
  error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error ? (error as E) : (new Error(String(error)) as E),
    };
  }
}
