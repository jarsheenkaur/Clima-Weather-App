import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import DateTimeAndLocation from './components/DateTimeAndLocation';
import TempAndWeather from './components/TempAndWeather';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/WeatherAPIService';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [query, setQuery] = useState ({q: 'indore'})
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
  const fetchWeather = async () => {
    const message = query.q ? query.q : "Current Location";
    toast.info('Fetching Weather for ' + message)

    await getFormattedWeatherData({...query, units}).then(data => { 
      toast.success(`Successfully Fetched Weather for ${data.name}, ${data.country}`);
      setWeather(data);
    });
  };
  fetchWeather();
  },[query, units]);

  return (
    <div className="bg-[url('https://source.unsplash.com/1600x900/?nature')] bg-cover h-fit">
      <div className="mx-auto max-w-screen-md mt-0 py-5 px-32 bg-black h-fit shadow-xl shadow-gray-500 bg-opacity-40">
      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>
      {weather && (
      <div>
        <DateTimeAndLocation weather = {weather}/>
        <TempAndWeather weather = {weather}/>
        <Forecast title='HOURLY WEATHER FORECAST' items={weather.hourly}/>
        <Forecast title='7-DAY WEATHER FORECAST'items={weather.daily}/>
      </div>
      )}
      <ToastContainer autoClose={2000} theme='colored' newestOnTop={true} className='capitalize'/>
    </div>
  </div>
  );
}

export default App;
