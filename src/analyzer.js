import fs from 'fs'

const MIN_MARKET_CAP = 10000000
const MIN_VOLUME_24H = 1000000
const MIN_7D_GROWTH = 2

const loadData = () => {
  const json = fs.readFileSync('data.json', 'utf8')

  return JSON.parse(json).data
}

const filterByMarketCap = data => data
  .filter(token => token.quotes.USD.market_cap > MIN_MARKET_CAP)

const filterByVolume = data => data
  .filter(token => token.quotes.USD.volume_24h > MIN_VOLUME_24H)

const filterBy7dGrowth = data => data
  .filter(token => token.quotes.USD.percent_change_7d >= MIN_7D_GROWTH)

const sortByRank = data => data.sort((a, b) => a.rank > b.rank ? 1 : -1)

const logFirst10 = data => {
  data.slice(0, 10).forEach(
    (token, index) => console.log(`${index + 1}.\t${token.website_slug}`)
  )

  return data
}

const logPercentageMaxSupply = data => {
  const noMax = data.filter(token => !!token.max_supply).length
  const percentage = Math.round(noMax / (data.length - noMax) * 100)

  console.log(`${percentage}% of tokens do not have max_supply set`)

  return data
}

loadData()
  |> filterByMarketCap
  |> filterByVolume
  |> filterBy7dGrowth
  |> sortByRank
  |> logFirst10
  |> logPercentageMaxSupply
