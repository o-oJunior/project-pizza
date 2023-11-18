import { Database } from 'src/database/database'
import { IResults } from 'src/globals/interfaces/results'

export class DrinkRepository extends Database {
  async getAllDrinks(): Promise<object> {
    this.connectDatabase()
    try {
      const results: IResults = await this.client.query('SELECT * FROM drink')
      return results.rows
    } catch (error) {
      return this.statusCode500
    } finally {
      this.disconnectDatabase()
    }
  }

  async getDrinkByType(type: string): Promise<object> {
    this.connectDatabase()
    try {
      const results: IResults = await this.client.query('SELECT * FROM drink WHERE type = $1', [type])
      return results.rows
    } catch (error) {
      return this.statusCode500
    } finally {
      this.disconnectDatabase()
    }
  }
}
