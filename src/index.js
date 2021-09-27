import './styles/index.css'

import m from 'mithril'

import App from './App'
import Player from './models/Player'
import Event from './models/Event'
import EventList from './models/EventList'
import Dungeon from './models/Dungeon'

const appElement = document.createDocumentFragment()

const player = new Player()

const eventList = new EventList([
  new Event({
    content: 'サンプルイベント',
    hpChange1: 0,
    hpChange2: 0,
    mpChange1: -10,
    mpChange2: -10,
    remaining: 1,
    probability: 4,
    imageType: 1
  })
])

const dungeon = new Dungeon({ player, eventList })

m.mount(appElement, {
  view: () =>
    m(App, {
      player,
      eventList,
      dungeon
    })
})

document.body.appendChild(appElement)
