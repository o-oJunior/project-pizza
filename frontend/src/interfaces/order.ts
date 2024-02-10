interface IOrder {
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
