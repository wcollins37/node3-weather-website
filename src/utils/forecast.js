const { stream } = require('assert-plus')
const request = require('postman-request')
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (lat, long, callback) => {
    const coord = String(lat)+','+String(long)
    const url = 'http://api.weatherstack.com/current?access_key=81456f60b4303ffe87d54ad6a0b44a8e&query='+coord+'&units=f'
    request({url, json: true}, (err, {body}) => {
        if (err) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const data = body.current
            console.log(data)
            callback(undefined, data.weather_descriptions[0]+'. It is currently '+data.temperature+' degrees out. It feels like '+data.feelslike+' degrees out. The humidity is '+data.humidity+'%.')
        }
    })
}

module.exports = forecast