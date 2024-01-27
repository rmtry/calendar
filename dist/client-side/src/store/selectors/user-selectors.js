"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserEmail = exports.getUserTokens = void 0;
const reselect_1 = require("reselect");
const getUserReducer = (state) => state.userReducer;
exports.getUserTokens = (0, reselect_1.createSelector)(getUserReducer, (userReducer) => userReducer === null || userReducer === void 0 ? void 0 : userReducer.tokens);
exports.getUserEmail = (0, reselect_1.createSelector)(getUserReducer, (userReducer) => userReducer === null || userReducer === void 0 ? void 0 : userReducer.email);
//# sourceMappingURL=user-selectors.js.map