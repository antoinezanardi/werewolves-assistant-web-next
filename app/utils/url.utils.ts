function removeTrailingSlashes(url: string): string {
  return url.replace(/\/+$/u, "");
}

export { removeTrailingSlashes };