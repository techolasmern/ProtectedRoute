const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/auth.route');
const connect_db = require('./config/db.config');
const mailRoute = require('./routes/mail.route');

const app = express();

connect_db();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/mail", mailRoute);

app.listen(process.env.PORT || 3000, () => {
    console.log(`🔎 Server: ${process.env.PORT || 3000}`);
})