import { createSlice } from '@reduxjs/toolkit';

export const problemsSlice = createSlice({
  name: 'problems',

  initialState: {
    problem: [],
  },

  reducers: {
    getProblemsList: (state, action) => {
      state.problem = action.payload;
    },
  },
});

export const { getProblemsList } = problemsSlice.actions;

export default problemsSlice.reducer;
