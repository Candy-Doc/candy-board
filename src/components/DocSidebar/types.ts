export type SidebarItem = {
  type: ElementType;
  id: string;
  label: string;
  summary?: Array<SidebarItem>;
};

export enum ElementType {
  TITLE,
  ELEMENT,
  SUBELEMENT,
}
