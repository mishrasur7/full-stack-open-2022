import React from 'react'

const Weather = ({weather, capital}) => {

    console.log('weather from weater', weather)
    
  return (
    <div>
        <p>Weather in {capital}</p>
        {
            (() => {
                while(weather.name === capital) {
                    return <>
                    <p>temperature {weather.main.temp} Celcious</p>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
                    <p>wind {weather.wind.speed} m/s</p>
                    </>
                }
            })()
        }
        
    </div>
  )
}

export default Weather