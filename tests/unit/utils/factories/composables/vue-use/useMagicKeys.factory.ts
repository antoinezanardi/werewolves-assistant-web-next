import type { Ref } from "vue";

type MockedUseMagicKeys = {
  shift: Ref<boolean>;
  arrowright: Ref<boolean>;
  arrowleft: Ref<boolean>;
};

function createFakeUseMagicKeys(): MockedUseMagicKeys {
  return {
    shift: ref<boolean>(false),
    arrowright: ref<boolean>(false),
    arrowleft: ref<boolean>(false),
  };
}

export { createFakeUseMagicKeys };