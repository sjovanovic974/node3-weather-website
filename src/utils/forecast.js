const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/6d00438564b7084ff1f81672831cab32/${latitude},${longitude}?units=si`;

  request({ url, json: true }, (error, {body}) => {
    if(error){
      callback('Unable to connect to weather service!');
    } else if(body.error){
      callback('Unable to find location!');
    } else {
      callback(undefined, {
        summary: body.daily.data[0].summary,
        temp: body.currently.temperature, 
        precipitation: body.currently.precipProbability,
        maxTemp: body.daily.data[0].temperatureHigh,
        minTemp: body.daily.data[0].temperatureLow,
        windSpeed: body.currently.windSpeed,
        humidity: body.currently.humidity,
        pressure: body.currently.pressure
      });
    }
  });
};

module.exports = forecast;