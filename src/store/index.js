import { createSlice, configureStore } from '@reduxjs/toolkit';

export const user = createSlice({
  name: 'user',
  initialState: {
    'email': '',
    'password': '',
    'token': ''
  },
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
      state.token = action.payload.token;

    },
  },
})

export const store = configureStore({
  reducer: {
    user: user.reducer
  }
})