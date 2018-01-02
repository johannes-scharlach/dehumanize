/* eslint-env jest */

const { fromCompactInteger } = require('./index.js')
const humanize = require('humanize-plus')

describe('dehumanize', () => {
  describe('fromCompactInteger', () => {
    it('parses a small number', () => {
      expect(fromCompactInteger('23')).toBe(23)
    })
  })
})
