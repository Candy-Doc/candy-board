export type patternType = {
  name: string;
  children: Array<patternType>;
  id: string;
  classes: string;
};

export type patternLegend = {
  label: string;
  bgColor: string;
  classes: string;
};
