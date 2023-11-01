import { Injectable } from '@nestjs/common'
import { Client } from 'pg'

@Injectable()
export class Database {
  protected client: Client
  protected messageStatus500: object = { message500: 'Ocorreu um erro inesperado!' }

  async connectDatabase() {
    try {
      this.client = new Client(process.env.DATABASE)
      await this.client.connect()
      console.log('Conectado ao banco de dados!')
    } catch (error) {
      console.log('Erro ao conectar com o banco de dados!')
    }
  }

  async disconnectDatabase() {
    this.client.end()
    console.log('Desconectado do banco de dados!')
  }
}
