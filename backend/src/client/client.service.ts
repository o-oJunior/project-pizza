import { Injectable } from '@nestjs/common'
import { ClientRepository } from './repositories/client.repository'
import { CreateClientDto } from './dto/createClient.dto'
import { isExists } from './validations/isExists'
import { UpdateClientDto } from './dto/updateClient.dto'
import { AuthClientDto } from './dto/authClient.dto'
import { IClient } from './interfaces/client'
import { IValidationRules } from './interfaces/validationRules'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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
        return { statusCode: 404, error: 'Usuário não foi encontrado!' }
      }
      return { statusCode: 200, data: clientFormated }
    } catch (error) {
      return this.clientRepository.statusCode500
    }
  }

  async createClient(createClientDto: CreateClientDto): Promise<object> {
    const saltRounds = 10
    const hash = await bcrypt.hash(createClientDto.password, saltRounds)
    createClientDto.hashPassword = hash
    try {
      const cpf: object = await this.clientRepository.getClientByCPF(createClientDto.cpf)
      const email: object = await this.clientRepository.getClientByEMAIL(createClientDto.email)
      const checkCPF: object = isExists(cpf, 'cpf')
      const checkEmail: object = isExists(email, 'email')
      if (checkCPF || checkEmail) {
        return checkCPF || checkEmail
      }
      await this.clientRepository.createClient(createClientDto)
      return { statusCode: 201, message: 'Conta criada com sucesso!' }
    } catch (error) {
      return this.clientRepository.statusCode500
    }
  }

  async validateToken(token: any) {
    try {
      const privateKey = process.env.PRIVATE_KEY
      const decoded = await jwt.verify(token, privateKey)
      if (decoded) {
        return { statusCode: 200, data: decoded }
      }
    } catch (error) {
      return { statusCode: 401, message: 'Token inválido!' }
    }
  }

  async authClient(authClientDto: AuthClientDto): Promise<object> {
    try {
      const authClientUser = authClientDto.user
      const authClientPassword = authClientDto.password
      const valueUserFormated = authClientUser.replace(/[.-]/g, '')
      const isNumeric = /^\d+$/.test(valueUserFormated)
      const type = isNumeric && (authClientUser.length == 14 || authClientUser.length == 11) ? 'cpf' : 'email'
      const validations: IValidationRules = {
        cpf: await this.clientRepository.getClientByCPF(authClientUser),
        email: await this.clientRepository.getClientByEMAIL(authClientUser),
      }
      const getUser = validations[type]
      if (Object.keys(getUser).length === 0) {
        return { statusCode: 404, message: 'Usuário não foi encontrado!' }
      }
      const clientUser: IClient = Object.values(getUser).find((user) => user)
      const passwordIsValid = await bcrypt.compare(authClientPassword, clientUser.hashpassword)
      if (passwordIsValid) {
        const data = await this.clientRepository.getClientByID(clientUser.id)
        const dataFormated = Object.values(data).map((value) => {
          value.dateCreated = value.datecreated
          value.timeCreated = value.timecreated
          delete value.hashpassword
          delete value.datecreated
          delete value.timecreated
          return value
        })
        const response: IClient = Object.values(dataFormated).find((user) => user)
        const privateKey = process.env.PRIVATE_KEY
        const token = jwt.sign(response, privateKey, { expiresIn: '30d' })
        return { statusCode: 200, data: response, token }
      } else {
        return { statusCode: 401, message: 'Senha incorreta!' }
      }
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
        return { statusCode: 400, error: 'Erro ao atualizar o usuário!' }
      }
      const checkUser = isExists(results, 'usuário')
      if (!checkUser) {
        return { statusCode: 404, error: 'Usuário não encontrado!' }
      }
      const response: any = await this.clientRepository.updateClientByID(id, updateClientDto)
      if (response.statusCode === 500) {
        return this.clientRepository.statusCode500
      }
      return { statusCode: 200, message: 'Usuário alterado com sucesso!' }
    } catch (error) {
      return this.clientRepository.statusCode500
    }
  }

  async deleteClientByID(id: number): Promise<object> {
    try {
      await this.clientRepository.deleteClientByID(id)
      return { statusCode: 200, message: 'Usuário excluido com sucesso!' }
    } catch (error) {
      return this.clientRepository.statusCode500
    }
  }
}
