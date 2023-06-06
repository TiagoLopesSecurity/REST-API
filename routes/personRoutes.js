const router = require('express').Router()

const Person = require('../models/Person')

// Create - Data creation
router.post('/', async (req,res) => { // endpoint to insert people into the system "/person"

    // req.body -> request body
    const {name, salary, approved} = req.body // data to be extracted from the request

    if(!name) {
        res.status(422).json({ error: 'The name field is required!' }) // checks if the name field was sent, if not, returns a 422 error along with a message
    }

    // {name: "Tiago", salary: 5000, approved: false} -> Example

    const person = {
        name,
        salary,
        approved
    }
     

    try {  
    // Data creation
      await Person.create(person) 

        res.status(201).json({message: 'Person successfully entered the system!'}) // send status code 201 (resource created successfully) and send a message in JSON


    } catch (error) {
        res.status(500).json({ error: error }) // send status code 500 (server error) and send the error in JSON
    }

})

// Read - Data reading
router.get('/', async (req, res) => {

    try {
        const people = await Person.find()

        res.status(200).json(people) // send the data present in the people collection
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

router.get('/:id', async (req, res) => {
    console.log(req)
    // in MongoDB, the id field is called _id
    const id = req.params.id

    try { // find only 1 result that matches the search
        const person = await Person.findOne({_id: id }) // find only 1 result that matches the search
        
        if(!person) {
            res.status(422).json({message: 'User not found!'})
            return
        }
        
        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ error: error })
    }

})

// Update - Data update (PUT, PATCH) PATCH is more suitable for updating specific fields    
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const {name, salary, approved} = req.body
    const person = {
        name,
        salary,
        approved,
    }

    try {
        const updatedPerson = await Person.updateOne({_id: id}, person)

        if(updatedPerson.matchedCount === 0) { //  matchedCount = 0 -> not found, if it is 1, it means it was found
            res.status(422).json({message: 'User not found!'})
            return
        }
        res.status(200).json(person)
    } catch(error) {
      res.status(500).json({ error: error })
    }
})

// Delete -  Data deletion
router.delete('/:id', async (req,res) => {
    const id = req.params.id

    const person = await Person.findOne({_id: id }) // find only 1 result that matches the search
        
    if(!person) {
        res.status(422).json({message: 'User not found!'})
        return
    }

    try {

        await Person.deleteOne({_id: id}) // remove person by id

        res.status(200).json({message: 'The user has been removed!'})
        
    } catch (error) {
      res.status(500).json({ error: error })  
    }
})


module.exports = router // send the router model to index.js