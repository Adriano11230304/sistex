import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const userSlice = createSlice({
  name: "user",
  initialState: {user: null, loading: false},
  reducers: {
    logado(state) {
      state.user = 1;
    },
    naoLogado(state) {
      state.user = 0;
    },
  },
});