import './index.css';
import {useState} from "react";
import axios from "axios";

function App() {

    const [data, setData] = useState({})
    const [celsius, setCelsius] = useState(false)
    const [km, setKm] = useState(false)
    const [location, setLocation] = useState('')

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=9b125a5e8cd395216f34c8ddac0489c4`

    const searchLocation = (e) => {
        if (e.key === 'Enter') {
            axios.get(url).then((response) => {
                setData(response.data)
                console.dir(response.data)
            })
            setLocation('')
        }
    }

    const kelvinToCelsius = (kelvin) => {
        return kelvin - 273.15;
    }
    const kelvinToFahrenheit = (kelvin) => {
        return (kelvin - 273.15) * 1.8 + 32;
    }
    const milesToKilometers = (miles) => {
        return miles * 1.60934
    }

    return (
        <div className="app">
            <div className="search">
                <input type="text"
                       value={location}
                       onChange={event => setLocation(event.target.value)}
                       placeholder='Enter location'
                       onKeyDown={searchLocation}
                />
            </div>

            {data.name ?
                <div>
                    <div className='change-block'>
                        <button onClick={() => setCelsius(!celsius)}>{celsius ? 'in Celsius' : 'in Fahrenheit'}</button>
                        <button onClick={() => setKm(!km)}>{km ? 'KmPH' : 'MPH'}</button>
                    </div>
                    <div className="container">
                        <div className="top">
                            <div className="location">
                                <p>{data.name} ({data.sys.country})</p>
                            </div>
                            <div className="temp">
                                {celsius ?
                                    <h1>{kelvinToFahrenheit(data.main.temp).toFixed(0)}°F</h1>
                                    : <h1>{kelvinToCelsius(data.main.temp).toFixed(0)}°C</h1>
                                }
                            </div>
                            <div className="description">
                                <p>{data.weather[0].description}</p>
                            </div>
                        </div>
                        <div className="bottom">
                            <div className="feels">
                                {celsius ?
                                    <p className='bold'>{kelvinToFahrenheit(data.main.feels_like).toFixed(0)}°F</p>
                                    : <p className='bold'>{kelvinToCelsius(data.main.feels_like).toFixed(0)}°C</p>
                                }
                                <p>Feels like</p>
                            </div>
                            <div className="humidity">
                                <p className='bold'>{data.main.humidity}%</p>
                                <p>Humidity</p>
                            </div>
                            <div className="wind">
                                {km ?
                                    <p className='bold'>{data.wind.speed.toFixed(1)} MPH</p>
                                    : <p className='bold'>{milesToKilometers(data.wind.speed).toFixed(1)} Km/H</p>
                                }
                                <p>Wind speed</p>
                            </div>
                        </div>
                    </div>
                </div> : null}
        </div>

    );
}

export default App;
