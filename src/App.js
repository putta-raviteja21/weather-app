import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [stateName, setStateName] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const states = [
    "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
    "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
    "Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
    "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
    "Uttar Pradesh","Uttarakhand","West Bengal"
  ];

  const getWeather = async () => {
    if (!stateName) {
      setError("Please select a state");
      return;
    }
    setLoading(true);
    setError("");
    setWeather(null);
    try {
      const res = await axios.get(`https://backend-2lpc.onrender.com/weather?state=${stateName}`);
      setWeather(res.data);
    } catch {
      setError("Weather not found for this state");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Indian States Weather App</h1>
      <div className="controls">
        <select value={stateName} onChange={(e) => setStateName(e.target.value)}>
          <option value="">Select a state</option>
          {states.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button onClick={getWeather}>Get Weather</button>
      </div>

      {loading && <div className="card">Loading weather for {stateName}...</div>}
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="card">
          <h2>{weather.name}, India</h2>
          <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
          <p><strong>Feels Like:</strong> {weather.main.feels_like} °C</p>
          <p><strong>Weather:</strong> {weather.weather[0].description}</p>
          <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
          <p><strong>Atmospheric Pressure:</strong> {weather.main.pressure} hPa</p>
        </div>
      )}
    </div>
  );
}

export default App;
