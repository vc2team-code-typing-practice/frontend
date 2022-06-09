import { createSlice } from '@reduxjs/toolkit';

export const problemsSlice = createSlice({
  name: 'problem',

  initialState: {
    isLoading: false,
    wordList: [],
    sentenceList: [],
  },

  reducers: {
    getWordList: (state) => {
      state.isLoading = true;
    },
    getWordListSuccess: (state, action) => {
      state.isLoading = false;
      state.wordList = [...action.payload];
    },
    getSentenceList: (state) => {
      state.isLoading = true;
    },
    getSentenceListSucces: (state, action) => {
      state.isLoading = false;
      state.sentenceList = [...action.payload];
    },
  },
});

export const {
  getWordList,
  getWordListSuccess,
  getSentenceList,
  getSentenceListSucces,
} = problemsSlice.actions;

export default problemsSlice.reducer;
