import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      return {
        ...state,
        uid: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveUser } = authSlice.actions;

export default authSlice.reducer;
