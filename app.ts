import { exec } from 'child_process'
import * as Bluebird  from 'bluebird'
import {segmentNames} from './segmentNames-v2'
import * as fs from 'fs'

const getBaseForm = (word): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    exec(`echo ${word} | hfst-proc finntreebank.hfst `, (err, stdout, stderr) => {
      if (err) {
        console.error(err, stderr)
        reject(err)
      } else {
        const splitted = stdout.replace('^', '').split('/')
        console.log(splitted)
        if(stdout.includes('*')){
          return resolve([])
        }
        const baseWords: string = splitted[1].split("<")[0].replace(/-/g, '')
        const combined = baseWords.replace(/#/g, '')
        console.log("word", word, baseWords, combined, stdout)
        resolve([combined])
      }
    })
  })
}

const processText = () => {
  return Bluebird.map(segmentNames, async item => {
    const words = item.fi.replace(/\/|-/g, ' ').split(" ").filter(Boolean)
    const baseWords = await Promise.all(words.map(getBaseForm))
    return {...item, fi: `${item.fi} ${baseWords.flat().join(' ')}`}
  }, { concurrency: 5 })
}

processText().then(update => {
  console.log("format done")
  fs.writeFileSync('new-segmentNames-v2.ts', `export const segmentNames = ${JSON.stringify(update)}`)
  console.log("done")
}).catch(err => console.error(err))
