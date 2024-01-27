"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./index.css");
const App_1 = __importDefault(require("./App"));
const react_redux_1 = require("react-redux");
const react_dom_1 = require("react-dom");
const index_1 = require("./store/index");
const react_2 = require("redux-persist/integration/react");
const Index = () => {
    return (<react_1.default.StrictMode>
      <react_redux_1.Provider store={index_1.store}>
        <react_2.PersistGate loading={null} persistor={index_1.persistor}>
          <App_1.default />
        </react_2.PersistGate>
      </react_redux_1.Provider>
    </react_1.default.StrictMode>);
};
(0, react_dom_1.render)(<Index />, document.getElementById("root"));
//# sourceMappingURL=index.js.map