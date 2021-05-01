// file paths
const genres = require("./routes/genres");
const genreHome = require("./routes/home");

// packages
const morgan = require("morgan");
const helmet = require("helmet");
const express = require("express");


const app = express();

// Middlewares
app.use(express.json());
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'));

// Routes
app.use('/api/genres', genres);
app.use('/api/genres', genreHome);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));