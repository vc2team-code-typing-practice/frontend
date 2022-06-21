import { createSlice } from '@reduxjs/toolkit';

export const problemsSliceMock = createSlice({
  name: 'problem',

  initialState: {
    isLoading: false,
    wordList: ['for', 'console.log', 'const'],
    sentenceList: [
      'while (true) {}',
      'const arr = [];',
      'const testArr = [1, 3, 2, 6];',
    ],
    paragraphList: [
      'function foo () {return 123;}',
      'function foo () {return 123;}',
      'function foo () {return 123;}',
    ],
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
} = problemsSliceMock.actions;

export default problemsSliceMock.reducer;
