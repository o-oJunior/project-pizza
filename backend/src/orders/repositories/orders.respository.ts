import { Database } from 'src/database/database'
import { CreateOrdersDto } from '../dto/createOrders.dto'

export class OrdersRespository extends Database {
  async getOrderByClient(idClient: number) {
    this.connectDatabase()
    try {
      const query: string = `SELECT code, total, dateOrder, timeOrder
      FROM orders WHERE idClient = $1
      GROUP BY code, total, dateOrder, timeOrder`
      const results = await this.client.query(query, [idClient])
      return results.rows
    } catch (error) {
      return this.statusCode500
    } finally {
      this.disconnectDatabase()
    }
  }

  async getOrderByCode(code: number) {
    this.connectDatabase()
    try {
      const query = `SELECT orders.code, orders.total, orders.dateOrder, orders.timeOrder,
      orders.idPizzaSize, pizzaSize.size,
      orders.idFlavor, flavor.name AS flavorName,
      orders.idBorder, border.name AS borderName,
      orders.idBud, bud.name AS budName,
      orders.idDrink, drink.name AS drinkName, drink.liter,
      orders.idCombo, combo.name AS comboName
      FROM orders
      LEFT JOIN pizzaSize on pizzaSize.id = orders.idPizzaSize
      LEFT JOIN flavor on flavor.id = orders.idFlavor
      LEFT JOIN border on border.id = orders.idBorder
      LEFT JOIN bud on bud.id = orders.idBud
      LEFT JOIN drink on drink.id = orders.idDrink
      LEFT JOIN combo on combo.id = orders.idCombo
      WHERE orders.code = $1`
      const response = await this.client.query(query, [code])
      return response.rows
    } catch (error) {
      return this.statusCode500
    } finally {
      this.disconnectDatabase()
    }
  }

  async createOrders(createOrdersDto: CreateOrdersDto) {
    this.connectDatabase()
    try {
      const insert: string = `INSERT INTO
      orders(code, total, dateOrder, timeOrder,
      idClient, idAddress, idPizzaSize, idFlavor, idBorder, idBud, idDrink, idCombo)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`
      const values = [
        createOrdersDto.code,
        createOrdersDto.total,
        createOrdersDto.dateOrder,
        createOrdersDto.timeOrder,
        createOrdersDto.idClient,
        createOrdersDto.idAddress,
        createOrdersDto.idPizzaSize,
        createOrdersDto.idFlavor,
        createOrdersDto.idBorder,
        createOrdersDto.idBud,
        createOrdersDto.idDrink,
        createOrdersDto.idCombo,
      ]
      return await this.client.query(insert, values)
    } catch (error) {
      return this.statusCode500
    } finally {
      this.disconnectDatabase()
    }
  }
}
