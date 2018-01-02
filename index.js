'use strict'

const unitsToFactor = {
  k: 1e3,
  M: 1e6,
  B: 1e9,
  T: 1e12,
}

const withAbbrRegex = /^-?[\d.,]+\s?[a-zA-Z]$/
function withAbbr(compactWithAbbr = '') {
  const num = compactWithAbbr.slice(0, -1).trim()
  const abbr = compactWithAbbr.slice(-1)

  return parseInt(num * unitsToFactor[abbr], 10)
}

const scientificRegex = /^-?[\d,.]+e\d+$/
function scientific(compactScientific = '') {
  const [mult, exponent] = compactScientific.split('e')

  return parseInt(mult.split(',').join('') * 10 ** exponent, 10)
}

const humanScientificRegex = /^-?[\d,.]+x10\^\d+$/
function humanScientific(compactHumanScientific = '') {
  return scientific(compactHumanScientific.split('x10^').join('e'))
}

const justNumberRegex = /^-?[\d,]+$/
function justNumber(compactNumber) {
  return parseInt(compactNumber.split(',').join(''), 10)
}

const infRegex = /^-?Infinity$/i
function inf(infString = '') {
  return infString.charAt(0) === '-' ? -Infinity : Infinity
}

const strategies = [
  [withAbbrRegex, withAbbr],
  [scientificRegex, scientific],
  [humanScientificRegex, humanScientific],
  [justNumberRegex, justNumber],
  [infRegex, inf],
]

function fromCompactInteger(compact) {
  if (typeof compact === 'number') return parseInt(compact, 10)

  if (typeof compact !== 'string') {
    throw Error(
      `fromCompactInteger only works on numbers and strings. You passed in ${typeof compact}.`
    )
  }

  for (const [regex, strategy] of strategies) {
    if (regex.test(compact)) {
      return strategy(compact)
    }
  }

  throw new Error(
    `Could not determine a good strategy to dehumanize "${compact}".`
  )
}

module.exports = {
  fromCompactInteger,
}
