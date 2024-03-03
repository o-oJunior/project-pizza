export interface ICreateUser {
  name: string
  cpf: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  dateCreated: string
  timeCreated: string
}

export const initialValueCreateUser = {
  name: '',
  cpf: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  dateCreated: '',
  timeCreated: '',
}
