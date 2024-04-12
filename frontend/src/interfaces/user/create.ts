export interface ICreateUser {
  firstName: string
  lastName: string
  cpf: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  dateCreated: string
  timeCreated: string
  birthDate: string
}

export const initialValueCreateUser = {
  firstName: '',
  lastName: '',
  cpf: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  dateCreated: '',
  timeCreated: '',
  birthDate: '',
}
