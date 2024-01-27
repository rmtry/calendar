import { GetState } from "../root-reducer.type";
import axios from "axios";

export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";

export const UPDATE_USER_EMAIL = "UPDATE_USER_EMAIL";
export const UPDATE_USER_TOKENS = "UPDATE_USER_TOKENS";

export const updateUserEmail = (payload: string) => ({
  type: UPDATE_USER_EMAIL,
  payload,
});

export const updateUserTokens = (payload: any) => ({
  type: UPDATE_USER_TOKENS,
  payload,
});

export const doLogin =
  (code: string) => async (dispatch: any, getState: GetState) => {
    const {
      userReducer: { tokens },
    } = getState();

    if (code && !tokens) {
      const response = await axios.post("http://localhost:3000/verify-code", {
        code,
      });
      if (response.data.email) {
        dispatch(updateUserEmail(response.data.email));
        dispatch(updateUserTokens(response.data.tokens));
      }
      return response.data;
    }
    return undefined;
  };

export const doLogout = () => ({
  type: USER_LOGOUT,
});
