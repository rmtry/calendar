"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = __importDefault(require("@mui/material/Card"));
const CardActions_1 = __importDefault(require("@mui/material/CardActions"));
const CardContent_1 = __importDefault(require("@mui/material/CardContent"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
exports.default = (props) => {
    return (<div style={{
            display: "flex",
            flexDirection: "column",
            width: "20%",
            padding: "2rem",
        }}>
      <Card_1.default style={{
            flexDirection: "column",
            height: "12.5rem",
            justifyContent: "space-between",
        }} sx={{ minWidth: "7.5rem" }} key={`event-${props.index}`}>
        <CardContent_1.default style={{
            flexDirection: "column",
            alignItems: "center",
            flexGrow: 4,
            justifyContent: "space-between",
        }}>
          <Typography_1.default variant="h5" component="div">
            {props.index + 1}. {props.event.summary}
          </Typography_1.default>
          <Typography_1.default sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.event.organizer.email}
          </Typography_1.default>
        </CardContent_1.default>
        <CardActions_1.default style={{ flexGrow: 1 }}>
          <button onClick={props.onClickAction}>Learn More</button>
        </CardActions_1.default>
      </Card_1.default>
    </div>);
};
//# sourceMappingURL=Card.js.map