import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { EventData } from "../types/event";

export interface PopupProps {
  open: boolean;
  selectedValue?: EventData;
  onClose: () => void;
}

export default (props: PopupProps) => {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Event details</DialogTitle>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <List sx={{ pt: 0 }}>
          <ListItem>
            <ListItemText>Summary</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Date</ListItemText>
          </ListItem>
          <ListItem style={{ height: "7.5rem" }}>
            <ListItemText>Attendees</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Location</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Description</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Organizer</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Created</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Updated</ListItemText>
          </ListItem>
        </List>
        <List sx={{ pt: 0 }}>
          <ListItem>
            <ListItemText>{selectedValue?.summary}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              {selectedValue?.start.dateTime &&
                new Date(selectedValue?.start.dateTime).toLocaleString()}
            </ListItemText>
          </ListItem>
          <ListItem style={{ height: "7.5rem" }}>
            <ListItemText>
              {selectedValue?.attendees.map((a) => a.email).join(", ")}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>{selectedValue?.hangoutLink}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              {selectedValue?.description || "No description provided"}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>{selectedValue?.organizer.email}</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              {selectedValue?.created &&
                new Date(selectedValue?.created).toLocaleString()}
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              {selectedValue?.updated &&
                new Date(selectedValue?.updated).toLocaleString()}
            </ListItemText>
          </ListItem>
        </List>
      </div>
    </Dialog>
  );
};
