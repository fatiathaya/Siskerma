const session = require("express-session");
const authRoutes = require("./routes/auth");
const dashboardUserRoute = require('./routes/dashboarduser');
const express = require('express');
const path = require('path');
const app = express();

// Middleware (optional)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.get('/', (req, res) => {
res.redirect('/auth/login');
});

app.use(session({
  secret: "rahasia-super-aman", // ganti dengan secret kuat
resave: false,
saveUninitialized: true,
}));

app.use("/auth", authRoutes);
app.use('/dashboarduser', dashboardUserRoute);


module.exports = app;
