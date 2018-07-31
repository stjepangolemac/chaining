import 'babel-polyfill'
import fs from 'fs'
import fetch from 'node-fetch'

const DATA_PATH = 'data.json'

const fetchData = async () => {
  let data = []
  let start = 1
  let success = true

  while (success) {
    console.log(`Fetched ${start} tokens, expecting less than 1900...`)

    await fetch(`https://api.coinmarketcap.com/v2/ticker/?structure=array&sort=id&start=${data.length + 1}`)
      .then(res => res.json())
      .then(res => res.data)
      .then(res => {
        if (res === null) {
          success = false
          return
        }

        data.push(...res)
      })
      .catch(console.error)
    
    start += 100
  }

  return data
}

const main = async () => {
  const data = await fetchData()
  const json = JSON.stringify({ data })

  fs.writeFileSync(DATA_PATH, json, 'utf8')

  console.log(`Data written to ${DATA_PATH}`)
}

main()