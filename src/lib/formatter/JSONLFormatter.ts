export const JSONLFormatter = (
  data: { x: number; y: number; time: number }[]
): string => {
  return data.map((value) => JSON.stringify(value)).join("\n");
};
