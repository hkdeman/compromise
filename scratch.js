const nlp = require('./src/index')
// const spacetime = require('/Users/spencer/mountain/spacetime/src')
nlp.verbose(true)
// let txt = require('./scripts/test/speed/_sotu-text.js')
// nlp.extend(require('./plugins/numbers/src'))
// nlp.extend(require('./plugins/dates/src'))
// nlp.extend(require('./plugins/sentences/src'))

// let doc = nlp(`before 2017`)
// let today = [2016, 1, 5] // feb 5th, a friday
// let obj = doc.dates({ today: today }).json()[0]
// console.log(spacetime(obj.date.start).format('{nice-day} {year}'))

/* //more person false-positives
Vitamin D.
may
ACE
gene
Jennifer  antibiotics
in our X-ray Uro-radiology
*/

// let doc = nlp(`thanks`)
// let doc = nlp(`Photographs from a seized computer `)
// let doc = nlp(`I am a licensed mental health counsellour`)
// let doc = nlp(`a blown motor.`)

// let doc = nlp(`your own conclusions`)
// let doc = nlp(`The situation appears to be even worse`)//even
// let doc = nlp(`They even occasionally attack`)
// let doc = nlp(`a crime against humanity`)

// let doc = nlp(`your own destiny`)
// let doc = nlp(`kept me up to date`)
// let doc = nlp(`in regards to`)
// let doc = nlp(`have you gotten?`)

nlp.extend((Doc, world) => {
  world.addTags({
    One: {},
    Two: {},
    Three: { isA: ['Two', 'One'] },
  })
})

let doc = nlp(`have fun in toronto`, { toronto: 'Three' })
// let doc = nlp(` a crapload of fun!`)
// let doc = nlp(`I mean to`)
// let doc = nlp(`he is able to make up for his lack of preparedness`)
doc.debug()

// hmmm
// let doc = nlp('a farmer boy is')
// doc.match(`a (word|#Noun+) is`).debug()
