export interface IClient {
  id: number
  firstName: string
  lastName: string
  cpf: string
  phone: string
  email: string
  dateCreated: string
  timeCreated: string
  birthDate: string
  isAdmin: boolean
  hashpassword?: string
}
