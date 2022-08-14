import { createAsyncThunk } from "@reduxjs/toolkit"

const base_url = `https://frontend-test-assignment-api.abz.agency/api/v1/users`
const TOKEN_URL = 'https://frontend-test-assignment-api.abz.agency/api/v1/token'

//# Fetching users
export const getUsers: any = createAsyncThunk('users/getUsers', async (action) => {
  try {
    const response = await fetch(base_url + action)
    const result = await response.json()
    return result
  } catch (e) {
    console.log("Error!", e)
  }
})

//# Post user
export const postUser = createAsyncThunk("users/postUser", async (action) => {
  const response = await fetch(base_url, {
    method: "POST",
    body: JSON.stringify(action),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
  const result = await response.json()
  return result
})

//# Get and save token
export const getToken = createAsyncThunk('users/getToken', async () => {
  try {
    const response = await fetch(TOKEN_URL)
    const result = await response.json()
    return result.token
  } catch (error) {
    console.log('getTheToken api error: ', error);
  }
})