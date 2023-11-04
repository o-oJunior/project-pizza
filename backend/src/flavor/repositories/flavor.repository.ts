import { Database } from 'src/database/database'
import { IResults } from 'src/globals/interfaces/results'

export class FlavorRepository extends Database {
  async getAllFlavors(): Promise<object> {
    this.connectDatabase()
    try {
      const results: IResults = await this.client.query('SELECT * FROM flavor')
      return results.rows
    } catch (error) {
      return this.statusCode500
    } finally {
      this.disconnectDatabase()
    }
  }
}
