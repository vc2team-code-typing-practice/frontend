import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',

  initialState: {
    isRefreshing: false,
    isUserDataLoading: false,
    isUserRecordLoading: false,
    isLoggedIn: false,
    isPracticing: false,
    name: null,
    email: null,
    uid: null,
    soundEffects: null,
    selectedLanguage: null,
    hiscore: null,
    numberProblems: null,
    history: [],
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
      state.numberProblems = action.payload?.numberProblems;
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
      state.numberProblems = null;
    },
    loginFailure: (state) => {
      state.isUserDataLoading = false;
      state.isLoggedIn = false;
    },
    changeSetting: (state, action) => {
      state.soundEffects = action.payload?.soundEffectsSetting;
      state.selectedLanguage = action.payload?.selectedLanguageSetting;
      state.numberProblems = action.payload?.numberProblemsSetting;
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
      state.numberProblems = action.payload?.numberProblems;
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
    loadUserRecord: (state) => {
      state.isUserRecordLoading = true;
    },
    loadUserRecordSuccess: (state, action) => {
      state.isUserRecordLoading = false;
      state.history = action.payload;
    },
    updateUserRecord: (state, action) => {
      state.history = [
        ...state.history,
        {
          type: action.payload.type,
          typingSpeed: action.payload.typingSpeed,
          time: action.payload.time,
          accuracy: action.payload.accuracy,
        },
      ];
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
  loadUserRecord,
  loadUserRecordSuccess,
  updateUserRecord,
} = userSlice.actions;
export default userSlice.reducer;
