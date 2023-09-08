import { createSlice, configureStore } from '@reduxjs/toolkit';

export const user = createSlice({
  name: 'user',
  initialState: {
    'email': null,
    'password': null,
    'token': null,
    'isLogged': false
  },
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.token = action.payload.token;
      state.isLogged = action.payload.isLogged;
    },
  },
})

export const store = configureStore({
  reducer: {
    user: user.reducer
  }
})