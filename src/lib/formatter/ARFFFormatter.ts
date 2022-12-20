export const ARFFFormatter = (
  params: {
    relation: string;
  },
  data: { x: number; y: number; time: number }[]
): string => {
  const arff = [
    `@relation ${params.relation}`,
    "",
    `@attribute x numeric`,
    `@attribute y numeric`,
    `@attribute time numeric`,
    "",
    `@data`,
    ``,
    ...data.map(({ x, y, time }) => `${x},${y},${time}`),
  ].join("\n");

  return arff;
};
