import instance from "@/axios";
import { TestType } from "@/components/TestsComponent/testType";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { saveCompletedTestLS } from "@/utils/saveCompletedTests";

export const fetchTests = createAsyncThunk(
  "tests/fetchTests",
  async (category: string) => {
    const activeCategory = category !== "Все" ? `category=${category}` : "";
    try {
      const { data } = await instance.get(
        `/tests?${activeCategory.toLowerCase()}`
      );

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

interface initialStateInterface {
  tests: {
    items: TestType[];
    status: string;
    completedTests: Record<number, boolean>;
  };
}

const initialState: initialStateInterface = {
  tests: {
    items: [],
    status: "loading",
    completedTests: {},
  },
};

const testsSlice = createSlice({
  name: "tests",
  initialState,
  reducers: {
    setCompleted: (
      state,
      action: PayloadAction<number | Record<number, boolean>>
    ) => {
      if (typeof action.payload === "number") {
        state.tests.completedTests[action.payload] = true;
      } else {
        state.tests.completedTests = action.payload;
      }
      saveCompletedTestLS(state.tests.completedTests);
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchTests.pending, (state) => {
      (state.tests.items = []), (state.tests.status = "loading");
    });
    builder.addCase(fetchTests.fulfilled, (state, action) => {
      (state.tests.items = action.payload), (state.tests.status = "loaded");
    });
    builder.addCase(fetchTests.rejected, (state) => {
      (state.tests.items = []), (state.tests.status = "error");
    });
  },
});

export const statusSelector = (state: RootState) => state.tests.tests.status;
export const testsSelector = (state: RootState) => state.tests.tests.items;
export const completedTestsSelector = (state: RootState) =>
  state.tests.tests.completedTests;

export const { setCompleted } = testsSlice.actions;

export default testsSlice.reducer;
