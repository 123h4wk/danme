/** @jest-environment jsdom */

'use strict'

const { test, jest: Jest, beforeEach } = require('@jest/globals')

const mq = require('mithril-query')
const EventCard = require('../../src/components/EventCard')
const Event = require('../../src/models/Event')

let out

beforeEach(() => {
  out = mq(EventCard, {
    item: new Event(),
    handleDeleteButtonClick: Jest.fn()
  })
})

test('click open button', () => {
  out.should.have(1, '.card__inner-section.card__dimple > span')
  out.click('button')
  out.should.have(0, '.card__inner-section.card__dimple > span')
  out.click('button:last-child')
  out.should.have(1, '.card__inner-section.card__dimple > span')
})

test('change event content', () => {
  out.click('button')
  out.setValue('textarea', 'My Event Content')
  out.should.contain('My Event Content')
})

test('change hpChange1', () => {
  out.click('button')
  out.setValue('.form-control .row__item input', '-100')
  out.should.contain('-100')
})

test('change hpChange2', () => {
  out.click('button')
  out.setValue('.form-control .row__item input:last-child', '-90')
  out.should.contain('-90')
})

test('change mpChange1', () => {
  out.click('button')
  out.setValue('.form-control .row__item:last-child input', '-80')
  out.should.contain('-80')
})

test('change mpChange2', () => {
  out.click('button')
  out.setValue('.form-control .row__item:last-child input:last-child', '-70')
  out.should.contain('-70')
})

test('change remaining', () => {
  out.click('button')
  out.setValue('.form-control:nth-child(3) .row__item select', '3')
  out.should.contain('3')
})

test('change probability', () => {
  out.click('button')
  out.setValue('.form-control:nth-child(3) .row__item:last-child select', '7')
  out.should.contain('大')
})

test('change icon type', () => {
  out.click('button')
  out.click('.form-control:last-child .row__item img')
})
