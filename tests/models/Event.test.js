'use strict'

const { test, expect } = require('@jest/globals')
const Event = require('../../src/models/Event')

test('#constructor - no props', () => {
  const event = new Event()
  expect(event.content).toBe('')
  expect(event.hpChange1).toBe(0)
  expect(event.hpChange2).toBe(0)
  expect(event.mpChange1).toBe(0)
  expect(event.mpChange2).toBe(0)
  expect(event.remaining).toBe(1)
  expect(event.probability).toBe(Event.PROBABILITY.MEDIUM.VALUE)
  expect(event.imageType).toBe(Event.IMAGE.VANISH.VALUE)
})

test('#constructor - with props', () => {
  const event = new Event({
    content: 'Content',
    hpChange1: 10,
    hpChange2: 20,
    mpChange1: 30,
    mpChange2: 40,
    remaining: 5,
    probability: Event.PROBABILITY.MORE.VALUE,
    imageType: Event.IMAGE.CONTINUTY.VALUE
  })
  expect(event.content).toBe('Content')
  expect(event.hpChange1).toBe(10)
  expect(event.hpChange2).toBe(20)
  expect(event.mpChange1).toBe(30)
  expect(event.mpChange2).toBe(40)
  expect(event.remaining).toBe(5)
  expect(event.probability).toBe(Event.PROBABILITY.MORE.VALUE)
  expect(event.imageType).toBe(Event.IMAGE.CONTINUTY.VALUE)
})

test('#setContent', () => {
  const event = new Event()
  event.setContent('My Content')
  expect(event.content).toBe('My Content')
  event.setContent(100)
  expect(event.content).toBe('100')
})

test('as number setters', () => {
  const params = [
    { method: 'setHpChange1', prop: 'hpChange1' },
    { method: 'setHpChange2', prop: 'hpChange2' },
    { method: 'setMpChange1', prop: 'mpChange1' },
    { method: 'setMpChange2', prop: 'mpChange2' },
    { method: 'setRemaining', prop: 'remaining' },
    { method: 'setProbability', prop: 'probability' },
    { method: 'setImageType', prop: 'imageType' }
  ]
  const event = new Event()

  for (const param of params) {
    event[param.method](55)
    expect(event[param.prop]).toBe(55)
    event[param.method]()
    expect(event[param.prop]).toBe(0)
    event[param.method]('string value')
    expect(event[param.prop]).toBe(0)
  }
})

test('#getProbabilityValueList', () => {
  const event = new Event()
  expect(event.getProbabilityValueList()).toEqual([
    Event.PROBABILITY.VERY_LITTLE.VALUE,
    Event.PROBABILITY.LITTLE.VALUE,
    Event.PROBABILITY.MEDIUM.VALUE,
    Event.PROBABILITY.MORE.VALUE,
    Event.PROBABILITY.VERY_MORE.VALUE
  ])
})

test('#getImageTypeValueList', () => {
  const event = new Event()
  expect(event.getImageTypeValueList()).toEqual([
    Event.IMAGE.VANISH.VALUE,
    Event.IMAGE.ENEMY.VALUE,
    Event.IMAGE.TRESURE.VALUE,
    Event.IMAGE.CONTINUTY.VALUE
  ])
})

test.each([
  [Event.IMAGE.VANISH.VALUE, Event.IMAGE.VANISH.SRC],
  [Event.IMAGE.ENEMY.VALUE, Event.IMAGE.ENEMY.SRC],
  [Event.IMAGE.TRESURE.VALUE, Event.IMAGE.TRESURE.SRC],
  [Event.IMAGE.CONTINUTY.VALUE, Event.IMAGE.CONTINUTY.SRC],
  ['no exists image type', '']
])('#getImageSrc', (value, expected) => {
  const event = new Event()
  expect(event.getImageSrc(value)).toBe(expected)
})

test.each([
  [Event.PROBABILITY.VERY_LITTLE.TEXT, Event.PROBABILITY.VERY_LITTLE.VALUE],
  [Event.PROBABILITY.LITTLE.TEXT, Event.PROBABILITY.LITTLE.VALUE],
  [Event.PROBABILITY.MEDIUM.TEXT, Event.PROBABILITY.MEDIUM.VALUE],
  [Event.PROBABILITY.MORE.TEXT, Event.PROBABILITY.MORE.VALUE],
  [Event.PROBABILITY.VERY_MORE.TEXT, Event.PROBABILITY.VERY_MORE.VALUE],
  ['no exists text', null]
])('#convertProbabilityTextIntoValue', (value, expected) => {
  const event = new Event()
  expect(event.convertProbabilityTextIntoValue(value)).toBe(expected)
})

test.each([
  [Event.PROBABILITY.VERY_LITTLE.VALUE, Event.PROBABILITY.VERY_LITTLE.TEXT],
  [Event.PROBABILITY.LITTLE.VALUE, Event.PROBABILITY.LITTLE.TEXT],
  [Event.PROBABILITY.MEDIUM.VALUE, Event.PROBABILITY.MEDIUM.TEXT],
  [Event.PROBABILITY.MORE.VALUE, Event.PROBABILITY.MORE.TEXT],
  [Event.PROBABILITY.VERY_MORE.VALUE, Event.PROBABILITY.VERY_MORE.TEXT],
  ['no exists value', null]
])('#convertProbabilityValueIntoText', (value, expected) => {
  const event = new Event()
  expect(event.convertProbabilityValueIntoText(value)).toBe(expected)
})

test.each([
  [Event.PROBABILITY.VERY_LITTLE.VALUE, Event.PROBABILITY.VERY_LITTLE.TEXT_JA],
  [Event.PROBABILITY.LITTLE.VALUE, Event.PROBABILITY.LITTLE.TEXT_JA],
  [Event.PROBABILITY.MEDIUM.VALUE, Event.PROBABILITY.MEDIUM.TEXT_JA],
  [Event.PROBABILITY.MORE.VALUE, Event.PROBABILITY.MORE.TEXT_JA],
  [Event.PROBABILITY.VERY_MORE.VALUE, Event.PROBABILITY.VERY_MORE.TEXT_JA],
  ['no exists value', null]
])('#convertProbabilityValueIntoTextJa', (value, expected) => {
  const event = new Event()
  expect(event.convertProbabilityValueIntoTextJa(value)).toBe(expected)
})
