'use client';

import { useEffect, useState } from "react";

type WeatherData = {
  location: {
    name: string;
    region: string;
    country: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    last_updated: string;
    humidity: number;
    wind_kph: number;
    wind_dir: string;
  };
};

const Home = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch("http://api.weatherapi.com/v1/current.json?key=c1e94a8f77954f04b8d13140240406&q=Tokyo&aqi=no");
        console.log(res); // デバッグ用に使用した
        const data = await res.json();
        setWeather(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };
    
    fetchWeather();
  },[])

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!weather) {
    return <div className="text-center">Error loading weather data.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-black text-blue-300">
      <h1 className="text-4xl font-bold mb-4">天気アプリ</h1>
      <div className="bg-white shadow-md rounded-lg p-4 max-w-md w-full text-black">
        <p className="text-lg">現在の {weather.location.name} の天気は {weather.current.temp_c} 度です。</p>
        <p className="text-lg">状態: {weather.current.condition.text}</p>
        <img src={`http:${weather.current.condition.icon}`} alt={weather.current.condition.text} className="mx-auto" />
        <p className="text-lg">湿度: {weather.current.humidity}%</p>
        <p className="text-lg">最終更新日: {weather.current.last_updated}</p>
      </div>
    </div>
  );
};

export default Home;