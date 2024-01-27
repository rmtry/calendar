"use strict";
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
exports.doLogout = exports.doLogin = exports.updateUserTokens = exports.updateUserEmail = exports.UPDATE_USER_TOKENS = exports.UPDATE_USER_EMAIL = exports.USER_LOGOUT = exports.USER_LOGIN = void 0;
const axios_1 = __importDefault(require("axios"));
exports.USER_LOGIN = "USER_LOGIN";
exports.USER_LOGOUT = "USER_LOGOUT";
exports.UPDATE_USER_EMAIL = "UPDATE_USER_EMAIL";
exports.UPDATE_USER_TOKENS = "UPDATE_USER_TOKENS";
const updateUserEmail = (payload) => ({
    type: exports.UPDATE_USER_EMAIL,
    payload,
});
exports.updateUserEmail = updateUserEmail;
const updateUserTokens = (payload) => ({
    type: exports.UPDATE_USER_TOKENS,
    payload,
});
exports.updateUserTokens = updateUserTokens;
const doLogin = (code) => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
    const { userReducer: { tokens }, } = getState();
    if (code && !tokens) {
        const response = yield axios_1.default.post("http://localhost:3000/verify-code", {
            code,
        });
        if (response.data.email) {
            dispatch((0, exports.updateUserEmail)(response.data.email));
            dispatch((0, exports.updateUserTokens)(response.data.tokens));
        }
        return response.data;
    }
    return undefined;
});
exports.doLogin = doLogin;
const doLogout = () => ({
    type: exports.USER_LOGOUT,
});
exports.doLogout = doLogout;
//# sourceMappingURL=user-actions.js.map