import { Database } from 'src/database/database'
import { Results } from 'src/globals/interfaces/results'

export class PizzaSizeRepository extends Database {
  async getAllPizzaSizes(): Promise<object> {
    try {
      const results: Results = await this.client.query('SELECT * FROM pizzaSizes')
      return results.rows
    } catch (error) {
      return this.messageStatus500
    }
  }
}
