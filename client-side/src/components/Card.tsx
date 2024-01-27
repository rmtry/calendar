import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { EventData } from "../types/event";

export default (props: {
  event: EventData;
  index: number;
  onClickAction: () => any;
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "20%",
        padding: "2rem",
      }}
    >
      <Card
        style={{
          flexDirection: "column",
          height: "12.5rem",
          justifyContent: "space-between",
        }}
        sx={{ minWidth: "7.5rem" }}
        key={`event-${props.index}`}
      >
        <CardContent
          style={{
            flexDirection: "column",
            alignItems: "center",
            flexGrow: 4,
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" component="div">
            {props.index + 1}. {props.event.summary}
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {props.event.organizer.email}
          </Typography>
        </CardContent>
        <CardActions style={{ flexGrow: 1 }}>
          <button onClick={props.onClickAction}>Learn More</button>
        </CardActions>
      </Card>
    </div>
  );
};
