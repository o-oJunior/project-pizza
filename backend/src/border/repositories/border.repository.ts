import { Database } from 'src/database/database'
import { IResults } from 'src/globals/interfaces/results'

export class BorderRepository extends Database {
  async getAllBorders(): Promise<object> {
    try {
      const results: IResults = await this.client.query('SELECT * FROM border')
      return results.rows
    } catch (error) {
      return this.statusCode500
    }
  }
}
