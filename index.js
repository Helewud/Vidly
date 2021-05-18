// file paths
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const genreHome = require("./routes/home");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");

// packages
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");

const app = express();

//creating a connection to the mongoose database
mongoose
  .connect("mongodb://localhost/vidly", {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.error(error.message));

// Middlewares
app.use(express.json());
app.use(express.static("public"));
app.use(helmet());
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/genres", genres);
app.use("/api/genres", genreHome);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
