/* eslint-env jest */

const { fromCompactInteger } = require('./index.js')
const humanize = require('humanize-plus')

describe('dehumanize', () => {
  describe('fromCompactInteger', () => {
    it('parses a small number', () => {
      expect(fromCompactInteger('23')).toBe(23)
    })

    it('parses a number with k', () => {
      expect(fromCompactInteger('183k')).toBe(183000)
    })

    it('parses "Infinity"', () => {
      expect(fromCompactInteger('Infinity')).toBe(Infinity)
    })

    it('parses "-INFINITY"', () => {
      expect(fromCompactInteger('-INFINITY')).toBe(-Infinity)
    })

    const numbers = [77e2, 77e4, 77e6, 77e8, 77e10, 77e12, 77e14, 77e16]

    describe('humanized numbers with precision 1', () => {
      numbers.forEach(num => {
        const humanNum = humanize.compactInteger(num, 1)
        it(`is able to interpret "${humanNum}"`, () => {
          expect(fromCompactInteger(humanNum)).toBe(num)
        })
      })

      numbers.map(num => num * -1).forEach(num => {
        const humanNum = humanize.compactInteger(num, 1)
        it(`is able to interpret "${humanNum}"`, () => {
          expect(fromCompactInteger(humanNum)).toBe(num)
        })
      })
    })
  })
})
