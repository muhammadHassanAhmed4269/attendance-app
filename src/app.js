require("dotenv").config({ path: ".env" });

const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
// const hbs = require("hbs");
const dbConnector = require("./configurations/database");
const routes = require("./configurations/routes-injections");
const {
  verifyConnectionMiddleware,
} = require("./configurations/middleware-injections");

// // Express setup
// app.set("view engine", "hbs");
// app.set("views", path.join(__dirname, "views"));
// hbs.registerPartials(path.join(__dirname, "views/partials"));
// hbs.registerHelper("isEqual", function (val1, val2, options) {
//   if (val1 === val2) {
//     return options.fn(this); // Executes the block if val1 is equal to val2
//   } else {
//     return options.inverse(this); // Executes the else block if val1 is not equal to val2
//   }
// });
// app.use(express.static(path.join(__dirname, "public")));
// app.use("/js", express.static(path.resolve(__dirname, "public/js")));
// app.use("/img", express.static(path.resolve(__dirname, "public/images")));
// app.use("/css", express.static(path.resolve(__dirname, "public/css")));
// app.use("/vendor", express.static(path.resolve(__dirname, "public/vendor")));

// Middlewares
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Attendance server live");
});

// app.use(verifyConnectionMiddleware);

// Routes
app.use(routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(err);
});

app.use((req, res) => {
  res.status(404).send("404 - Invalid Route");
});

// Start server
const port = process.env.PORT;
app.listen(port, () => {
  console.log("User service is live at", port);
  dbConnector;
});
