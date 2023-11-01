import { Database } from 'src/database/database'
import { Results } from 'src/globals/interfaces/results'

export class ComboRepository extends Database {
  async getAllCombos(): Promise<object> {
    try {
      const results: Results = await this.client.query('SELECT * FROM combos')
      return results.rows
    } catch (error) {
      return this.messageStatus500
    }
  }
}
