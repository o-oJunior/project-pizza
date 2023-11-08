import { Injectable } from '@nestjs/common'
import { CreateOrdersDto } from './dto/createOrders.dto'
import { OrdersRespository } from './repositories/orders.respository'

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRespository) {}

  async getOrdersByClient(idClient: number): Promise<object> {
    try {
      const response: object = await this.ordersRepository.getOrderByClient(idClient)
      const values = Object.values(response)
      const ordersFormated = values.map((value) => {
        value.dateOrder = value.dateorder
        value.timeOrder = value.timeorder
        delete value.dateorder
        delete value.timeorder
        return value
      })
      return { statusCode: 200, data: ordersFormated }
    } catch (error) {
      return this.ordersRepository.statusCode500
    }
  }

  async getOrdersByCode(code: number): Promise<object> {
    try {
      const response: object = await this.ordersRepository.getOrderByCode(code)
      const values = Object.values(response)
      const ordersFormated = values.map((value) => {
        value.dateOrder = value.dateorder
        value.timeOrder = value.timeorder
        value.idPizzaSize = value.idpizzasize
        value.idFlavor = value.idflavor
        value.flavorName = value.flavorname
        value.idBorder = value.idborder
        value.borderName = value.bordername
        value.idBud = value.idbud
        value.budName = value.budname
        value.idDrink = value.iddrink
        value.drinkName = value.drinkname
        value.idCombo = value.idcombo
        value.comboName = value.comboname

        delete value.dateorder
        delete value.timeorder
        delete value.idpizzasize
        delete value.idflavor
        delete value.flavorname
        delete value.idborder
        delete value.bordername
        delete value.idbud
        delete value.budname
        delete value.iddrink
        delete value.drinkname
        delete value.idcombo
        delete value.comboName
        return value
      })

      return { statusCode: 200, data: ordersFormated }
    } catch (error) {
      return this.ordersRepository.statusCode500
    }
  }

  async createOrders(createOrdersDto: CreateOrdersDto): Promise<object> {
    try {
      await this.ordersRepository.createOrders(createOrdersDto)
      return { statusCode: 201, message: 'Pedido registrado com sucesso!' }
    } catch (error) {
      return this.ordersRepository.statusCode500
    }
  }
}
