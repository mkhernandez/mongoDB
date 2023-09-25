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

