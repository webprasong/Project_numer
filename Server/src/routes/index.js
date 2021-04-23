const exController = require('../controllers/exController')

const routes = [
  {
    method: 'GET',
    url: '/api/exs/:token',
    handler: exController.getExs
  },
  {
    method: 'GET',
    url: '/api/exs/:token/:name',
    handler: exController.getSingleEx,
    schema:{
      params:{
        type: 'object',
        properties:{
          name:{
            type: 'string',
            description: 'Name of Method'
          },
        }
      }
    }
  }
]

module.exports = routes