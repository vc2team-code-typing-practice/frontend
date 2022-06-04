import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',

  initialState: {
    isLoading: false,
    isLogined: false,
    name: null,
    email: null,
    uid: null,
  },

  reducers: {
    login: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isLogined = true;
      state.name = action.payload.displayName;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
    },
    logout: (state) => {
      state.isLoading = true;
    },
    logoutSuccess: (state) => {
      state.isLoading = false;
      state.isLogined = false;
      state.name = null;
      state.email = null;
      state.uid = null;
    },
  },
});

export const { login, loginSuccess, logout, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;
