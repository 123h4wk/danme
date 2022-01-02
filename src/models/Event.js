'use strict'

const { getAsNumber } = require('../utils')

let eventId = 0

class Event {
  static get PROBABILITY () {
    return {
      VERY_LITTLE: {
        VALUE: 1,
        TEXT: 'very_little',
        TEXT_JA: '極小'
      },
      LITTLE: {
        VALUE: 2,
        TEXT: 'little',
        TEXT_JA: '小'
      },
      MEDIUM: {
        VALUE: 4,
        TEXT: 'medium',
        TEXT_JA: '中'
      },
      MORE: {
        VALUE: 7,
        TEXT: 'more',
        TEXT_JA: '大'
      },
      VERY_MORE: {
        VALUE: 10,
        TEXT: 'very_more',
        TEXT_JA: '極大'
      }
    }
  }

  static get IMAGE () {
    return {
      VANISH: {
        VALUE: 1,
        SRC: './img/vanish.png'
      },
      ENEMY: {
        VALUE: 2,
        SRC: './img/enemy.png'
      },
      CONTINUTY: {
        VALUE: 3,
        SRC: './img/continuty.png'
      },
      TRESURE: {
        VALUE: 4,
        SRC: './img/tresure.png'
      }
    }
  }

  constructor (props = {}) {
    this.id = eventId++
    this.content = props.content ?? ''
    this.hpChange1 = props.hpChange1 ?? 0
    this.hpChange2 = props.hpChange2 ?? 0
    this.mpChange1 = props.mpChange1 ?? 0
    this.mpChange2 = props.mpChange2 ?? 0
    this.remaining = props.remaining ?? 1
    this.probability = props.probability ?? Event.PROBABILITY.MEDIUM.VALUE
    this.imageType = props.imageType ?? Event.IMAGE.VANISH.VALUE
  }

  setContent (val) {
    this.content = String(val)
  }

  setHpChange1 (val) {
    this.hpChange1 = getAsNumber(val)
  }

  setHpChange2 (val) {
    this.hpChange2 = getAsNumber(val)
  }

  setMpChange1 (val) {
    this.mpChange1 = getAsNumber(val)
  }

  setMpChange2 (val) {
    this.mpChange2 = getAsNumber(val)
  }

  setRemaining (val) {
    this.remaining = getAsNumber(val)
  }

  setProbability (val) {
    this.probability = getAsNumber(val)
  }

  setImageType (val) {
    this.imageType = getAsNumber(val)
  }

  getProbabilityValueList () {
    return [
      Event.PROBABILITY.VERY_LITTLE.VALUE,
      Event.PROBABILITY.LITTLE.VALUE,
      Event.PROBABILITY.MEDIUM.VALUE,
      Event.PROBABILITY.MORE.VALUE,
      Event.PROBABILITY.VERY_MORE.VALUE
    ]
  }

  getImageTypeValueList () {
    return [
      Event.IMAGE.VANISH.VALUE,
      Event.IMAGE.ENEMY.VALUE,
      Event.IMAGE.TRESURE.VALUE,
      Event.IMAGE.CONTINUTY.VALUE
    ]
  }

  getImageSrc (type) {
    if (type === Event.IMAGE.VANISH.VALUE) return Event.IMAGE.VANISH.SRC
    if (type === Event.IMAGE.ENEMY.VALUE) return Event.IMAGE.ENEMY.SRC
    if (type === Event.IMAGE.TRESURE.VALUE) return Event.IMAGE.TRESURE.SRC
    if (type === Event.IMAGE.CONTINUTY.VALUE) return Event.IMAGE.CONTINUTY.SRC
    return ''
  }

  convertProbabilityTextIntoValue (probability) {
    return this._convertProbability('text', 'value', probability)
  }

  convertProbabilityValueIntoText (probability) {
    return this._convertProbability('value', 'text', probability)
  }

  convertProbabilityValueIntoTextJa (probability) {
    return this._convertProbability('value', 'text_ja', probability)
  }

  _convertProbability (from, to, value) {
    const FROM = from.toUpperCase()
    const TO = to.toUpperCase()

    if (value === Event.PROBABILITY.VERY_LITTLE[FROM]) { return Event.PROBABILITY.VERY_LITTLE[TO] }
    if (value === Event.PROBABILITY.LITTLE[FROM]) { return Event.PROBABILITY.LITTLE[TO] }
    if (value === Event.PROBABILITY.MEDIUM[FROM]) { return Event.PROBABILITY.MEDIUM[TO] }
    if (value === Event.PROBABILITY.MORE[FROM]) { return Event.PROBABILITY.MORE[TO] }
    if (value === Event.PROBABILITY.VERY_MORE[FROM]) { return Event.PROBABILITY.VERY_MORE[TO] }
    return null
  }
}

module.exports = Event
