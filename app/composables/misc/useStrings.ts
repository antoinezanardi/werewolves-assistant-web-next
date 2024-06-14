type UseStrings = {
  convertBooleanAsAffirmativeString: (value: boolean) => string;
};

function useStrings(): UseStrings {
  function convertBooleanAsAffirmativeString(value: boolean): string {
    return value ? "yes" : "no";
  }
  return { convertBooleanAsAffirmativeString };
}

export { useStrings };