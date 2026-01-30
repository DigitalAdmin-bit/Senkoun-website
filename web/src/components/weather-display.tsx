"use client";

import { Cloud, CloudRain, Sun } from "lucide-react";

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
  rain?: {
    "1h": number;
  };
  name?: string;
  sys?: {
    country?: string;
  };
}

interface WeatherDisplayProps {
  data: WeatherData;
  lat: number;
  lon: number;
}

export function WeatherDisplay({ data, lat, lon }: WeatherDisplayProps) {
  const temp = Math.round(data.main.temp);
  const condition = data.weather[0].main;
  const description = data.weather[0].description;
  const humidity = data.main.humidity;
  const windSpeed = Math.round(data.wind.speed * 2.237); // m/s to mph
  const precipitation = data.rain ? Math.round(data.rain["1h"] * 100) : 0;

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "cloudy":
      case "clouds":
        return (
          <svg
            width="84"
            height="57"
            viewBox="0 0 84 57"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M55.2489 0C70.9178 0 83.6199 12.7021 83.6199 28.371C83.6199 43.708 71.4501 56.2002 56.2405 56.7226L56.2443 56.7421H17.4208L17.4237 56.7343C7.75638 56.4722 0 48.5542 0 38.8235C0 28.9274 8.02241 20.905 17.9186 20.905C21.3532 20.905 24.5619 21.8716 27.2881 23.5473C29.5785 10.1762 41.2244 0 55.2489 0Z"
              fill="url(#paint0_linear_2152_4860)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_2152_4860"
                x1="-3.9819"
                y1="20.4072"
                x2="123.439"
                y2="20.4072"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white" />
                <stop offset="0.5" stop-color="white" stop-opacity="0.627184" />
                <stop offset="1" stop-color="white" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>
        );

      case "rainy":
      case "rain":
      case "drizzle":
        return <CloudRain className="h-24 w-24" strokeWidth={1.5} />;
      case "sunny":
      case "clear":
        return <Sun className="h-24 w-24" strokeWidth={1.5} />;
      default:
        return <Cloud className="h-24 w-24" strokeWidth={1.5} />;
    }
  };

  const now = new Date();
  const dayName = now.toLocaleString("en-US", { weekday: "long" });
  const time = now.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="px-10 py-10 text-white h-full w-full flex flex-col justify-between">
      <div>
        <h1 className="text-4xl font-light tracking-tight font-body">
          Weather
        </h1>

        <div className="mb-8 mt-2">
          <p className="font-light">
            {dayName} {time}
          </p>
          <p className="font-light capitalize">{description}</p>
        </div>
      </div>
      <div className="flex-1" />
      <div>
        <div className="mb-3 flex items-center gap-5">
          <div className="flex items-center text-white">
            {getWeatherIcon(condition)}
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-6xl font-light">{temp}</span>
            <div className="flex flex-col gap-0.5">
              <span className="text-2xl font-light">°C</span>
            </div>
          </div>
        </div>

        <div className="font-light leading-relaxed text-[#FFFFFFB2] pt-6">
          Precipitation: {precipitation}%<br />
          Humidity: {humidity}%<br />
          Wind: {windSpeed} mph
          <br />
        </div>
      </div>
    </div>
  );
}
