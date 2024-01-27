"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
require("./App.css");
const user_actions_1 = require("./store/actions/user-actions");
const store_1 = require("./store");
const axios_1 = __importDefault(require("axios"));
const user_selectors_1 = require("./store/selectors/user-selectors");
const Card_1 = __importDefault(require("./components/Card"));
const Popup_1 = __importDefault(require("./components/Popup"));
const material_1 = require("@mui/material");
const react_redux_1 = require("react-redux");
const API_ROOT = "http://localhost:3000";
function App() {
    const dispatch = (0, store_1.useAppDispatch)();
    const tokens = (0, store_1.useAppSelector)(user_selectors_1.getUserTokens);
    const userEmail = (0, react_redux_1.useSelector)(user_selectors_1.getUserEmail);
    const [events, setEvents] = (0, react_1.useState)([]);
    (0, react_1.useEffect)(() => {
        const code = new URL(window.location.href).searchParams.get("code");
        if (code && !tokens) {
            axios_1.default
                .post(`${API_ROOT}/verify-code`, {
                code,
            })
                .then((res) => {
                var _a;
                dispatch((0, user_actions_1.updateUserTokens)(res.data.tokens));
                dispatch((0, user_actions_1.updateUserEmail)(res.data.userEmail));
                setEvents((_a = res.data.events) === null || _a === void 0 ? void 0 : _a.items);
            })
                .catch((err) => {
                console.error("auth error:", err);
            });
        }
        else {
            axios_1.default
                .post(`${API_ROOT}/events`, {
                tokens,
            })
                .then((res) => {
                var _a;
                setEvents((_a = res.data.events) === null || _a === void 0 ? void 0 : _a.items);
            })
                .catch((err) => {
                console.error("get events error, token is maybe expired:", err);
                dispatch((0, user_actions_1.doLogout)());
            });
        }
    }, []);
    const login = () => __awaiter(this, void 0, void 0, function* () {
        window.location.href = `${API_ROOT}/login`;
    });
    const renderItems = (event, index) => {
        const onClickAction = () => {
            if (events && events[index]) {
                setSelectedEvent(events[index]);
                handleClickOpen();
            }
        };
        return <Card_1.default event={event} index={index} onClickAction={onClickAction}/>;
    };
    const [open, setOpen] = react_1.default.useState(false);
    const [selectedEvent, setSelectedEvent] = (0, react_1.useState)(undefined);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const logout = () => {
        dispatch((0, user_actions_1.doLogout)());
        setEvents([]);
    };
    const removeAccount = () => __awaiter(this, void 0, void 0, function* () {
        window.confirm("Remove this account from Database?") &&
            axios_1.default
                .delete(`${API_ROOT}/user?email=${userEmail}&&id_token=${tokens.id_token}`)
                .then(() => logout())
                .catch((err) => {
                console.log(err);
                logout();
            });
    });
    return (<div className="App">
      <div style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.85)",
            alignItems: "center",
            justifyContent: "center",
            display: !tokens ? "flex" : "none",
        }}>
        {!tokens && (<material_1.Button style={{ width: "6rem", height: "3rem", backgroundColor: "cyan" }} onClick={login}>
            Login
          </material_1.Button>)}
      </div>
      {events && events.length > 0 && (<div style={{
                backgroundColor: "black",
                display: "flex",
                flexDirection: "row",
                width: "100%",
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
                flexWrap: "wrap",
            }}>
          {events.map((e, i) => renderItems(e, i))}
        </div>)}
      {tokens && (<div style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                padding: "1rem",
            }}>
          <material_1.Button style={{ width: "6rem", height: "3rem", backgroundColor: "cyan" }} onClick={logout}>
            Log out
          </material_1.Button>
          <div style={{ width: "1rem" }}/>
          <material_1.Button style={{
                width: "10rem",
                height: "3rem",
                backgroundColor: "red",
                color: "white",
            }} onClick={removeAccount}>
            Delete Account
          </material_1.Button>
        </div>)}
      <Popup_1.default selectedValue={selectedEvent} open={open} onClose={handleClose}/>
    </div>);
}
exports.default = App;
//# sourceMappingURL=App.js.map