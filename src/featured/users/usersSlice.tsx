import { createSlice } from "@reduxjs/toolkit";
import { UserProps } from "../../components/Main/Main";
import { getToken, getUsers, postUser } from "./requests";

interface State {
  usersArray: UserProps[],
  page: number,
  total_pages: number,
  userAdded: boolean
  token: string,
}
interface Store {
  users: State
}
// Whole state
const initialState: State = {
  usersArray: [],
  page: 1,
  userAdded: false,
  total_pages: 0,
  token: ''
}


export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    showMore(state) {
      state.page += 1
    },
    userAdded(state) {
      state.usersArray = []
      state.page = 1
      state.userAdded = true
    }
  },
  extraReducers: (builber) => {
    builber
      // $ Get Users
      .addCase(getUsers.fulfilled, (state, action) => {
        //! Set total pages
        state.total_pages = action.payload.total_pages
        //! Get users array
        const newArray = action.payload.users
        newArray.forEach((item: UserProps) =>
          state.usersArray.find((user: UserProps) => user.id === item.id)
            ? item
            : state.usersArray.push(item)
        )
        state.usersArray.sort((a: { registration_timestamp: number; }, b: { registration_timestamp: number; }) => a.registration_timestamp < b.registration_timestamp ? 1 : -1)
      })
      // $ Post User
      .addCase(postUser.fulfilled, (state, action) => {
        state.usersArray.push(action.payload)
      })
      // $ Set token
      .addCase(getToken.fulfilled, (state, action) => {
        state.token = action.payload
      })
  }
})


export const { showMore, userAdded } = usersSlice.actions

export const selectAllUsers = (state: Store) => state.users.usersArray
export const selectPage = (state: Store) => state.users.page
export const isVisible = (state: Store) => state.users.page !== state.users.total_pages
export const isAdded = (state: Store) => state.users.userAdded


export default usersSlice.reducer