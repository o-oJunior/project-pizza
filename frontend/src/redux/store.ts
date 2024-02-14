import { configureStore } from '@reduxjs/toolkit'
import accountAcessReducer from './accountAccess/reducer'

const store = configureStore({
  reducer: {
    accountAccess: accountAcessReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
