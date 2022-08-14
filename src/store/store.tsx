import { configureStore } from "@reduxjs/toolkit"
import usersSlice from "../featured/users/usersSlice"

export const store = configureStore({
  reducer: {
    users: usersSlice,
  },
})