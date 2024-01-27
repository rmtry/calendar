import { combineReducers } from "redux";
import userReducer from "./reducers/user-reducer";

// combineReducers return the type of User Reducer as any for some reasons...
const rootReducer = combineReducers({
  userReducer
});

export default rootReducer;
