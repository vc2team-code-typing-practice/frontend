import { createSlice } from '@reduxjs/toolkit';

export const problemsSlice = createSlice({
  name: 'problem',

  initialState: {
    isLoading: false,
    wordList: [],
  },

  reducers: {
    getWordList: (state) => {
      state.isLoading = true;
    },
    getWordListSuccess: (state, action) => {
      state.isLoading = false;
      state.wordList = [...action.payload];
    },
  },
});

export const { getWordList, getWordListSuccess } = problemsSlice.actions;

export default problemsSlice.reducer;
