const request = require('request')


const forecast = ((latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=18729fee3d417a899ab8369abef67711&query=' + longitude + ',' + latitude 
    //const url = 'http://api.weatherstack.com/current?access_key=18729fee3d417a899ab8369abef67711&query=37.8267,-122.4233&units=f'

    request({url, json: true},(error, {body}) => {
        if ( error) {
            //console.log("Unable to conect...'")
            callback('Unable to conect ws...',undefined)

        }  else if (body.error) {
            // console.log('Unable to find location....')
            callback('Unable to find location....',undefined)
        } else {
            const currentTemp = body.current.temperature
            const itFeels = body.current.feelslike
            const desc = body.current.weather_descriptions[0]

            //console.log(`Estamos a  ${currentTemp} but feels like ${itFeels} , ${desc}`)
            callback( undefined, `Estamos a  ${currentTemp} but feels like ${itFeels} , ${desc}`)
            /*callback ( undefined, {
                currentTemp : currentTemp ,
                itFeels : itFeels,
                desc : desc
    
            })*/


        }

    })


})

module.exports = forecast
