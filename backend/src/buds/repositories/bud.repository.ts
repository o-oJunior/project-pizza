import { Database } from 'src/database/database'
import { Results } from 'src/globals/interfaces/results'

export class BudRepository extends Database {
  async getAllBuds(): Promise<object> {
    try {
      const results: Results = await this.client.query('SELECT * FROM buds')
      return results.rows
    } catch (error) {
      return this.messageStatus500
    }
  }
}
