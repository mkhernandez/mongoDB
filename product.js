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
    }, 
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    }
});

// Here we create our data model
const Product = mongoose.model('Product', productSchema);

// Commenting this out so that we don't try to add the same product for our example
// const bike = new Product({ name: "Tire Pump", price: 19.50, categories: ["Cycling"] });// if price is a string then it must be a number
// bike.save()                                                      // that can be cast to a number. Not a good idea
//     .then(data => {                                              // BAD!
//         log("IT WORKED!");
//         log(data);
//     })
//     .catch(err => {
//         log("OH NO ERROR!");
//         log(err);
//     });

// IMPORTANT INFORMATION REGARDING UPDATING WITH MONGOOSE
// When we update something there is no validation of our data. It will just update. We need
// to validate it before it is updated and the way we do that is by adding to our third option
// runValidators: true. Validation is done at the creation of our product and by default not done
// when a product is updated. Therefore, we have to specify validate our data before updating.
// Keep in mind that we can also give users certain err logs if we need to
// The new: true is so that we get back the updated information in our data object. We can then 
// display this information to the user if need be
Product.findOneAndUpdate({name: "Tire Pump"}, {price: -9.99}, {new: true, runValidators: true}) // set to true
.then(data => {
    log("YES, IT WORKED!");
    log(data);
})
.catch(err => {
    log("OH NO YOU FUCKED UP");
    log(err); // We have the err object that has a lot of information
})