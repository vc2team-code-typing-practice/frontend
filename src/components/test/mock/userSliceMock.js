import { createSlice } from '@reduxjs/toolkit';

const userSliceMock = createSlice({
  name: 'user',

  initialState: {
    isRefreshing: false,
    isUserDataLoading: false,
    isUserRecordLoading: false,
    isLoggedIn: true,
    isPracticing: false,
    isGuestUser: false,
    isColorWeaknessUser: false,
    name: 'testname',
    email: 'test1@gmail.com',
    uid: 'testUid',
    soundEffects: true,
    selectedLanguage: 'JavaScript',
    hiscore: 210,
    numberProblems: 20,
    history: [
      {
        typingSpeed: 300,
        accuracy: 100,
        time: '2022-06-18T01:23',
        type: 'sentence',
      },
      {
        typingSpeed: 346,
        accuracy: 100,
        time: '2022-06-18T01:32',
        type: 'sentence',
      },
      {
        typingSpeed: 180,
        accuracy: 61,
        time: '2022-06-18T01:28',
        type: 'sentence',
      },
    ],
  },

  reducers: {
    login: (state) => {
      state.isUserDataLoading = true;
    },
    anonymousLogin: (state) => {
      state.isUserDataLoading = true;
      state.isGuestUser = true;
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
      state.isColorWeaknessUser = action.payload?.isColorWeaknessUser;
    },
    logout: (state) => {
      state.isUserDataLoading = true;
      state.isGuestUser = false;
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
      state.isColorWeaknessUser = null;
    },
    loginFailure: (state) => {
      state.isUserDataLoading = false;
      state.isLoggedIn = false;
    },
    changeSetting: (state, action) => {
      state.soundEffects = action.payload?.soundEffectsSetting;
      state.selectedLanguage = action.payload?.selectedLanguageSetting;
      state.numberProblems = action.payload?.numberProblemsSetting;
      state.isColorWeaknessUser = action.payload?.colorWeaknessSetting;
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
      state.isColorWeaknessUser = action.payload?.isColorWeaknessUser;
    },
    setPracticeMode: (state) => {
      state.isPracticing = true;
    },
    unsetPracticeMode: (state) => {
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
      state.hiscore += action.payload.score;
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
  anonymousLogin,
  loginSuccess,
  loginFailure,
  logout,
  logoutSuccess,
  changeSetting,
  loadUserDbData,
  loadUserDbDataSuccess,
  setPracticeMode,
  unsetPracticeMode,
  startRefresh,
  finishRefresh,
  loadUserRecord,
  loadUserRecordSuccess,
  updateUserRecord,
} = userSliceMock.actions;
export default userSliceMock.reducer;
