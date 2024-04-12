import { configureStore } from '@reduxjs/toolkit'
import accountAcessReducer from './accountAccess/reducer'
import userReducer from './user/reducer'

const store = configureStore({
  reducer: {
    accountAccess: accountAcessReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
