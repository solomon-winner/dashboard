import { createSlice } from "@reduxjs/toolkit";

export const KebeleByIdSlice = createSlice({
  name: "kebeleById",
  initialState: {
    kebeleData: {},
    loading: false,
    error: null,
  },
  reducers: {
    setKebeleById: (state, action) =>{
        state.kebeleData = action.payload;
        state.loading = false;
    },
  }
});
export const {setKebeleById } = KebeleByIdSlice.actions;
export default KebeleByIdSlice.reducer