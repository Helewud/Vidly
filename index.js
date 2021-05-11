// file paths
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const genreHome = require("./routes/home");
const movies = require("./routes/movies");

// packages
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");

const app = express();

//creating a connection to the mongoose database
mongoose
  .connect("mongodb://localhost/vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
app.use('/api/movies', movies);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
