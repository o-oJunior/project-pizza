import { Database } from 'src/database/database'
import { CreateAddressDto } from '../dto/createAddress.dto'
import { IResults } from 'src/globals/interfaces/results'

export class AddressRepository extends Database {
  async getAddressByIDClient(idClient: number): Promise<object> {
    this.connectDatabase()
    try {
      const query = 'SELECT * FROM address WHERE idClient = $1'
      const results: IResults = await this.client.query(query, [idClient])
      return results.rows
    } catch (error) {
      return this.statusCode500
    } finally {
      this.disconnectDatabase()
    }
  }

  async createAddress(createAddressDto: CreateAddressDto): Promise<object> {
    this.connectDatabase()
    try {
      const insert: string = `INSERT INTO address (cep, street, district, locality, state, complement, number, idClient)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`
      const values: (string | number)[] = [
        createAddressDto.cep,
        createAddressDto.street,
        createAddressDto.district,
        createAddressDto.locality,
        createAddressDto.state,
        createAddressDto.complement,
        createAddressDto.number,
        createAddressDto.idClient,
      ]
      return await this.client.query(insert, values)
    } catch (error) {
      return this.statusCode500
    } finally {
      this.disconnectDatabase()
    }
  }

  async deleteAddress(id: number, idClient: number): Promise<object> {
    this.connectDatabase()
    try {
      const deletedAddress: string = 'DELETE FROM address WHERE id = $1 and idClient = $2'
      const values: number[] = [id, idClient]
      return await this.client.query(deletedAddress, values)
    } catch (error) {
      return this.statusCode500
    } finally {
      this.disconnectDatabase()
    }
  }
}
