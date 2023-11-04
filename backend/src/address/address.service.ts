import { Injectable } from '@nestjs/common'
import { CreateAddressDto } from './dto/createAddress.dto'
import { AddressRepository } from './repositories/address.repository'
import { ClientRepository } from 'src/client/repositories/client.repository'

@Injectable()
export class AddressService {
  constructor(
    private readonly addressRepository: AddressRepository,
    private readonly clientRepository: ClientRepository
  ) {}

  async getAddressByIDClient(idClient: number) {
    try {
      const response: object = await this.addressRepository.getAddressByIDClient(idClient)
      const values = Object.values(response)
      const address = values.map((value) => {
        value.idClient = value.idclient
        delete value.idclient
        return value
      })
      return { statusCode: 200, data: address }
    } catch (error) {
      return this.addressRepository.statusCode500
    }
  }

  async createAddress(createAddressDto: CreateAddressDto): Promise<object> {
    try {
      const response: object = await this.clientRepository.getClientByID(createAddressDto.idClient)
      if (Object.keys(response).length === 0) {
        return { statusCode: 404, error: 'Cliente não encontrado!' }
      }
      await this.addressRepository.createAddress(createAddressDto)
      return { statusCode: 201, message: 'Endereço criado com sucesso!' }
    } catch (error) {
      return this.addressRepository.statusCode500
    }
  }

  async deleteAddress(id: number, idClient: number) {
    try {
      await this.addressRepository.deleteAddress(id, idClient)
      return { statusCode: 200, message: 'Endereço excluido com sucesso!' }
    } catch (error) {
      return this.addressRepository.statusCode500
    }
  }
}
