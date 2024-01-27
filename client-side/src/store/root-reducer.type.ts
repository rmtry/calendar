import { UserReducerType } from "./reducers/user-reducer.type";

export interface RootReducerType {
  userReducer: UserReducerType;
}

export type GetState = () => RootReducerType;
