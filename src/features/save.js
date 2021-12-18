'use strict'

const Event = require('../models/Event')

const importAsJson = (files, callback, { player, eventList, dungeon }) => {
  const file = files[0]
  const reader = new window.FileReader()
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result)
      player.setName(data.player.name)
      player.setMaxHp(data.player.maxHp)
      player.setMaxMp(data.player.maxMp)
      eventList.setItems(
        data.events.map((event) => {
          const eventInstance = new Event(event)
          eventInstance.setProbability(
            Event.convertProbabilityTextIntoValue(eventInstance.probability)
          )
          return eventInstance
        })
      )
      dungeon.setLastFloor(data.dungeon.lastFloor)

      callback()
    } catch (e) {
      window.alert('ファイルの読み込みに失敗しました。')
    }
  }
  reader.readAsText(file)
}

const exportAsJson = ({ elementId, player, eventList, dungeon }) => {
  const result = {
    player: {
      name: player.name,
      maxHp: player.maxHp,
      maxMp: player.maxMp
    },
    events: eventList.items.map((event) => ({
      content: event.content,
      hpChange1: event.hpChange1,
      hpChange2: event.hpChange2,
      mpChange1: event.mpChange1,
      mpChange2: event.mpChange2,
      remaining: event.remaining,
      probability: Event.convertProbabilityValueIntoText(event.probability),
      imageType: event.imageType
    })),
    dungeon: {
      lastFloor: dungeon.lastFloor
    }
  }

  const blob = new window.Blob([JSON.stringify(result, null, '  ')], {
    type: 'application/json'
  })

  document.getElementById(elementId).href = window.URL.createObjectURL(blob)
}

module.exports = {
  importAsJson,
  exportAsJson
}
