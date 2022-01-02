'use strict'

const { test, expect } = require('@jest/globals')
const Player = require('../../src/models/Player')

test('#constructor - no props', () => {
  const player = new Player()
  expect(player.name).toBe('NoName')
  expect(player.hp).toBe(0)
  expect(player.mp).toBe(0)
  expect(player.maxHp).toBe(100)
  expect(player.maxMp).toBe(100)
})

test('#constructor - with props', () => {
  const player = new Player({
    name: 'My Name',
    hp: 300,
    mp: 500
  })
  expect(player.name).toBe('My Name')
  expect(player.hp).toBe(300)
  expect(player.mp).toBe(500)
})

test('#setName', () => {
  const player = new Player()
  player.setName('Change Name')
  expect(player.name).toBe('Change Name')
  player.setName(100)
  expect(player.name).toBe('100')
})

test('#setHp', () => {
  const player = new Player()
  player.setHp(5)
  expect(player.hp).toBe(5)
  player.setHp('not number')
  expect(player.hp).toBe(0)
})

test('#setMp', () => {
  const player = new Player()
  player.setMp(5)
  expect(player.mp).toBe(5)
  player.setMp('not number')
  expect(player.mp).toBe(0)
})

test('#setMaxHp', () => {
  const player = new Player()
  player.setMaxHp(55)
  expect(player.maxHp).toBe(55)
  player.setMaxHp('not number')
  expect(player.maxHp).toBe(1)
})

test('#setMaxMp', () => {
  const player = new Player()
  player.setMaxMp(66)
  expect(player.maxMp).toBe(66)
  player.setMaxMp('not number')
  expect(player.maxMp).toBe(1)
})

test('#fullRecovery', () => {
  const player = new Player({
    name: 'player',
    hp: 200,
    mp: 150
  })
  player.setHp(195)
  player.setMp(130)
  player.fullRecovery()
  expect(player.hp).toBe(200)
  expect(player.mp).toBe(150)
})
