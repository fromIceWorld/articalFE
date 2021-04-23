import { createSelector } from "@ngrx/store";
import { userState } from "./../reducers/login.reducer";

const selectUserStates = (state: userState) => state;

export const getUserInfo = createSelector(
  selectUserStates,
  (state: userState) => state.userInfo
);
