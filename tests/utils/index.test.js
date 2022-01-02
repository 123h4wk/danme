'use strict'

const { test, expect } = require('@jest/globals')
const { getAsNumber, range } = require('../../src/utils')

test('#getAsNumber', () => {
  expect(getAsNumber(10)).toBe(10)
  expect(getAsNumber('100')).toBe(100)
  expect(getAsNumber('text')).toBe(0)
  expect(getAsNumber('text', 100)).toBe(100)
})

test('#range', () => {
  expect(range(0, 5)).toEqual([0, 1, 2, 3, 4, 5])
  expect(range(5, 10)).toEqual([5, 6, 7, 8, 9, 10])
})
