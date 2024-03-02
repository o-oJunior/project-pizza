export interface IOrder {
  code: number
  subTotal: number
  total: number
  dateOrder: Date
  timeOrder: Date
  quantity: number
  idClient: number
  idAddress: number
  idPizzaSize?: number
  idFlavor?: number
  idBorder?: number
  idBud?: number
  idDrink?: number
  idCombo?: number
}

export const initialValueOrder: IOrder = {
  code: 0,
  subTotal: 0,
  total: 0,
  dateOrder: new Date(),
  timeOrder: new Date(),
  quantity: 1,
  idClient: 0,
  idAddress: 0,
  idPizzaSize: 0,
  idFlavor: 0,
  idBorder: 0,
  idBud: 0,
  idDrink: 0,
  idCombo: 0,
}
