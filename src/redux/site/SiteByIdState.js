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
      setLoading: (state) => {
        state.loading = false;
     },
     setSiteId: (state, action) => {
      state.Id = action.payload;
      console.log("state.Id ", state.Id)
     },
     deleteSiteData: (state, action) => {
        state.siteData = state.siteData.filter(site => site.id !== action.payload);
     }
    }
  });

  export const { setSiteById, setLoading, setSiteId, deleteSiteData} = SiteByIdSlice.actions;
  export default SiteByIdSlice.reducer