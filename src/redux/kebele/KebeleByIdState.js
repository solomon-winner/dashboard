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
    deleteKebele: (state, action) => {
        state.kebeleData = state.kebeleData.filter(kebele => kebele.id !== action.payload);
    } 
  }
});
export const {setKebeleById, deleteKebele } = KebeleByIdSlice.actions;
export default KebeleByIdSlice.reducer