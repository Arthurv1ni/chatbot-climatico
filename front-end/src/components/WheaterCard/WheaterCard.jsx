import React, { useEffect, useState } from 'react';
import './WheaterCus.css';
import clear from '../../assets/clear.png';
import clouds from '../../assets/clouds.png';
import drizzle from '../../assets/drizzle.png';
import humidity from '../../assets/humidity.png';
import mist from '../../assets/mist.png';
import rain from '../../assets/rain.png';
import wind from '../../assets/wind.png';
import { BsList } from 'react-icons/bs'; 

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);
  const [weatherIcon, setWeatherIcon] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false); 
  const [isMobileOpen, setIsMobileOpen] = useState(false); 

  const apikey = '';
  const apiURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&';

  const fetchWeather = async (lat, lon) => {
    const response = await fetch(`${apiURL}lat=${lat}&lon=${lon}&appid=${apikey}`);

    if (response.status === 404) {
      setError(true);
      setWeatherData(null);
    } else {
      const data = await response.json();
      setWeatherData(data);
      setError(false);

      // Atualizar o ícone do clima baseado na resposta
      switch (data.weather[0].main) {
        case 'Clouds':
          setWeatherIcon(clouds);
          break;
        case 'Clear':
          setWeatherIcon(clear);
          break;
        case 'Rain':
          setWeatherIcon(rain);
          break;
        case 'Drizzle':
          setWeatherIcon(drizzle);
          break;
        case 'Mist':
          setWeatherIcon(mist);
          break;
        default:
          setWeatherIcon('');
          break;
      }
    }
  };

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
          },
          () => {
            setError(true);
          }
        );
      } else {
        setError(true);
      }
    };

    getLocation();
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <div>
      {/* Menu colapsado em dispositivos móveis */}
      <div className="mobile-header">
        <div className="toggle-button-mobile" onClick={toggleMobileMenu}>
          <BsList className="toggle-icon-mobile" />
        </div>
      </div>

      <div className={`card ${isCollapsed ? 'collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="toggle-button" onClick={toggleCollapse}>
          <BsList className="toggle-icon" />
        </div>

        {error && (
          <div className="error">
            <p>Não foi possível encontrar a localização.</p>
          </div>
        )}

        {/* Exibir conteúdo do painel somente se não estiver colapsado */}
        {!isCollapsed && weatherData && (
          <div className="weather">
            <img src={weatherIcon} className="weather-icon" alt="Weather Icon" />
            <h1 className="temp">{Math.round(weatherData.main.temp)}°C</h1>
            <h2 className="city">{weatherData.name}</h2>
            <div className="details">
              <div className="col">
                <img src={humidity} alt="Humidity Icon" />
                <div>
                  <p className="humidity">{weatherData.main.humidity}%</p>
                  <p className="humidade">Humidade</p>
                </div>
              </div>
              <div className="col">
                <img src={wind} alt="Wind Icon" />
                <div>
                  <p className="wind">{weatherData.wind.speed} km/h</p>
                  <p className="velocidade">Vento</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
