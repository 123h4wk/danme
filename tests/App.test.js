/** @jest-environment jsdom */

'use strict'

const { test, expect, jest: Jest, beforeEach } = require('@jest/globals')

Jest.mock('../src/features/save')

const m = require('mithril')
const mq = require('mithril-query')
const App = require('../src/App')
const Dungeon = require('../src/models/Dungeon')
const Event = require('../src/models/Event')
const EventList = require('../src/models/EventList')
const Player = require('../src/models/Player')
const save = require('../src/features/save')

Jest.useFakeTimers()

let out

beforeEach(() => {
  Jest.clearAllMocks()
  const player = new Player({
    name: 'player',
    hp: 100,
    mp: 50
  })
  const event = new Event({
    content: 'event name'
  })
  const eventList = new EventList([event])
  const dungeon = new Dungeon({ player, eventList, lastFloor: 15 })

  out = mq({
    view () {
      return m(App, {
        player,
        eventList,
        dungeon
      })
    }
  })
})

test('click import json button', () => {
  out.trigger('input[type=file]', 'change')
  expect(save.importAsJson).toHaveBeenCalledTimes(1)
})

test('click export json button', () => {
  out.click('a#json-export')
  expect(save.exportAsJson).toHaveBeenCalledTimes(1)
})

test('change player name', () => {
  const selector = 'section:nth-child(2) .card__section:nth-child(2) .form-control input'
  out.setValue(selector, 'Change Name')
  out.should.contain('Change Name')
})

test('change player hp', () => {
  const selector = 'section:nth-child(2) .card__section:nth-child(2) .row__item input'
  out.setValue(selector, '1000')
  out.should.contain('1000')
})

test('change player mp', () => {
  const selector = 'section:nth-child(2) .card__section:nth-child(2) .row__item:last-child input'
  out.setValue(selector, '500')
  out.should.contain('500')
})

test('change last floor', () => {
  const selector = 'section:nth-child(2) .card__section:nth-child(3) input'
  out.setValue(selector, '20')
  out.should.contain('20')
})

test('click event delete button - ok', () => {
  window.confirm = Jest.fn().mockReturnValue(true)
  out.should.have(1, 'section:nth-child(2) .card__section:nth-child(4) .card__dimple')
  out.click('section:nth-child(2) .card__section:nth-child(4) button')
  out.click('section:nth-child(2) .card__section:nth-child(4) button')
  out.should.have(0, 'section:nth-child(2) .card__section:nth-child(4) .card__dimple')
  expect(window.confirm).toHaveBeenCalledTimes(1)
})

test('click event delete button - cancel', () => {
  window.confirm = Jest.fn().mockReturnValue(false)
  out.click('section:nth-child(2) .card__section:nth-child(4) button')
  out.click('section:nth-child(2) .card__section:nth-child(4) button')
  expect(window.confirm).toHaveBeenCalledTimes(1)
})

test('click add event button', () => {
  const listSelector = 'section:nth-child(2) .card__section:nth-child(4) .card__dimple'
  const btnSelector = 'section:nth-child(2) .card__section:nth-child(4) .card__inner-section:last-child button'
  out.should.have(1, listSelector)
  out.click(btnSelector)
  out.should.have(2, listSelector)
})

test('click execute button', () => {
  const btnSelector = 'section:nth-child(3) button'
  const logSelector = '.log__item'
  out.should.not.have(logSelector)
  out.click(btnSelector)
  Jest.runAllTimers()
  out.redraw()
  out.should.have(15, logSelector)
  out.should.contain('event name')
})
