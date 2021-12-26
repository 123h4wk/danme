'use strict'

const { getAsNumber } = require('../utils')

const DUNGEON_MAX_STEPS = 500
const SLIP_DAMAGE_RATE = 0.05

class Dungeon {
  constructor ({ player, eventList, lastFloor }) {
    this.player = player
    this.eventList = eventList
    this.eventPool = []
    this.remainingPool = []
    this.logs = []
    this.steps = 1
    this.lastFloor = lastFloor
  }

  setLastFloor (val) {
    this.lastFloor = getAsNumber(val, 1)
  }

  execute () {
    this.player.fullRecovery()
    this.eventPool = this._createEventPool()
    this.remainingPool = []
    this.logs = []
    this.steps = 1
    return new Promise(resolve => {
      setTimeout(() => {
        this._next()
        resolve()
      }, 200)
    })
  }

  _createEventPool () {
    const result = []
    const { items } = this.eventList
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      for (let j = 0; j < item.probability; j++) {
        result.push(item)
      }
    }
    return result
  }

  _calculateDamage (damage1, damage2) {
    const max = damage1 > damage2 ? damage1 : damage2
    const min = max === damage1 ? damage2 : damage1
    // maxとminの間でランダムな値を返却
    return Math.floor(Math.random() * (max + 1 - min) + min)
  }

  _calculateNextHp ({ hpChange1, hpChange2 }) {
    let result = this.player.hp + this._calculateDamage(hpChange1, hpChange2)
    if (result < 1) result = 0
    return result
  }

  _calculateNextMp ({ mpChange1, mpChange2 }) {
    let result = this.player.mp + this._calculateDamage(mpChange1, mpChange2)
    if (result < 1) result = 0
    return result
  }

  _processEventDamage (log, event) {
    const prevHp = this.player.hp
    const nextHp = this._calculateNextHp(event)
    const prevMp = this.player.mp
    const nextMp = this._calculateNextMp(event)

    this.player.setHp(nextHp)
    this.player.setMp(nextMp)
    this._writeEventContentLog(log, event)
    this._writePlayerStateLog(log, prevHp, nextHp, prevMp, nextMp)
  }

  _getRandomEvent () {
    const eventIndex = Math.floor(Math.random() * this.eventPool.length)
    return this.eventPool[eventIndex]
  }

  _updateRemainingPool (event) {
    if (event.remaining > 1) {
      const newRemaining = []
      for (let i = 1; i < event.remaining; i++) {
        newRemaining.push(event)
      }
      this.remainingPool.push(newRemaining)
    }
    this.remainingPool = this.remainingPool.filter((v) => v.length !== 0)
  }

  _next () {
    const event = this._getRandomEvent()

    const log = {
      floor: this.steps,
      imageSrc: event.getImageSrc(event.imageType),
      content: ''
    }

    this._processEventDamage(log, event)

    // 追加処理１ 継続イベント
    this.remainingPool.forEach((remainEvents) => {
      this._writeRemainingLog(log, remainEvents.length)
      this._processEventDamage(log, remainEvents.pop())
    })

    // 追加処理２ MP0イベント
    if (this.player.mp < 1) {
      const slipDamage = -Math.ceil(this.player.maxHp * SLIP_DAMAGE_RATE)
      this._processEventDamage(log, {
        content: `\n${this.player.name}は正気が保てない！`,
        hpChange1: slipDamage,
        hpChange2: slipDamage,
        mpChange1: 0,
        mpChange2: 0
      })
    }

    // 決着判定
    // 失敗１：プレーヤーが力尽きた場合
    if (this.player.hp < 1) {
      this._writeDieLog(log)
      this.logs.push(log)
      return
    }

    // 失敗２：探索階が深すぎた場合
    if (this.steps > DUNGEON_MAX_STEPS) {
      this._writeGetLostLog(log)
      this.logs.push(log)
      return
    }

    // 成功：最終階に到達
    if (this.steps === this.lastFloor) {
      this._writeEscapeLog(log)
      this.logs.push(log)
      return
    }

    // 決着がつかないため継続
    this.steps += 1
    this.logs.push(log)
    this._updateRemainingPool(event)
    this._next()
  }

  _writeEventContentLog (log, event) {
    log.content += event.content
  }

  _writePlayerStateLog (log, prevHp, nextHp, prevMp, nextMp) {
    log.content += `\nHP: ${prevHp} → ${nextHp}\nMP: ${prevMp} → ${nextMp}`
  }

  _writeDieLog (log) {
    log.content += `\n${this.player.name}は力尽きた...\n[GAME OVER]`
  }

  _writeGetLostLog (log) {
    log.content += `\n${this.player.name}はこれからもダンジョンを彷徨い続ける...\n[GAME OVER]`
  }

  _writeRemainingLog (log, remain) {
    log.content += `\n[残り${remain}]`
  }

  _writeEscapeLog (log) {
    log.content += `\n最終回の${this.lastFloor}階に到達！\n${this.player.name}はダンジョンの攻略に成功した！！`
  }
}

module.exports = Dungeon
