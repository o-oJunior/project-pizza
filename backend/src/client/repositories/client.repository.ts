import { Database } from 'src/database/database'
import { CreateClientDto } from '../dto/createClient.dto'
import { IResults } from 'src/globals/interfaces/results'
import { UpdateClientDto } from '../dto/updateClient.dto'

export class ClientRepository extends Database {
  async getClientByID(id: number): Promise<object> {
    this.connectDatabase()
    try {
      const query: string = `SELECT * FROM client WHERE id = $1`
      const results: IResults = await this.client.query(query, [id])
      return results.rows
    } catch (error) {
      return this.statusCode500
    } finally {
      this.disconnectDatabase()
    }
  }

  async getClientByCPF(cpf: string): Promise<object> {
    this.connectDatabase()
    try {
      const query: string = 'SELECT * FROM client WHERE cpf = $1'
      const results: IResults = await this.client.query(query, [cpf])
      return results.rows
    } catch (error) {
      return this.statusCode500
    } finally {
      this.disconnectDatabase()
    }
  }

  async getClientByEMAIL(email: string): Promise<object> {
    this.connectDatabase()
    try {
      const query: string = 'SELECT * FROM client WHERE email = $1'
      const results: IResults = await this.client.query(query, [email])
      return results.rows
    } catch (error) {
      this.statusCode500
    } finally {
      this.disconnectDatabase()
    }
  }

  async createClient(createClientDto: CreateClientDto): Promise<object> {
    this.connectDatabase()
    try {
      const insert: string = `INSERT INTO 
      client(firstName, lastName, cpf, phone, email, hashPassword, birthDate, isAdmin, dateCreated, timeCreated) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`
      const values: any[] = [
        createClientDto.firstName,
        createClientDto.lastName,
        createClientDto.cpf,
        createClientDto.phone,
        createClientDto.email,
        createClientDto.hashPassword,
        createClientDto.birthDate,
        createClientDto.isAdmin,
        createClientDto.dateCreated,
        createClientDto.timeCreated,
      ]
      return await this.client.query(insert, values)
    } catch (error) {
      return this.statusCode500
    } finally {
      this.disconnectDatabase()
    }
  }

  async updateClientByID(id: number, updateClientDto: UpdateClientDto): Promise<object> {
    this.connectDatabase()
    try {
      const values: string[] = Object.values(updateClientDto)
      const keys: string[] = Object.keys(updateClientDto)
      const params: string[] = keys.map((attribute, i) => `${attribute} = '${values[i]}'`)
      const update: string = `UPDATE client SET ${params} WHERE id = ${id}`
      return await this.client.query(update)
    } catch (error) {
      return this.statusCode500
    } finally {
      this.disconnectDatabase()
    }
  }

  async deleteClientByID(id: number): Promise<object> {
    this.connectDatabase()
    try {
      const deleted: string = 'DELETE FROM client WHERE id = $1'
      return await this.client.query(deleted, [id])
    } catch (error) {
      return this.statusCode500
    } finally {
      this.disconnectDatabase()
    }
  }
}
