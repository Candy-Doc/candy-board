export type SidebarItem = {
  type: ElementType,
  label: string,
  childrens?: Array<SidebarItem>
};

export enum ElementType {
  TITLE,
  ELEMENT,
}