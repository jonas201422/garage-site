import express from "express";
import { google } from "googleapis";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALENDAR_ID,
} = process.env;

// OAuth2 client setup
const oAuth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  "http://localhost:3000/oauth2callback"
);

// Endpoint to initiate OAuth flow
app.get("/auth", (req, res) => {
  const url = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar.events"],
  });
  res.redirect(url);
});

// OAuth2 callback endpoint
app.get("/oauth2callback", async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    res.send(
      "Autorisierung erfolgreich! Sie können dieses Fenster schließen."
    );
  } catch (err) {
    console.error("Error retrieving access token", err);
    res
      .status(500)
      .send("Fehler beim Abrufen des Zugangstokens: " + err.message);
  }
});

// Reservation endpoint
app.post("/reserve", async (req, res) => {
  const { name, email, phone, date, time, guests, message } = req.body;

  // Ensure the OAuth client has credentials
  if (!oAuth2Client.credentials || !oAuth2Client.credentials.access_token) {
    return res.status(401).json({
      success: false,
      error:
        "Server ist nicht autorisiert. Bitte rufen Sie /auth auf und autorisieren Sie das Backend.",
    });
  }

  const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

  const startDateTime = `${date}T${time}:00`;
  const endDateTime = `${date}T${addTwoHours(time)}:00`;

  const event = {
    summary: `Reservierung – ${name}`,
    description: `E-Mail: ${email}\nTelefon: ${phone}\nPersonen: ${guests}\nNachricht: ${message}`,
    start: {
      dateTime: startDateTime,
      timeZone: "Europe/Vienna",
    },
    end: {
      dateTime: endDateTime,
      timeZone: "Europe/Vienna",
    },
  };

  try {
    await calendar.events.insert({
      calendarId: GOOGLE_CALENDAR_ID,
      resource: event,
    });
    res.json({ success: true, message: "Reservierung im Kalender eingetragen!" });
  } catch (error) {
    console.error("Error inserting event:", error);
    res.status(500).json({
      success: false,
      error: "Fehler beim Eintragen in den Kalender.",
    });
  }
});

// Helper function to add 2 hours to a HH:MM time string
function addTwoHours(time) {
  const [hour, minute] = time.split(":" ).map(Number);
  let endHour = hour + 2;
  let endMinute = minute;
  if (endHour >= 24) {
    endHour -= 24;
  }
  return `${endHour.toString().padStart(2, "0")}:${endMinute
    .toString()
    .padStart(2, "0")}`;
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
