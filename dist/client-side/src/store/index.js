"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppSelector = exports.useAppDispatch = exports.persistor = exports.store = void 0;
const redux_1 = require("redux");
const redux_thunk_1 = require("redux-thunk");
const redux_persist_1 = require("redux-persist");
const storage_1 = __importDefault(require("redux-persist/lib/storage")); // defaults to localStorage for web
const root_reducer_1 = __importDefault(require("./root-reducer"));
const react_redux_1 = require("react-redux");
const middleware = (0, redux_1.applyMiddleware)(redux_thunk_1.thunk);
const persistConfig = {
    key: 'root',
    storage: storage_1.default,
};
const persistedReducer = (0, redux_persist_1.persistReducer)(persistConfig, root_reducer_1.default);
exports.store = (0, redux_1.legacy_createStore)(persistedReducer, (0, redux_1.compose)(middleware));
exports.persistor = (0, redux_persist_1.persistStore)(exports.store);
exports.useAppDispatch = react_redux_1.useDispatch;
exports.useAppSelector = react_redux_1.useSelector;
//# sourceMappingURL=index.js.map