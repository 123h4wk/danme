'use strict'

const m = require('mithril')
const { exportAsJson, importAsJson } = require('./features/save')
const EventCard = require('./components/EventCard')

function App ({ attrs }) {
  const { player, eventList, dungeon } = attrs

  function handleDeleteButtonClick (eventId) {
    const ok = window.confirm('このイベントを削除しますか？')
    if (ok) eventList.remove(eventId)
  }

  function handleFileUpload (files) {
    importAsJson(files, m.redraw, { player, eventList, dungeon })
  }

  function convertNewLineIntoBrTag (str) {
    return str
      .split('\n')
      .join('_br_')
      .split('_')
      .map((v) => (v === 'br' ? m('br') : m('span', v)))
  }

  function view () {
    return m('div.app', [
      m('img.bg-image.bg-image--left[src=./img/danme-chan.png][alt=danme-chan]'),
      m('img.bg-image.bg-image--right[src=./img/maou-chan.png][alt=maou-chan]'),
      m('main.container', [
        m('section.container__section', [
          m('img.image[src=./img/danme.png][alt=top-image]')
        ]),
        m('section.container__section.card', [
          m('img.image[src=./img/edit.png][alt=edit]'),
          m('div.card__body', [
            m('div.horizon.card__section', [
              m(
                'label.horizon__item.button.button--outline',
                'ダンジョンファイル読み込み',
                m('input.hide[type=file][accept=application/json]', {
                  onchange: (e) => handleFileUpload(e.target.files)
                })
              ),
              m('a.horizon__item.button.button--outline', {
                id: 'json-export',
                download: 'dungeon-data.json',
                onclick: () => exportAsJson({
                  elementId: 'json-export',
                  player,
                  eventList,
                  dungeon
                })
              }, 'ダンジョンファイル書き出し')
            ]),
            m('div.card__section.form', [
              m('div.form__title', 'プレイヤー設定'),
              m('div.card__dimple', [
                m('div.form-control', [
                  m('label.form-control__label', '名前'),
                  m('input.form-control__input[type=text]', {
                    value: player.name,
                    onchange: (e) => player.setName(e.target.value)
                  })
                ]),
                m('div.form-control.row', [
                  m('div.row__item', [
                    m('label.form-control__label', 'HP'),
                    m('input.form-control__input[type=text]', {
                      value: player.maxHp,
                      onchange: (e) => player.setMaxHp(e.target.value)
                    })
                  ]),
                  m('div.row__item', [
                    m('label.form-control__label', 'MP'),
                    m('input.form-control__input[type=text]', {
                      value: player.maxMp,
                      onchange: (e) => player.setMaxMp(e.target.value)
                    })
                  ])
                ])
              ])
            ]),
            m('div.card__section.form', [
              m('div.form__title', 'ダンジョン設定'),
              m('div.card__dimple', [
                m('div.form-control', [
                  m('label.form-control__label', '最終階'),
                  m('input.form-control__input[type=text]', {
                    value: dungeon.lastFloor,
                    onchange: (e) => dungeon.setLastFloor(e.target.value)
                  })
                ])
              ])
            ]),
            m('div.card__section.form', [
              m('p.form__title', 'イベント設定'),
              eventList.items.map(item => m(EventCard, { key: item.id, item, handleDeleteButtonClick })),
              m('div.card__inner-section', [
                m(
                  'button.button.button--outline[type=button]',
                  {
                    onclick: () => eventList.add({ content: 'イベント内容' })
                  },
                  'イベント追加'
                )
              ])
            ])
          ])
        ]),
        m('section.container__section.card', [
          m('img.image[src=./img/enter.png][alt=enter]'),
          m('div.card__body', [
            m('div.card__section', [
              m(
                'button.button.button--outline.button--fullwidth[type=button]',
                {
                  onclick: (e) => {
                    dungeon.execute().then(m.redraw)
                  }
                },
                '結果を表示する'
              )
            ]),
            !dungeon.logs?.length
              ? null
              : m(
                'div.card__section.log',
                dungeon.logs.map((log) =>
                  m('div.log__item', [
                    m('div.log__item-content', [
                      m('div.log__item-title', `${log.floor}階`),
                      m('div', convertNewLineIntoBrTag(log.content))
                    ]),
                    m('img.log__item-image[alt=log-icon]', {
                      src: log.imageSrc
                    })
                  ])
                )
              )
          ])
        ])
      ])
    ])
  }
  return { view }
}

module.exports = App
