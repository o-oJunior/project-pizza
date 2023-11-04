import { Injectable } from '@nestjs/common'
import { ClientRepository } from './repositories/client.repository'
import { CreateClientDto } from './dto/createClient.dto'
import { isExists } from './validations/isExists'
import { UpdateClientDto } from './dto/updateClient.dto'

interface IClient {
  id: number
  name: string
  cpf: string
  phone: string
  email: string
  hashPassword: string
  dateCreated: string
  timeCreated: string
}

interface IRows {
  id: number
  name: string
  cpf: string
  phone: string
  email: string
  hashpassword: string
  datecreated: string
  timecreated: string
}

@Injectable()
export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {}

  async getUserByID(id: number): Promise<object> {
    this.clientRepository.connectDatabase()
    try {
      const response = await this.clientRepository.getUserByID(id)
      const rows: IRows[] = Object.values(response)
      let client: IClient
      rows.forEach((row) => {
        const dataClient = {
          id: row.id,
          name: row.name,
          cpf: row.cpf,
          phone: row.phone,
          email: row.email,
          hashPassword: row.hashpassword,
          dateCreated: row.datecreated,
          timeCreated: row.timecreated,
        }

        client = dataClient
      })
      if (!client) {
        return { statusCode: 404, error: 'Cliente não foi encontrado!' }
      }
      return { statusCode: 200, data: client }
    } catch (error) {
      return this.clientRepository.statusCode500
    } finally {
      this.clientRepository.disconnectDatabase()
    }
  }

  async createUser(createClientDto: CreateClientDto): Promise<object> {
    this.clientRepository.connectDatabase()
    const date = new Date().toLocaleDateString()
    const time = new Date().toLocaleTimeString()
    createClientDto.dateCreated = date
    createClientDto.timeCreated = time
    try {
      const cpf: object = await this.clientRepository.getUserByCPF(createClientDto.cpf)
      const email: object = await this.clientRepository.getUserByEMAIL(createClientDto.email)
      const checkCPF: object = isExists(cpf, 'cpf')
      const checkEmail: object = isExists(email, 'email')
      if (checkCPF || checkEmail) {
        return checkCPF || checkEmail
      }
      await this.clientRepository.createUser(createClientDto)
      return { statusCode: 201, message: 'Cliente criado com sucesso!' }
    } catch (error) {
      return this.clientRepository.statusCode500
    } finally {
      this.clientRepository.disconnectDatabase()
    }
  }

  async updateUserByID(id: number, updateClientDto: UpdateClientDto): Promise<object> {
    this.clientRepository.connectDatabase()
    try {
      const results = await this.clientRepository.getUserByID(id)
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
      await this.clientRepository.updateUserByID(id, updateClientDto)
      return { statusCode: 200, success: 'Cliente alterado com sucesso!' }
    } catch (error) {
      return this.clientRepository.statusCode500
    } finally {
      this.clientRepository.disconnectDatabase()
    }
  }

  async deleteUserByID(id: number): Promise<object> {
    this.clientRepository.connectDatabase()
    try {
      await this.clientRepository.deleteUserByID(id)
      return { statusCode: 200, success: 'Cliente excluido com sucesso!' }
    } catch (error) {
      return this.clientRepository.statusCode500
    } finally {
      this.clientRepository.disconnectDatabase()
    }
  }
}
