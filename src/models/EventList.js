'use strict'

const Event = require('./Event')

class EventList {
  constructor (initialEvents = []) {
    this.items = initialEvents
  }

  add (newEvent) {
    const event = newEvent ?? new Event()
    this.items = [...this.items, event]
  }

  setItems (events) {
    this.items = events
  }

  remove (eventId) {
    this.items = this.items.filter((item) => item.id !== eventId)
  }
}

module.exports = EventList
