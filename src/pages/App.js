import { useState } from "react";
import DateBuilder from "../components/DateBuilder";
import styles from "../styles/App.module.css";
import Link from "next/link";

const api = {
  base: "https://api.openweathermap.org/data/2.5/",
  key: "2d77c6a3bf59adc6b5f4325ab5586403",
};

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main className={styles.main}>
        <div className={styles.searchBox}>
          <input
            type="text"
            className={styles.searchBar}
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className={styles.locationBox}>
              <div className={styles.location}>
                {weather.name}, {weather.sys.country}
              </div>
              <div className={styles.date}>
                <DateBuilder />
              </div>
            </div>

            <div className={styles.weatherBox}>
              <div className={styles.temp}>
                {Math.round(weather.main.temp)}°c
              </div>
              <div className={styles.weather}>{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
        <div className={styles.author}>
          <a href="https://github.com/Trecto34">Adan De Oliveira</a>
        </div>
      </main>
    </div>
  );
};

export default App;
