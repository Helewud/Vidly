// database holding the movie genres
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((error) => console.error(error.message));

// Create database Schema
const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true
  },
});

// Create a database Model from our Schema
const Genres = mongoose.model("Genres", movieSchema);

module.exports = Genres;