export const ARFFFormatter = (
  params: {
    relation: string;
  },
  data: { x: number; y: number; dx: number; dy: number; time: number }[]
): string => {
  const arff = [
    `@relation ${params.relation}`,
    "",
    `@attribute x numeric`,
    `@attribute y numeric`,
    `@attribute dx numeric`,
    `@attribute dy numeric`,
    `@attribute time numeric`,
    "",
    `@data`,
    ``,
    ...data.map(({ x, y, dx, dy, time }) => `${x},${y},${dx},${dy},${time}`),
  ].join("\n");

  return arff;
};
