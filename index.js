const mongoose = require('mongoose');
const log = console.log;
mongoose.connect('mongodb://127.0.0.1:27017/movieApp')
.then(() => {
    log("CONNECTION OPEN!");
})
.catch(err => {
    log("OH NO ERROR!");
    log(err);
});

// Create our movie schema. This is a template of what our data will look like for a movie
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
});

// Create our movie model. This will create our collections called movies. The string "Movie" 
// must be capitalized. If the collection doesn't exist mongoose will create it for us like this "movies".
// It will be lowercase and plural. Now we set this to a variable by the same name "Movie". This gives
// us a model class called "Movie" which we can then use to create new instances of a movie to save to our
// database movieApp
const Movie = mongoose.model('Movie', movieSchema);

// Can add a movie this way but would need to use blade.save() after this statement.
// const blade = new Movie({title: "Blade", year: 1998, score: 7.1, rating: "R"});

// Not the way this should be done but we just want some 
// seed data for this movie example
Movie.insertMany([
    {title: "Amadeus", year: 1986, score: 9.2, rating: "R"},
    {title: "Star Wars", year: 1977, score: 9.0, rating: "PG"},
    {title: "Alien", year: 1979, score: 8.1, rating: "R"},
    {title: "The Iron Giant", year: 1999, score: 7.5, rating: "PG"},
    {title: "Moonrise Kingdom", year: 2012, score: 7.8, rating: "PG-13"}
])
.then(data => {
    log("IT WORKED!");
    log(data);
})
.catch(err => {
    log("WE FUCKED SOMEWHERE UP!");
    log(err);
});

