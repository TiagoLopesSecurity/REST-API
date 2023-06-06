// Initial config
require('dotenv').config()
const express = require('express') // Import the express module
const mongoose = require('mongoose')
const app = express() // Initialize express


// Read JSON / Middlewares
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// API Endpoints/Routes
const personRoutes = require('./routes/personRoutes') // Import the "personRoutes.js" file

app.use('/person', personRoutes) // Anything coming from /person will be redirected to the "personRoutes.js" file

// Initial endpoint
app.get('/', (req,res) => {

    // mostrar req

    res.json({ message: 'Hello Express!' }) // Send a JSON response with a message

})

// MongoDB Connection // Create a .env file
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD


mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.6byjfmy.mongodb.net/`
    )
    .then(() => {
        console.log("Successfully connected to MongoDB!")
        app.listen(3000) // Port number
    })
    .catch((err) => console.log(err)) 