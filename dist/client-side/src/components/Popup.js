"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const List_1 = __importDefault(require("@mui/material/List"));
const ListItem_1 = __importDefault(require("@mui/material/ListItem"));
const ListItemText_1 = __importDefault(require("@mui/material/ListItemText"));
const DialogTitle_1 = __importDefault(require("@mui/material/DialogTitle"));
const Dialog_1 = __importDefault(require("@mui/material/Dialog"));
exports.default = (props) => {
    const { onClose, selectedValue, open } = props;
    const handleClose = () => {
        onClose();
    };
    return (<Dialog_1.default onClose={handleClose} open={open}>
      <DialogTitle_1.default>Event details</DialogTitle_1.default>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <List_1.default sx={{ pt: 0 }}>
          <ListItem_1.default>
            <ListItemText_1.default>Summary</ListItemText_1.default>
          </ListItem_1.default>
          <ListItem_1.default>
            <ListItemText_1.default>Date</ListItemText_1.default>
          </ListItem_1.default>
          <ListItem_1.default style={{ height: "7.5rem" }}>
            <ListItemText_1.default>Attendees</ListItemText_1.default>
          </ListItem_1.default>
          <ListItem_1.default>
            <ListItemText_1.default>Location</ListItemText_1.default>
          </ListItem_1.default>
          <ListItem_1.default>
            <ListItemText_1.default>Description</ListItemText_1.default>
          </ListItem_1.default>
          <ListItem_1.default>
            <ListItemText_1.default>Organizer</ListItemText_1.default>
          </ListItem_1.default>
          <ListItem_1.default>
            <ListItemText_1.default>Created</ListItemText_1.default>
          </ListItem_1.default>
          <ListItem_1.default>
            <ListItemText_1.default>Updated</ListItemText_1.default>
          </ListItem_1.default>
        </List_1.default>
        <List_1.default sx={{ pt: 0 }}>
          <ListItem_1.default>
            <ListItemText_1.default>{selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.summary}</ListItemText_1.default>
          </ListItem_1.default>
          <ListItem_1.default>
            <ListItemText_1.default>
              {(selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.start.dateTime) &&
            new Date(selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.start.dateTime).toLocaleString()}
            </ListItemText_1.default>
          </ListItem_1.default>
          <ListItem_1.default style={{ height: "7.5rem" }}>
            <ListItemText_1.default>
              {selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.attendees.map((a) => a.email).join(", ")}
            </ListItemText_1.default>
          </ListItem_1.default>
          <ListItem_1.default>
            <ListItemText_1.default>{selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.hangoutLink}</ListItemText_1.default>
          </ListItem_1.default>
          <ListItem_1.default>
            <ListItemText_1.default>
              {(selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.description) || "No description provided"}
            </ListItemText_1.default>
          </ListItem_1.default>
          <ListItem_1.default>
            <ListItemText_1.default>{selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.organizer.email}</ListItemText_1.default>
          </ListItem_1.default>
          <ListItem_1.default>
            <ListItemText_1.default>
              {(selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.created) &&
            new Date(selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.created).toLocaleString()}
            </ListItemText_1.default>
          </ListItem_1.default>
          <ListItem_1.default>
            <ListItemText_1.default>
              {(selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.updated) &&
            new Date(selectedValue === null || selectedValue === void 0 ? void 0 : selectedValue.updated).toLocaleString()}
            </ListItemText_1.default>
          </ListItem_1.default>
        </List_1.default>
      </div>
    </Dialog_1.default>);
};
//# sourceMappingURL=Popup.js.map