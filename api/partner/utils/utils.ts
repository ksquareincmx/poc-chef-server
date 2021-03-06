// to battle with index signature problem
export function hasKey<O>(
  obj: O,
  key: string
): key is Extract<keyof O, string> {
  return key in obj;
}
