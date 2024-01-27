import {
  USER_LOGIN,
  USER_LOGOUT,
  UPDATE_USER_TOKENS,
  UPDATE_USER_EMAIL,
} from "../actions/user-actions";
import { ReduxAction } from "../redux.type";
import { UserReducerType } from "./user-reducer.type";
import { produce } from "immer";

const initialState: UserReducerType = {
  tokens: undefined,
  email: undefined,
};

const userReducer = produce((draft: UserReducerType, action: ReduxAction) => {
  const { type, payload } = action;

  switch (type) {
    case USER_LOGIN:
      draft.tokens = payload.token;
      draft.email = payload.email;
      break;
    case USER_LOGOUT:
      draft.tokens = undefined;
      draft.email = undefined;
      break;
    case UPDATE_USER_TOKENS:
      draft.tokens = payload;
      break;
    case UPDATE_USER_EMAIL:
      draft.email = payload;
      break;
  }
}, initialState);

export default userReducer;
