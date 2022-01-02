'use strict'

const m = require('mithril')
const { range } = require('../utils')

class EventCard {
  constructor () {
    this.isOpen = false
  }

  closedView (item) {
    return m('div.row.card__inner-section.card__dimple', [
      m('span.row__item', item.content),
      m('button.button.button--outline[type=button]', {
        onclick: () => { this.isOpen = true }
      }, '設定')
    ])
  }

  view ({ attrs: { item, handleDeleteButtonClick } }) {
    return [
      !this.isOpen
        ? this.closedView(item)
        : m(
          'div.card__inner-section.card__dimple',
          [
            m('div.form-control', [
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
                        item.convertProbabilityValueIntoTextJa(probability)
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
              m('div.row__item.row', [
                m(
                  'button.button.button--outline.row__item[type=button]',
                  {
                    onclick: () => handleDeleteButtonClick(item.id)
                  },
                  'イベント削除'
                ),
                m(
                  'button.button.button--outline.row__item[type=button]',
                  {
                    onclick: () => { this.isOpen = false }
                  },
                  '設定を閉じる'
                )
              ])
            ])
          ]
        )]
  }
}

module.exports = EventCard
