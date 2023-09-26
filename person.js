const mongoose = require('mongoose');
const log = console.log;
mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
.then(() => {
    log("CONNECTION OPEN!");
})
.catch(err => {
    log("OH NO ERROR!");
    log(err);
});

const personSchema = new mongoose.Schema({
    first: String,
    last: String
})

personSchema.virtual('fullName').get(function() {
    return `${this.first} ${this.last}`
});

const Person = mongoose.model("Person", personSchema);
