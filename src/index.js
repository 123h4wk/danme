'use strict'

require('./styles/index.css')

const m = require('mithril')

const App = require('./App')
const Player = require('./models/Player')
const Event = require('./models/Event')
const EventList = require('./models/EventList')
const Dungeon = require('./models/Dungeon')

const appElement = document.createDocumentFragment()

const player = new Player()

const eventList = new EventList([
  new Event({
    content: 'サンプルイベント',
    hpChange1: -10,
    hpChange2: -20,
    mpChange1: -10,
    mpChange2: -10,
    remaining: 1,
    probability: 4,
    imageType: 1
  })
])

const dungeon = new Dungeon({ player, eventList, lastFloor: 15 })

m.mount(appElement, {
  view: () =>
    m(App, {
      player,
      eventList,
      dungeon
    })
})

document.body.appendChild(appElement)
