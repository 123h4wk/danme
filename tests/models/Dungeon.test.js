'use strict'

const { test, expect, jest: Jest } = require('@jest/globals')
const Dungeon = require('../../src/models/Dungeon')
const Player = require('../../src/models/Player')
const Event = require('../../src/models/Event')
const EventList = require('../../src/models/EventList')

Jest.useFakeTimers()

test('#setLastFloor - no props', () => {
  const dungeon = new Dungeon({
    player: new Player(),
    eventList: new EventList(),
    lastFloor: 15
  })
  dungeon.setLastFloor(100)
  expect(dungeon.lastFloor).toBe(100)
})

test('#execute - END :: hp damage', () => {
  const player = new Player({
    name: 'test user',
    hp: 100,
    mp: 100
  })
  const event = new Event({
    content: 'event1',
    hpChange1: -20,
    hpChange2: -20
  })
  const eventList = new EventList([event])
  const dungeon = new Dungeon({ player, eventList, lastFloor: 10 })
  dungeon.execute()
  Jest.runAllTimers()
  expect(dungeon.logs.length).toBe(5)
})

test('#execute - END :: continuty event damage', () => {
  const player = new Player({
    name: 'test user',
    hp: 100,
    mp: 100
  })
  const event = new Event({
    content: 'event1',
    hpChange1: -10,
    hpChange2: -10,
    remaining: 2
  })
  const eventList = new EventList([event])
  const dungeon = new Dungeon({ player, eventList, lastFloor: 25 })
  dungeon.execute()
  Jest.runAllTimers()
  expect(dungeon.logs.length).toBe(6)
})

test('#execute - END :: slip damage', () => {
  const player = new Player({
    name: 'test user',
    hp: 100,
    mp: 100
  })
  const event = new Event({
    content: 'event1',
    mpChange1: -100,
    mpChange2: -100
  })
  const eventList = new EventList([event])
  const dungeon = new Dungeon({ player, eventList, lastFloor: 25 })
  dungeon.execute()
  Jest.runAllTimers()
  expect(dungeon.logs.length).toBe(20)
})

test('#execute - END :: max steps', () => {
  const player = new Player({
    name: 'test user',
    hp: 100,
    mp: 100
  })
  const event = new Event({
    content: 'event1',
    hpChange1: 0,
    hpChange2: 0
  })
  const eventList = new EventList([event])
  const dungeon = new Dungeon({ player, eventList, lastFloor: 550 })
  dungeon.execute()
  Jest.runAllTimers()
  expect(dungeon.logs.length).toBe(500)
})

test('#execute - SUCCESS', () => {
  const player = new Player({
    name: 'test user',
    hp: 100,
    mp: 100
  })
  const event = new Event({
    content: 'event1',
    hpChange1: -2,
    hpChange2: -5,
    mpChange1: -5,
    mpChange2: -2
  })
  const eventList = new EventList([event])
  const dungeon = new Dungeon({ player, eventList, lastFloor: 10 })
  dungeon.execute()
  Jest.runAllTimers()
  expect(dungeon.logs.length).toBe(10)
})
