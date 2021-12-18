'use strict'

const m = require('mithril')
const { range } = require('./utils')
const { exportAsJson, importAsJson } = require('./features/save')

const App = ({ attrs }) => {
  const { player, eventList, dungeon } = attrs

  const handleDeleteButtonClick = (eventId) => {
    const ok = window.confirm('このイベントを削除しますか？')
    if (ok) eventList.remove(eventId)
  }

  const handleFileUpload = (files) =>
    importAsJson(files, m.redraw, { player, eventList, dungeon })

  const convertNewLineIntoBrTag = (str) =>
    str
      .split('\n')
      .join('_br_')
      .split('_')
      .map((v) => (v === 'br' ? m('br') : m('span', v)))

  const view = () =>
    m('div.app', [
      m(
        'img.bg-image.bg-image--left[src=./img/danme-chan.png][alt=danme-chan]'
      ),
      m('img.bg-image.bg-image--right[src=./img/maou-chan.png][alt=maou-chan]'),
      m('div.container', [
        m('div.container__section', [
          m('img.image[src=./img/danme.png][alt=top-image]')
        ]),
        m('details.container__section.card[open]', [
          m('summary.no-list-style.card__header', [
            m('img.image.image--clickable[src=./img/edit.png][alt=edit]')
          ]),
          m('div.card__body', [
            m('div.horizon.card__section', [
              m(
                'label.horizon__item.button.button--outline',
                'ダンジョンファイル読み込み',
                m('input.hide[type=file][accept=application/json]', {
                  onchange: (e) => handleFileUpload(e.target.files)
                })
              ),
              m(
                'a.horizon__item.button.button--outline',
                {
                  id: 'json-export',
                  download: 'dungeon-data.json',
                  onclick: () =>
                    exportAsJson({
                      elementId: 'json-export',
                      player,
                      eventList,
                      dungeon
                    })
                },
                'ダンジョンファイル書き出し'
              )
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
              eventList.items.map((item) =>
                m(
                  'div.card__inner-section.card__dimple',
                  {
                    key: item.id
                  },
                  [
                    m('div.form-control', [
                      m('label.form-control__label', '内容'),
                      m(
                        'textarea.form-control__input.form-control__textarea[rows=3]',
                        {
                          value: item.content,
                          onchange: (e) => item.setContent(e.target.value)
                        }
                      )
                    ]),
                    m('div.form-control.row', [
                      m('div.row__item', [
                        m('label.form-control__label', 'HP増減'),
                        m('div.form-control__horizon-group', [
                          m('input.form-control__input[type=text]', {
                            value: item.hpChange1,
                            onchange: (e) => item.setHpChange1(e.target.value)
                          }),
                          m('span.form-control__delimiter', '～'),
                          m('input.form-control__input[type=text]', {
                            value: item.hpChange2,
                            onchange: (e) => item.setHpChange2(e.target.value)
                          })
                        ])
                      ]),
                      m('div.row__item', [
                        m('label.form-control__label', 'MP増減'),
                        m('div.form-control__horizon-group', [
                          m('input.form-control__input[type=text]', {
                            value: item.mpChange1,
                            onchange: (e) => item.setMpChange1(e.target.value)
                          }),
                          m('span.form-control__delimiter', '～'),
                          m('input.form-control__input[type=text]', {
                            value: item.mpChange2,
                            onchange: (e) => item.setMpChange2(e.target.value)
                          })
                        ])
                      ])
                    ]),
                    m('div.form-control.row', [
                      m('div.row__item', [
                        m('div.form-control__label', '持続ターン'),
                        m(
                          'select.form-control__input',
                          {
                            onchange: (e) => item.setRemaining(e.target.value)
                          },
                          range(1, 20).map((num) =>
                            m(
                              'option',
                              {
                                value: num,
                                selected: item.remaining === num
                              },
                              num
                            )
                          )
                        )
                      ]),

                      m('div.row__item', [
                        m('div.form-control__label', '発生確率'),
                        m(
                          'select.form-control__input',
                          {
                            onchange: (e) => item.setProbability(e.target.value)
                          },
                          item
                            .getProbabilityValueList()
                            .reverse()
                            .map((probability) =>
                              m(
                                'option',
                                {
                                  value: probability,
                                  selected: item.probability === probability
                                },
                                item.getProbabilityLabel(probability)
                              )
                            )
                        )
                      ])
                    ]),
                    m('div.form-control.row', [
                      m('div.row__item', [
                        m('label.form-control__label', 'アイコン'),
                        m('div.form-control__image-group', [
                          item.getImageTypeValueList().map((imageType) =>
                            m('img.form-control__image[alt=event-icon]', {
                              class:
                                item.imageType === imageType
                                  ? 'form-control__image--selected'
                                  : '',
                              onclick: () => item.setImageType(imageType),
                              src: item.getImageSrc(imageType)
                            })
                          )
                        ])
                      ]),
                      m('div.row__item', [
                        m(
                          'button.button.button--outline[type=button]',
                          {
                            onclick: () => handleDeleteButtonClick(item.id)
                          },
                          'イベント削除'
                        )
                      ])
                    ])
                  ]
                )
              ),
              m('div.card__inner-section', [
                m(
                  'button.button.button--outline[type=button]',
                  {
                    onclick: () => eventList.add()
                  },
                  'イベント追加'
                )
              ])
            ])
          ])
        ]),
        m('details.container__section.card[open]', [
          m('summary.no-list-style.card__header', [
            m('img.image.image--clickable[src=./img/enter.png][alt=enter]')
          ]),
          m('div.card__body', [
            m('div.card__section', [
              m(
                'button.button.button--outline.button--fullwidth[type=button]',
                {
                  onclick: () => dungeon.execute()
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

  return { view }
}

module.exports = App
