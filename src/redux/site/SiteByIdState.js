import { createSlice } from "@reduxjs/toolkit";

export const SiteByIdSlice = createSlice({
    name: "siteById",
    initialState: {
      siteData: {},
      loading: true,
      error: null,
      Id: null,
    },
    reducers: {
      setSiteById: (state, action) =>{
          state.siteData = action.payload;
          state.loading = false;
      },
      setLoadingTrue: (state) => {
        state.loading = true;
     },
     setSiteId: (state, action) => {
      state.Id = action.payload;
     }
    }
  });

  export const { setSiteById, setLoadingTrue ,setSiteId} = SiteByIdSlice.actions;
  export default SiteByIdSlice.reducer