import { getAsNumber } from '../utils'

let eventId = 0

class Event {
  constructor(props = {}) {
    this.id = eventId++
    this.content = props.content ?? ''
    this.hpChange1 = props.hpChange1 ?? 0
    this.hpChange2 = props.hpChange2 ?? 0
    this.mpChange1 = props.mpChange1 ?? 0
    this.mpChange2 = props.mpChange2 ?? 0
    this.remaining = props.remaining ?? 1
    this.probability = props.probability ?? 4
    this.imageType = props.imageType ?? 1
  }

  setContent(val) {
    this.content = String(val)
  }

  setHpChange1(val) {
    this.hpChange1 = getAsNumber(val)
  }

  setHpChange2(val) {
    this.hpChange2 = getAsNumber(val)
  }

  setMpChange1(val) {
    this.mpChange1 = getAsNumber(val)
  }

  setMpChange2(val) {
    this.mpChange2 = getAsNumber(val)
  }

  setRemaining(val) {
    this.remaining = getAsNumber(val)
  }

  setProbability(val) {
    this.probability = getAsNumber(val)
  }

  setImageType(val) {
    this.imageType = getAsNumber(val)
  }

  getProbabilityValueList() {
    return [1, 2, 4, 7, 10]
  }

  getProbabilityLabel(probability) {
    if (probability === 1) return '極小'
    if (probability === 2) return '小'
    if (probability === 4) return '中'
    if (probability === 7) return '大'
    if (probability === 10) return '極大'
  }

  getImageTypeValueList() {
    return [1, 2, 3, 4]
  }

  getImageSrc(imageType) {
    if (imageType === 1) return './img/vanish.png'
    if (imageType === 2) return './img/enemy.png'
    if (imageType === 3) return './img/continuty.png'
    if (imageType === 4) return './img/tresure.png'
  }

  static convertProbabilityTextIntoValue(text) {
    if (text === 'very_little') return 1
    if (text === 'little') return 2
    if (text === 'medium') return 4
    if (text === 'more') return 7
    if (text === 'very_more') return 10
  }

  static convertProbabilityValueIntoText(value) {
    if (value === 1) return 'very_little'
    if (value === 2) return 'little'
    if (value === 4) return 'medium'
    if (value === 7) return 'more'
    if (value === 10) return 'very_more'
  }
}

export default Event
