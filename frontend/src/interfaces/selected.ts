export interface ISelected {
  bud: IComponentsItem
  border: IComponentsItem
  flavors: IComponentsItem[]
  soda: IComponentsItem
}

export interface IComponentsItem {
  id: number
  name: string
  priceAdditional?: number
  liter?: number
}
