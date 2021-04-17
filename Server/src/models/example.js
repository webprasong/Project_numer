const mongoose = require('mongoose')

const Example = new mongoose.Schema({
  name: String,
  latex: String,
  xl: Number,
  xr: Number,
  xold: Number,
  xnew: Number,
  matrix: Array,
  matrixB: Array,
  matrixX: Array,
  x: Array,
  y: Array,
  xfind: Number,
  order: Number,
  xfindArray: Array
})

module.exports = mongoose.model('Example', Example)