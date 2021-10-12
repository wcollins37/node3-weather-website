const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoid2NvbGxpbnMzNyIsImEiOiJja3VmbWU2M2YwbDdiMnB0OWJqczJtb3RxIn0.ZTXQaPMjMjDAfkoiT9NK4A&limit=1'
    request({url, json: true}, (err, {body}) => {
        if (err) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode