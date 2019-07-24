//
const fixNouns = function(doc) {
  let noun = doc.if('#Noun')
  if (noun.found === true) {
    //'more' is not always an adverb
    noun.match('more #Noun').tag('Noun', 'more-noun')
    //he quickly foo
    noun.match('#Noun #Adverb [#Noun]').tag('Verb', 'correction')
    //fix for busted-up phrasalVerbs
    noun.match('#Noun [#Particle]').tag('Preposition', 'repair-noPhrasal')
    //John & Joe's
    noun.match('#Noun (&|n) #Noun').tag('Organization', 'Noun-&-Noun')
    //Aircraft designer
    noun.match('#Noun #Actor').tag('Actor', 'thing-doer')
    //this rocks
    noun.match('(this|that) [#Plural]').tag('PresentTense', 'this-verbs')
    //j.k Rowling
    doc.match('#Noun van der? #Noun').tagSafe('#Person', 'von der noun')
    //king of spain
    doc.match('(king|queen|prince|saint|lady) of? #Noun').tagSafe('#Person', 'king-of-noun')
    //the word 'second'
    noun
      .match('[second] #Noun')
      .notIf('#Honorific')
      .unTag('Unit')
      .tag('Ordinal', 'second-noun')
    //linear algebra
    noun
      .match('(#Determiner|#Value) [(linear|binary|mobile|lexical|technical|computer|scientific|formal)] #Noun')
      .tag('Noun', 'technical-noun')

    //organization
    let org = noun.if('#Organization')
    if (org.found === true) {
      org.match('#Organization of the? #TitleCase').tag('Organization', 'org-of-place')
      org.match('#Organization #Country').tag('Organization', 'org-country')
      org.match('(world|global|international|national|#Demonym) #Organization').tag('Organization', 'global-org')
    }
  }

  let poss = doc.if('#Possessive')
  if (poss.found === true) {
    //my buddy
    poss.match('#Possessive [#FirstName]').unTag('Person', 'possessive-name')
    //spencer kelly's
    poss
      .match('#FirstName #Acronym? #Possessive')
      .ifNo('#Comma')
      .match('#FirstName #Acronym? #LastName')
      .tag('Possessive')
    //Super Corp's fundraiser
    poss
      .match('#Organization+ #Possessive')
      .ifNo('#Comma')
      .tag('Possessive')
    //Los Angeles's fundraiser
    poss
      .match('#Place+ #Possessive')
      .ifNo('#Comma')
      .tag('Possessive')
  }
  return doc
}
module.exports = fixNouns
