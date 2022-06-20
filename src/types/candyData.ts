import type { Writable } from "svelte/store";

export type CandyData = BoundedContext[];
export type WritableCandyData = Writable<BoundedContext[]>;

export enum Type {
  ValueObject = "VALUE_OBJECT",
  Aggregate = "AGGREGATE",
}

export type BoundedContext = {
  simpleName: string;
  canonicalName: string;
  description: string;
  packageName: string;
  coreConcepts: CoreConcept[];
  domainCommands: DomainCommand[];
  domainEvents: DomainEvent[];
  aggregates: Aggregate[];
  valueObject: ValueObject[];
};

export type CoreConcept = {
  description: string;
  name: string;
  className: string;
  type: string;
  interactsWith: any;
  errors: string[];
};

export type DomainCommand = {
  description: string;
  name: string;
  className: string;
  type: string;
  interactsWith: any;
  errors: string[];
};

export type DomainEvent = {
  description: string;
  name: string;
  className: string;
  type: string;
  interactsWith: any;
  errors: string[];
};

export type Aggregate = {
  description: string;
  name: string;
  className: string;
  type: string;
  interactsWith: any;
  errors: string[];
};

export type ValueObject = {
  description: string;
  name: string;
  className: string;
  type: string;
  interactsWith: any;
  errors: string[];
};
