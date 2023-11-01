import { Database } from 'src/database/database'
import { Results } from 'src/globals/interfaces/results'

export class FlavorRepository extends Database {
  async getAllFlavors(): Promise<object> {
    try {
      const results: Results = await this.client.query('SELECT * FROM flavors')
      return results.rows
    } catch (error) {
      return this.messageStatus500
    }
  }
}
