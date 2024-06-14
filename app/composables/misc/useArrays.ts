type UseArrays = {
  insertIf: <T>(mustBeInserted: boolean, value: T) => T[];
};

function useArrays(): UseArrays {
  function insertIf<T>(mustBeInserted: boolean, value: T): T[] {
    return mustBeInserted ? [value] : [];
  }
  return { insertIf };
}

export { useArrays };