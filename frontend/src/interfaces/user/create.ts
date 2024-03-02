export interface ICreateUser {
  fullName: string
  cpf: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

export const initialValueCreateUser = {
  fullName: '',
  cpf: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
}
