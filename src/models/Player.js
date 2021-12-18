'use strict'

const { getAsNumber } = require('../utils')

class Player {
  constructor (props = {}) {
    this.name = props.name ?? 'NoName'
    this.hp = props.hp ?? 0
    this.mp = props.mp ?? 0
    this.maxHp = props.hp ?? 100
    this.maxMp = props.mp ?? 100
  }

  setName (val) {
    this.name = String(val)
  }

  setHp (val) {
    this.hp = getAsNumber(val)
  }

  setMp (val) {
    this.mp = getAsNumber(val)
  }

  setMaxHp (val) {
    this.maxHp = getAsNumber(val, 1)
  }

  setMaxMp (val) {
    this.maxMp = getAsNumber(val, 1)
  }

  fullRecovery () {
    this.setHp(this.maxHp)
    this.setMp(this.maxMp)
  }
}

module.exports = Player
