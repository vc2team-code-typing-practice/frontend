import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',

  initialState: {
    isLoading: false,
    isLoggedIn: false,
    name: null,
    email: null,
    uid: null,
    soundEffects: null,
    selectedLanguage: null,
    hiscore: null,
  },

  reducers: {
    login: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.name = action.payload?.name;
      state.email = action.payload?.email;
      state.uid = action.payload?._id;
      state.soundEffects = action.payload?.soundEffects;
      state.selectedLanguage = action.payload?.selectedLanguage;
      state.hiscore = action.payload?.hiscore;
    },
    logout: (state) => {
      state.isLoading = true;
    },
    logoutSuccess: (state) => {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.name = null;
      state.email = null;
      state.uid = null;
      state.soundEffects = null;
      state.selectedLanguage = null;
    },
    changeSetting: (state, action) => {
      state.soundEffects = action.payload?.soundEffectsSetting;
      state.selectedLanguage = action.payload?.selectedLanguageSetting;
    },
    loadUserDbData: (state) => {
      state.isLoading = true;
    },
    loadUserDbDataSuccess: (state, action) => {
      state.isLoading = false;
      state.isLoggedIn = true;
      state.name = action.payload?.name;
      state.email = action.payload?.email;
      state.uid = action.payload?._id;
      state.soundEffects = action.payload?.soundEffects;
      state.selectedLanguage = action.payload?.selectedLanguage;
      state.hiscore = action.payload?.hiscore;
    },
  },
});

export const {
  login,
  loginSuccess,
  logout,
  logoutSuccess,
  changeSetting,
  loadUserDbData,
  loadUserDbDataSuccess,
} = userSlice.actions;
export default userSlice.reducer;
