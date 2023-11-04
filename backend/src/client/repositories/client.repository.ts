import { Database } from 'src/database/database'
import { CreateClientDto } from '../dto/createClient.dto'
import { IResults } from 'src/globals/interfaces/results'
import { UpdateClientDto } from '../dto/updateClient.dto'

export class ClientRepository extends Database {
  async getUserByID(id: number): Promise<object> {
    try {
      const query: string = `SELECT * FROM client WHERE id = $1`
      const results: IResults = await this.client.query(query, [id])
      return results.rows
    } catch (error) {
      return this.statusCode500
    }
  }

  async getUserByCPF(cpf: string): Promise<object> {
    try {
      const query: string = 'SELECT * FROM client WHERE cpf = $1'
      const results: IResults = await this.client.query(query, [cpf])
      return results.rows
    } catch (error) {
      return this.statusCode500
    }
  }

  async getUserByEMAIL(email: string): Promise<object> {
    try {
      const query: string = 'SELECT * FROM client WHERE email = $1'
      const results: IResults = await this.client.query(query, [email])
      return results.rows
    } catch (error) {
      this.statusCode500
    }
  }

  async createUser(createClientDto: CreateClientDto): Promise<object> {
    try {
      const insert: string = `INSERT INTO 
      client(name, cpf, phone, email, hashPassword, dateCreated, timeCreated) 
      VALUES ($1, $2, $3, $4, $5, $6, $7)`
      const values: string[] = [
        createClientDto.name,
        createClientDto.cpf,
        createClientDto.phone,
        createClientDto.email,
        createClientDto.hashPassword,
        createClientDto.dateCreated,
        createClientDto.timeCreated,
      ]
      return await this.client.query(insert, values)
    } catch (error) {
      return this.statusCode500
    }
  }

  async updateUserByID(id: number, updateClientDto: UpdateClientDto): Promise<object> {
    try {
      const values: string[] = Object.values(updateClientDto)
      const keys: string[] = Object.keys(updateClientDto)
      const params: string[] = keys.map((attribute, i) => `${attribute} = '${values[i]}'`)
      const update: string = `UPDATE client SET ${params} WHERE id = ${id}`
      return await this.client.query(update)
    } catch (error) {
      return this.statusCode500
    }
  }

  async deleteUserByID(id: number): Promise<object> {
    try {
      const deleted: string = 'DELETE FROM client WHERE id = $1'
      return await this.client.query(deleted, [id])
    } catch (error) {
      return this.statusCode500
    }
  }
}
