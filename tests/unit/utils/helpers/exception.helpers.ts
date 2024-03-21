async function getError<TError>(call: () => unknown): Promise<TError> {
  try {
    await call();
    throw new Error("Expected an error to be thrown.");
  } catch (error: unknown) {
    return error as TError;
  }
}

export { getError };