import { Database } from 'src/database/database'
import { Results } from 'src/globals/interfaces/results'

export class DrinkRepository extends Database {
  async getAllDrinks(): Promise<object> {
    try {
      const results: Results = await this.client.query('SELECT * FROM drinks')
      return results.rows
    } catch (error) {
      return this.messageStatus500
    }
  }
}
