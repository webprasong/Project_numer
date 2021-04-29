const exController = require('../controllers/exController')

const routes = [
  {
    method: 'GET',
    url: '/api/exs/:token',
    handler: exController.getExs,
    schema:{
      params:{
        type: 'object',
        properties:{
          token:{
            type: 'string',
            description: 'Token'
          }
        }
      }
    }
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
          },token:{
            type: 'string',
            description: 'Token'
          }
        }
      }
    }
  }
]

module.exports = routes