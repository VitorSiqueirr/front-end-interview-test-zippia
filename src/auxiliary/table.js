export function getNestedValue(obj, path) {
  return path.split(".").reduce((o, i) => o[i], obj);
}
