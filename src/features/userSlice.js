import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',

  initialState: {
    isRefreshing: false,
    isUserDataLoading: false,
    isLoggedIn: false,
    isPracticing: false,
    name: null,
    email: null,
    uid: null,
    soundEffects: null,
    selectedLanguage: null,
    hiscore: null,
  },

  reducers: {
    login: (state) => {
      state.isUserDataLoading = true;
    },
    loginSuccess: (state, action) => {
      state.isUserDataLoading = false;
      state.isLoggedIn = true;
      state.name = action.payload?.name;
      state.email = action.payload?.email;
      state.uid = action.payload?._id;
      state.soundEffects = action.payload?.soundEffects;
      state.selectedLanguage = action.payload?.selectedLanguage;
      state.hiscore = action.payload?.hiscore;
    },
    logout: (state) => {
      state.isUserDataLoading = true;
    },
    logoutSuccess: (state) => {
      state.isUserDataLoading = false;
      state.isLoggedIn = false;
      state.name = null;
      state.email = null;
      state.uid = null;
      state.soundEffects = null;
      state.selectedLanguage = null;
    },
    loginFailure: (state) => {
      state.isUserDataLoading = false;
      state.isLoggedIn = false;
    },
    changeSetting: (state, action) => {
      state.soundEffects = action.payload?.soundEffectsSetting;
      state.selectedLanguage = action.payload?.selectedLanguageSetting;
    },
    loadUserDbData: (state) => {
      state.isUserDataLoading = true;
    },
    loadUserDbDataSuccess: (state, action) => {
      state.isUserDataLoading = false;
      state.isLoggedIn = true;
      state.name = action.payload?.name;
      state.email = action.payload?.email;
      state.uid = action.payload?._id;
      state.soundEffects = action.payload?.soundEffects;
      state.selectedLanguage = action.payload?.selectedLanguage;
      state.hiscore = action.payload?.hiscore;
    },
    startPractice: (state) => {
      state.isPracticing = true;
    },
    finishPractice: (state) => {
      state.isPracticing = false;
    },
    startRefresh: (state) => {
      state.isRefreshing = true;
    },
    finishRefresh: (state) => {
      state.isRefreshing = false;
    },
  },
});

export const {
  login,
  loginSuccess,
  loginFailure,
  logout,
  logoutSuccess,
  changeSetting,
  loadUserDbData,
  loadUserDbDataSuccess,
  startPractice,
  finishPractice,
  startRefresh,
  finishRefresh,
} = userSlice.actions;
export default userSlice.reducer;
