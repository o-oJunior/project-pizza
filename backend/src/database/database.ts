import { Client } from 'pg'
export class Database {
  protected client: Client
  statusCode500: object = { statusCode: 500, error: 'Ocorreu um erro inesperado!' }

  protected async connectDatabase() {
    try {
      this.client = new Client(process.env.DATABASE)
      await this.client.connect()
      console.log('Conectado ao banco de dados!')
    } catch (error) {
      console.log('Erro ao conectar com o banco de dados!')
    }
  }

  protected async disconnectDatabase() {
    this.client.end()
    console.log('Desconectado do banco de dados!')
  }
}
