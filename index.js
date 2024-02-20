import express from 'express';

const app = express()
const PORT = 3005

import weatherData from './data/weather.js';

console.log(weatherData)

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

const findCityByZip = (zip) =>{
  return Object.values(weatherData)
    .find(city => city.zip === zip)
}

app.get('/', (_req, res) => {
  const templateVars = weatherData.toronto
  console.log(Object.values(weatherData))
  res.render('index', templateVars)
})

app.post('/weather', (req, res) => {
  // check to see if cookie exists, and how old
  let templateVars
  const {city, zip} = req.body
  if (zip) {
    templateVars = findCityByZip(zip)
  } else {
    templateVars = weatherData[city]
  }
  // if (!city) templateVars.city="none"
  res.render('index', templateVars)
})

app.listen(PORT, console.log(`running on ${PORT}`))