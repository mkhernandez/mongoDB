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

// This is a mongoose virtual example
personSchema.virtual('fullName').get(function() {
    return `${this.first} ${this.last}`
});

// The following are examples of middleware in mongoose
// The first example will happen right before we save to the people collection
// Keep in mind we have access to 'this'
personSchema.pre("save", async function() {
    this.first = "YO";
    this.last = "MAMA";
    log("ABOUT TO SAVE!");
});
// This will come after the save has happened
personSchema.post("save", async function() {
    log("JUST SAVED!");
});

const Person = mongoose.model("Person", personSchema);
