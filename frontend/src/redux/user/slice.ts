import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IUser {
  id: number
  firstName: string
  lastName: string
  cpf: string
  email: string
  phone: string
  dateCreated: string
  timeCreated: string
  birthDate: string
}

export interface IUserData {
  user: IUser
}

export const initialValueUser: IUser = {
  id: 0,
  firstName: '',
  lastName: '',
  cpf: '',
  email: '',
  phone: '',
  dateCreated: '',
  timeCreated: '',
  birthDate: '',
}

const initialState: IUserData = {
  user: initialValueUser,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserData: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    },
    userLogout: (state) => {
      state.user = initialValueUser
    },
  },
})

export const { addUserData, userLogout } = userSlice.actions
export const useUser = (state: any) => state.user as IUserData
