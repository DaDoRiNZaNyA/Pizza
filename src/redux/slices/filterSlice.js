import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  pageCount: 1,
  sort: {
    name: "популярности ↓",
    sort: "rating",
    order: "desc",
  },
  searchValue: "",
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSortType(state, action) {
      state.sort = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    },
    setFilters(state, action) {
      const { sort, categoryId, pageCount } = action.payload;
      state.sort = sort;
      state.categoryId = categoryId;
      state.pageCount = pageCount;
    },
  },
});

export const {
  setCategoryId,
  setSortType,
  setSearchValue,
  setPageCount,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
