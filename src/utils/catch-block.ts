export function tryCatch(
  tryHandle: () => any,
  catchHandle: (error: unknown) => any
) {
  try {
    return tryHandle();
  } catch (error) {
    return catchHandle(error);
  }
}

export function createTryCatchBlock<T>(catchHandle: (error: unknown) => void) {
  return <E = T>(tryHandle: () => void) => {
    return tryCatch(tryHandle, catchHandle) as E;
  };
}
