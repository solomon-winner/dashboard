import { createSlice } from "@reduxjs/toolkit";

export const SiteByIdSlice = createSlice({
    name: "siteById",
    initialState: {
      siteData: {},
      loading: true,
      error: null,
    },
    reducers: {
      setSiteById: (state, action) =>{
          state.siteData = action.payload;
          state.loading = false;
      },
      setLoadingTrue: (state) => {
        state.loading = true;
     },
    }
  });

  export const { setSiteById, setLoadingTrue } = SiteByIdSlice.actions;
  export default SiteByIdSlice.reducer