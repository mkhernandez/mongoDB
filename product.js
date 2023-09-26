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

// Define our Schema for our products. We will use type so that we can take advantage of requiring data
// Using `required` helps us with data integrity
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 20
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    onSale: {
        type: Boolean,
        default: false
    }
});

// Here we create our data model
const Product = mongoose.model('Product', productSchema);

const bike = new Product({name: "Bike Helmet Fr", price: -9.50 });// if price is a string then it must be a number
bike.save()                                                      // that can be cast to a number. Not a good idea
    .then(data => {                                              // BAD!
        log("IT WORKED!");
        log(data);
    })
    .catch(err => {
        log("OH NO ERROR!");
        log(err);
    });