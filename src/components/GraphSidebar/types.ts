import type { IconDefinition as SolidIconDefinition } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition as RegularIconDefinition } from "@fortawesome/free-regular-svg-icons";

export type PatternType = {
  name: string;
  children: Array<PatternType>;
  id: string;
  classes: string;
};

export type PatternLegend = {
  label: string;
  bgColor: string;
  classes: string;
};

export type IconOptionsDefinition = {
  active: SolidIconDefinition | RegularIconDefinition;
  inactive: SolidIconDefinition | RegularIconDefinition;
};
