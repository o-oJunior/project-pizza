import { Database } from 'src/database/database'
import { IResults } from 'src/globals/interfaces/results'

export class PizzaSizeRepository extends Database {
  async getAllPizzaSizes(): Promise<object> {
    this.connectDatabase()
    try {
      const results: IResults = await this.client.query('SELECT * FROM pizzaSize')
      return results.rows
    } catch (error) {
      return this.statusCode500
    } finally {
      this.disconnectDatabase()
    }
  }
}
