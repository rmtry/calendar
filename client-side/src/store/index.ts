import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from "redux";
import {thunk} from "redux-thunk";
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import rootReducer from "./root-reducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

const middleware = applyMiddleware(thunk);

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, compose(middleware));


export const persistor = persistStore(store as any)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// Use throughout your app instead of plain `useDispatch` and `useSelector`
type DispatchFunc = () => AppDispatch
export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
