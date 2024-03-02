import { IItem } from './item'

export interface ISelected {
  bud: IItem
  border: IItem
  flavors: IItem[]
  soda: IItem
}

export const initialValueSelected: ISelected = {
  bud: { id: 0, name: '', priceAdditional: 0 },
  border: { id: 0, name: '', priceAdditional: 0 },
  flavors: [],
  soda: { id: 0, name: '', price: 0 },
}
