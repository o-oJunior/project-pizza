import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface IAccountAccess {
  modal: boolean
  hasAccount: boolean
}

const initialState: IAccountAccess = {
  modal: false,
  hasAccount: false,
}

export const accountAccessSlice = createSlice({
  name: 'accountAccess',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<boolean>) => {
      state.modal = action.payload
    },
    manageAccountAccess: (state, action: PayloadAction<boolean>) => {
      state.hasAccount = action.payload
    },
  },
})

export const { openModal, manageAccountAccess } = accountAccessSlice.actions

export const useAccountAccess = (state: any) => state.accountAccess as IAccountAccess
