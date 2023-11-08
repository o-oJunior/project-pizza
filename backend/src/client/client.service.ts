import { Injectable } from '@nestjs/common'
import { ClientRepository } from './repositories/client.repository'
import { CreateClientDto } from './dto/createClient.dto'
import { isExists } from './validations/isExists'
import { UpdateClientDto } from './dto/updateClient.dto'
@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async getClientByID(id: number): Promise<object> {
    try {
      const response = await this.clientRepository.getClientByID(id)
      const values = Object.values(response)
      const clientFormated = values.map((value) => {
        value.hashPassword = value.hashpassword
        value.dateCreated = value.datecreated
        value.timeCreated = value.timecreated
        delete value.hashpassword
        delete value.datecreated
        delete value.timecreated
        return value
      })
      if (!clientFormated) {
        return { statusCode: 404, error: 'Cliente não foi encontrado!' }
      }
      return { statusCode: 200, data: clientFormated }
    } catch (error) {
      return this.clientRepository.statusCode500
    }
  }

  async createClient(createClientDto: CreateClientDto): Promise<object> {
    const date = new Date().toLocaleDateString()
    const time = new Date().toLocaleTimeString()
    createClientDto.dateCreated = date
    createClientDto.timeCreated = time
    try {
      const cpf: object = await this.clientRepository.getClientByCPF(createClientDto.cpf)
      const email: object = await this.clientRepository.getClientByEMAIL(createClientDto.email)
      const checkCPF: object = isExists(cpf, 'cpf')
      const checkEmail: object = isExists(email, 'email')
      if (checkCPF || checkEmail) {
        return checkCPF || checkEmail
      }
      await this.clientRepository.createClient(createClientDto)
      return { statusCode: 201, message: 'Cliente criado com sucesso!' }
    } catch (error) {
      return this.clientRepository.statusCode500
    }
  }

  async updateClientByID(id: number, updateClientDto: UpdateClientDto): Promise<object> {
    try {
      const results = await this.clientRepository.getClientByID(id)
      const keys = Object.keys(updateClientDto)
      keys.forEach((key) =>
        key === 'name' || key === 'phone' || key === 'email' || key === 'hashPassword'
          ? key
          : delete updateClientDto[key]
      )
      if (Object.keys(updateClientDto).length === 0) {
        return { statusCode: 400, error: 'Erro ao atualizar o cliente!' }
      }
      const checkUser = isExists(results, 'cliente')
      if (!checkUser) {
        return { statusCode: 404, error: 'Cliente não encontrado!' }
      }
      const response: any = await this.clientRepository.updateClientByID(id, updateClientDto)
      if (response.statusCode === 500) {
        return this.clientRepository.statusCode500
      }
      return { statusCode: 200, message: 'Cliente alterado com sucesso!' }
    } catch (error) {
      return this.clientRepository.statusCode500
    }
  }

  async deleteClientByID(id: number): Promise<object> {
    try {
      await this.clientRepository.deleteClientByID(id)
      return { statusCode: 200, message: 'Cliente excluido com sucesso!' }
    } catch (error) {
      return this.clientRepository.statusCode500
    }
  }
}
