function createFakeUseElementHover(): ReturnType<typeof useElementHover> {
  return ref<boolean>(false);
}

export { createFakeUseElementHover };