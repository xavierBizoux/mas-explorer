import { Item, Link } from "./api"

export interface ModulesList {
  accept: string
  count: number
  items: Module[]
  limit: number
  links: Link[]
  name: string
  start: number
  version: number
}
export interface Module extends Item{
  name: string
  revision: number
  description?: string
  scope?: string
  language?: string
  stepIds?: string[]
  properties: Property[]
}

export interface Property {
  name: string
  value: string
}

export interface Step extends Item{
  inputs: StepVariable[]
  moduleId: string
  outputs: StepVariable[]
}

export interface StepVariable {
  name: string
  type: string
  dim: number
  size: number
}