
const routes = require('./routes/index')

// Require the framework and instantiate it
const fastify = require('fastify')({
  logger: true
})

fastify.register(require('fastify-cors'), { 
  origin: true
})
  
// Declare a route
fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})
  
// Import Swagger Options
const swagger = require('./config/swagger')

// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options)

// Run the server!
const start = async () => {
  try {
    await fastify.listen(5000,"0.0.0.0")
    fastify.swagger()
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()

  // Require external modules
const mongoose = require('mongoose')

// Connect to DB
mongoose.connect('mongodb+srv://numer2:numer2123@projectnumer.je0yw.mongodb.net/ExampleNumer?retryWrites=true&w=majority')
 .then(() => console.log('Success'))
 .catch(err => console.log(err))

 routes.forEach((route, index) => {
    fastify.route(route)
})