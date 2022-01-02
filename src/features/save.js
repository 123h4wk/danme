'use strict'

const Event = require('../models/Event')

function jsonToModel (readerResult, callback, { player, eventList, dungeon }) {
  try {
    const data = JSON.parse(readerResult)
    player.setName(data.player.name)
    player.setMaxHp(data.player.maxHp)
    player.setMaxMp(data.player.maxMp)
    eventList.setItems(
      data.events.map((eventProps) => {
        const event = new Event(eventProps)
        const probabilityValue = event.convertProbabilityTextIntoValue(event.probability)
        event.setProbability(probabilityValue)
        return event
      })
    )
    dungeon.setLastFloor(data.dungeon.lastFloor)
    callback()
  } catch (err) {
    console.error(err)
    window.alert('ファイルの読み込みに失敗しました。')
  }
}

function modelToJson ({ player, eventList, dungeon }) {
  return {
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
      probability: event.convertProbabilityValueIntoText(event.probability),
      imageType: event.imageType
    })),
    dungeon: {
      lastFloor: dungeon.lastFloor
    }
  }
}

function importAsJson (files, callback, { player, eventList, dungeon }) {
  const file = files[0]
  const reader = new window.FileReader()
  reader.onload = () => jsonToModel(reader.result, callback, { player, eventList, dungeon })
  reader.readAsText(file)
}

function exportAsJson ({ elementId, player, eventList, dungeon }) {
  const result = modelToJson({ player, eventList, dungeon })
  const blob = new window.Blob([JSON.stringify(result, null, '  ')], {
    type: 'application/json'
  })
  document.getElementById(elementId).href = window.URL.createObjectURL(blob)
}

module.exports = {
  importAsJson,
  exportAsJson,
  jsonToModel,
  modelToJson
}
