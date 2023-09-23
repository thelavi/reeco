import { combineReducers } from "@reduxjs/toolkit";
import { ReecoReducer } from "./Slices";
const reducer = combineReducers({
  ReecoDetails: ReecoReducer,
});

export type RootState = ReturnType<typeof reducer>;
export default reducer;
