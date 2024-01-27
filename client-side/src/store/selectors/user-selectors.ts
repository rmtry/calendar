import { createSelector } from "reselect";
import { RootReducerType } from "../root-reducer.type";

const getUserReducer = (state: RootReducerType) => state.userReducer;

export const getUserTokens = createSelector(
  getUserReducer,
  (userReducer) => userReducer?.tokens
);

export const getUserEmail = createSelector(
  getUserReducer,
  (userReducer) => userReducer?.email
);
