const mongoose = require('mongoose')

const Person = mongoose.model('Person', { //  create a collection called People
    name: String,
    salary: Number,
    approved: Boolean,
})

module.exports = Person // export the module to be imported later



