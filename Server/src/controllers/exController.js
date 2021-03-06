// External Dependancies
const boom = require('@hapi/boom')

// Get Data Models
const Example = require('../models/example')

// Get all cars
exports.getExs = async (req, reply) => {
  try {
    if(req.params.token == "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"){
      const Exam = await Example.find()
      return Exam;
    }
    return reply.send({ error: 'Token invaild' })
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get single car by ID
exports.getSingleEx = async (req, reply) => {
  try {
    if(req.params.token == "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"){
      const ex = await Example.findOne({ name : req.params.name })
      return ex
    }
    return reply.send({ error: 'Token invaild' })
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new car
exports.addEx = async (req, reply) => {
  try {
    const ex = new Example(req.body)
    console.log(ex)
    return ex.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

/* // Update an existing car
exports.updateCar = async (req, reply) => {
  try {
    const id = req.params.id
    const car = req.body
    const { ...updateData } = car
    const update = await Car.findByIdAndUpdate(id, updateData, { new: true })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Delete a car
exports.deleteCar = async (req, reply) => {
  try {
    const id = req.params.id
    const car = await Car.findByIdAndRemove(id)
    return car
  } catch (err) {
    throw boom.boomify(err)
  }
} */