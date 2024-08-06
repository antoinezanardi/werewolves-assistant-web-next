type UseStrings = {
  convertBooleanAsAffirmativeString: (value: boolean) => string;
  lowerCaseFirstLetter: (value: string) => string;
};

function useStrings(): UseStrings {
  function convertBooleanAsAffirmativeString(value: boolean): string {
    return value ? "yes" : "no";
  }

  function lowerCaseFirstLetter(value: string): string {
    return value.charAt(0).toLowerCase() + value.slice(1);
  }
  return {
    convertBooleanAsAffirmativeString,
    lowerCaseFirstLetter,
  };
}

export { useStrings };