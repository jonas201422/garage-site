const express = require('express');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// configure mail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// configure Google Calendar API with service account credentials
const credentials = process.env.GOOGLE_CREDENTIALS
  ? JSON.parse(process.env.GOOGLE_CREDENTIALS)
  : null;

let calendar;
if (credentials) {
  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });
  calendar = google.calendar({ version: 'v3', auth });
}

app.post('/api/reservieren', async (req, res) => {
  const { name, email, phone, datum, uhrzeit, personen, nachricht } = req.body;

  try {
    // Send notification email
    await transporter.sendMail({
      from: `"Garage Reservations" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO || process.env.MAIL_USER,
      subject: `Neue Reservierung von ${name}`,
      html: `
        <h3>Neue Reservierung</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || ''}</p>
        <p><strong>Datum:</strong> ${datum}</p>
        <p><strong>Uhrzeit:</strong> ${uhrzeit}</p>
        <p><strong>Personen:</strong> ${personen}</p>
        <p><strong>Nachricht:</strong> ${nachricht || ''}</p>
      `,
  const express = require('express');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// configure mail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// configure Google Calendar API with service account credentials
const credentials = process.env.GOOGLE_CREDENTIALS
  ? JSON.parse(process.env.GOOGLE_CREDENTIALS)
  : null;

let calendar;
if (credentials) {
  const auth = new google.auth.JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });
  calendar = google.calendar({ version: 'v3', auth });
}

app.post('/api/reservieren', async (req, res) => {
  const { name, email, phone, datum, uhrzeit, personen, nachricht } = req.body;

  try {
    // Send notification email
    await transporter.sendMail({
      from: `"Garage Reservations" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_TO || process.env.MAIL_USER,
      subject: `Neue Reservierung von ${name}`,
      html: `
        <h3>Neue Reservierung</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>E-Mail:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || ''}</p>
        <p><strong>Datum:</strong> ${datum}</p>
        <p><strong>Uhrzeit:</strong> ${uhrzeit}</p>
        <p><strong>Personen:</strong> ${personen}</p>
        <p><strong>Nachricht:</strong> ${nachricht || ''}</p>
      `,
    });

    // Create calendar event if credentials provided
    if (calendar) {
      const startDateTime = new Date(`${datum}T${uhrzeit}`);
      // assume 2 hour reservation
      const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000);

      await calendar.events.insert({
        calendarId: process.env.CALENDAR_ID || 'primary',
        requestBody: {
          summary: `Reservierung: ${name} (${personen} Personen)`,
          description: `Name: ${name}\nE-Mail: ${email}\nTelefon: ${phone || ''}\nNachricht: ${nachricht || ''}`,
          start: { dateTime: startDateTime.toISOString() },
          end: { dateTime: endDateTime.toISOString() },
        },
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Fehler bei Reservierung:', error);
    res.status(500).json({ success: false, error: 'Es gab ein Problem beim Senden der Reservierung.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});  });

    // Create calendar event if credentials provided
    if (calendar) {
      const startDateTime = new Date(`${datum}T${uhrzeit}`);
      // assume 2 hour reservation
      const endDateTime = new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000);

      await calendar.events.insert({
        calendarId: process.env.CALENDAR_ID || 'primary',
        requestBody: {
          summary: `Reservierung: ${name} (${personen} Personen)`,
          description: `Name: ${name}\nE-Mail: ${email}\nTelefon: ${phone || ''}\nNachricht: ${nachricht || ''}`,
          start: { dateTime: startDateTime.toISOString() },
          end: { dateTime: endDateTime.toISOString() },
        },
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Fehler bei Reservierung:', error);
    res.status(500).json({ success: false, error: 'Es gab ein Problem beim Senden der Reservierung.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server läuft auf Port ${PORT}`);
});
