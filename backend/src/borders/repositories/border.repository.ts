import { Database } from 'src/database/database'
import { Results } from 'src/globals/interfaces/results'

export class BorderRepository extends Database {
  async getAllBorders(): Promise<object> {
    try {
      const results: Results = await this.client.query('SELECT * FROM borders')
      return results.rows
    } catch (error) {
      return this.messageStatus500
    }
  }
}
