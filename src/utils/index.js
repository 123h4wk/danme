'use strict'

function getAsNumber (val, defaultNumber = 0) {
  return isNaN(Number(val)) ? defaultNumber : Number(val)
}

function range (start, end) {
  const result = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}

module.exports = {
  getAsNumber,
  range
}
