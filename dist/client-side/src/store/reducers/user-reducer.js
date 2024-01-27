"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_actions_1 = require("../actions/user-actions");
const immer_1 = require("immer");
const initialState = {
    tokens: undefined,
    email: undefined,
};
const userReducer = (0, immer_1.produce)((draft, action) => {
    const { type, payload } = action;
    switch (type) {
        case user_actions_1.USER_LOGIN:
            draft.tokens = payload.token;
            draft.email = payload.email;
            break;
        case user_actions_1.USER_LOGOUT:
            draft.tokens = undefined;
            draft.email = undefined;
            break;
        case user_actions_1.UPDATE_USER_TOKENS:
            draft.tokens = payload;
            break;
        case user_actions_1.UPDATE_USER_EMAIL:
            draft.email = payload;
            break;
    }
}, initialState);
exports.default = userReducer;
//# sourceMappingURL=user-reducer.js.map