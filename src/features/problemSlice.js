import { createSlice } from '@reduxjs/toolkit';

export const problemsSlice = createSlice({
  name: 'problem',

  initialState: {
    isLoading: false,
    wordList: [],
    sentenceList: [],
    paragraphList: [],
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
    getParagraphList: (state) => {
      state.isLoading = true;
    },
    getParagraphListSuccess: (state, action) => {
      state.isLoading = false;
      state.paragraphList = [...action.payload];
    },
  },
});

export const {
  getWordList,
  getWordListSuccess,
  getSentenceList,
  getSentenceListSucces,
  getParagraphList,
  getParagraphListSuccess,
} = problemsSlice.actions;

export default problemsSlice.reducer;
