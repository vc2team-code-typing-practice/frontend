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
    getUser: (state) => {
      state.isLoading = true;
    },
    getUserSuccess: (state, action) => {
      state.isLoading = false;
      state.isLogined = true;
      state.name = action.payload.displayName;
      state.email = action.payload.email;
      state.uid = action.payload.uid;
    },
  },
});

export const { getUser, getUserSuccess } = userSlice.actions;
export default userSlice.reducer;
