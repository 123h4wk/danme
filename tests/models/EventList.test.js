'use strict'

const { test, expect } = require('@jest/globals')
const Event = require('../../src/models/Event')
const EventList = require('../../src/models/EventList')

test('#constructor - no props', () => {
  const eventList = new EventList()
  expect(eventList.items.length).toBe(0)
})

test('#constructor - with props', () => {
  const initialEvents = [new Event(), new Event()]
  const eventList = new EventList(initialEvents)
  expect(eventList.items.length).toBe(2)
})

test('#add - no args', () => {
  const eventList = new EventList()
  eventList.add()
  expect(eventList.items.length).toBe(1)
})

test('#add - with args', () => {
  const eventList = new EventList()
  eventList.add({ content: 'my content' })
  expect(eventList.items.length).toBe(1)
  expect(eventList.items[0].content).toBe('my content')
})

test('#setItems', () => {
  const eventList = new EventList()
  eventList.add()
  eventList.add()
  eventList.setItems([new Event(), new Event(), new Event()])
  expect(eventList.items.length).toBe(3)
})

test('#remove', () => {
  const eventList = new EventList()
  eventList.add()
  eventList.add()
  eventList.items[1].id = 100
  eventList.remove(100)
  expect(eventList.items.length).toBe(1)
})
