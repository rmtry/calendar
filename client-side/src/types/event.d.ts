export interface EventData {
  kind: string;
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  description?: string;
  creator: {
    email: string;
  };
  organizer: {
    email: string;
  };
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  recurringEventId: string;
  originalStartTime: {
    dateTime: string;
    timeZone: string;
  };
  iCalUID: string;
  sequence: number;
  attendees: {
    email: string;
    responseStatus: string;
    self?: boolean;
  }[];

  hangoutLink: string;
  conferenceData: any;
  reminders: {
    useDefault: boolean;
  };
  eventType: string;
}
