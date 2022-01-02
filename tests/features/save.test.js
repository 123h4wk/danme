/** @jest-environment jsdom */

'use strict'

const { test, expect, jest: Jest, beforeEach } = require('@jest/globals')

const save = require('../../src/features/save')
const Player = require('../../src/models/Player')
const Event = require('../../src/models/Event')
const EventList = require('../../src/models/EventList')
const Dungeon = require('../../src/models/Dungeon')

beforeEach(() => {
  Jest.clearAllMocks()
})

test('#jsonToModel', () => {
  const parseSpy = Jest.spyOn(JSON, 'parse').mockImplementation(args => args)
  const callback = Jest.fn()
  const player = new Player()
  const eventList = new EventList()
  const dungeon = new Dungeon(player, eventList, 5)

  const data = {
    player: {
      name: 'player name',
      maxHp: 100,
      maxMp: 50
    },
    events: [
      {
        content: 'event1',
        hpChange1: -10,
        hpChange2: -15,
        mpChange1: -5,
        mpChange2: -3,
        remaining: 2,
        probability: 'more',
        imageType: 1
      }
    ],
    dungeon: {
      lastFloor: 20
    }
  }

  save.jsonToModel(data, callback, { player, eventList, dungeon })
  const event = eventList.items[0]

  expect(parseSpy).toHaveBeenCalledTimes(1)
  expect(player.name).toBe('player name')
  expect(player.maxHp).toBe(100)
  expect(player.maxMp).toBe(50)
  expect(eventList.items.length).toBe(1)
  expect(event.content).toBe('event1')
  expect(event.hpChange1).toBe(-10)
  expect(event.hpChange2).toBe(-15)
  expect(event.mpChange1).toBe(-5)
  expect(event.mpChange2).toBe(-3)
  expect(event.remaining).toBe(2)
  expect(event.probability).toBe(7)
  expect(event.imageType).toBe(1)
  expect(dungeon.lastFloor).toBe(20)
  expect(callback).toHaveBeenCalled()
})

test('#jsonToModel - throw error', () => {
  const parseSpy = Jest.spyOn(JSON, 'parse').mockImplementation(() => { throw new Error() })
  const errorSpy = Jest.spyOn(console, 'error').mockReturnValue()
  const alertSpy = Jest.spyOn(window, 'alert').mockReturnValue()
  const callback = Jest.fn()
  const player = new Player()
  const eventList = new EventList()
  const dungeon = new Dungeon(player, eventList, 5)

  const data = {}

  save.jsonToModel(data, callback, { player, eventList, dungeon })
  expect(parseSpy).toHaveBeenCalledTimes(1)
  expect(errorSpy).toHaveBeenCalledTimes(1)
  expect(alertSpy).toHaveBeenCalledWith('ファイルの読み込みに失敗しました。')
})

test('#modelToJson', () => {
  const player = new Player({
    name: 'my name',
    hp: 100,
    mp: 50
  })
  const event = new Event({
    content: 'my event',
    hpChange1: -10,
    hpChange2: -5,
    mpChange1: -3,
    mpChange2: -1,
    remaining: 5,
    probability: Event.PROBABILITY.MORE.VALUE,
    imageType: Event.IMAGE.CONTINUTY.VALUE
  })
  const eventList = new EventList([event])
  const dungeon = new Dungeon({ player, eventList, lastFloor: 50 })
  const actual = save.modelToJson({ player, eventList, dungeon })
  expect(actual).toEqual({
    player: {
      name: 'my name',
      maxHp: 100,
      maxMp: 50
    },
    events: [
      {
        content: 'my event',
        hpChange1: -10,
        hpChange2: -5,
        mpChange1: -3,
        mpChange2: -1,
        remaining: 5,
        probability: 'more',
        imageType: 3
      }
    ],
    dungeon: {
      lastFloor: 50
    }
  })
})

test('#importAsJson', () => {
  const player = new Player()
  const eventList = new EventList()
  const dungeon = new Dungeon(player, eventList, 5)
  const files = []
  const callback = Jest.fn()
  Jest.spyOn(window, 'FileReader').mockImplementation(function () {
    this.onload = null
    this.readAsText = Jest.fn()
  })
  Jest.spyOn(save, 'jsonToModel').mockReturnValue()

  save.importAsJson(files, callback, { player, eventList, dungeon })

  const reader = window.FileReader.mock.instances[0]
  reader.onload()
  expect(reader.onload).toEqual(expect.any(Function))
  expect(reader.readAsText).toHaveBeenCalledTimes(1)
})

test('#exportAsJson', () => {
  const player = new Player()
  const eventList = new EventList()
  const dungeon = new Dungeon(player, eventList, 5)
  Jest.spyOn(save, 'modelToJson').mockReturnValue()
  Jest.spyOn(window, 'Blob').mockReturnValue()
  Jest.spyOn(document, 'getElementById').mockReturnValue({ href: '' })
  window.URL.createObjectURL = Jest.fn()

  save.exportAsJson({ elementId: 'element-id', player, eventList, dungeon })
})
