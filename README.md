# 🌤️ Weather App

A simple weather app built while learning JavaScript. Type in a city name and the app shows the current temperature, humidity, and wind speed using data from the [OpenWeatherMap API](https://openweathermap.org/api).


[Weather App screenshot](screenshots/screenshot.png)


## ✨ Features

- Search weather by city name (click the search button or press **Enter**)
- Displays temperature (°C), humidity (%), and wind speed (km/h)
- Weather icon changes automatically based on conditions: clear, clouds, rain, drizzle, and mist
- Clear error messages when a city isn't found, the API key is invalid, or the connection fails
- Responsive card-style layout

## 🛠️ Tech Stack

| Technology | Purpose |
| --- | --- |
| HTML5 | Page structure |
| CSS3 | Styling and layout |
| JavaScript (Vanilla) | App logic, `fetch`, `async/await` |
| OpenWeatherMap API | Weather data source |

## 📁 Project Structure

```
weather-app/
├── images/        # Weather and UI icons (clouds, clear, rain, humidity, wind, etc.)
├── index.html     # Main page (markup + JavaScript)
├── style.css      # App styling
└── README.md
```

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/bobbyrahmanh/weather-app.git
   cd weather-app
   ```

2. **Get a free API key** by signing up at [OpenWeatherMap](https://home.openweathermap.org/users/sign_up). A new key can take a few minutes to become active.

3. **Add your API key** in `index.html`:

   ```js
   const apiKey = "YOUR_API_KEY";
   ```

4. **Open `index.html`** in your browser, or run it with the *Live Server* extension in VS Code.

5. Enter a city name (e.g. `Yogyakarta`) and click the search button or press Enter.

## ⚙️ How It Works

1. The user enters a city name.
2. The `checkWeather(city)` function sends a request to:
   ```
   https://api.openweathermap.org/data/2.5/weather?units=metric&q={city}&appid={apiKey}
   ```
3. The returned JSON (city name, temperature, humidity, wind, weather condition) is rendered on the page.
4. Wind speed from the API (m/s) is converted to km/h.
5. The icon is chosen from `weather[0].main`: `Clouds`, `Clear`, `Rain`, `Drizzle`, or `Mist`.

## 🔒 Security Note

Never commit your real API key to a public repository.

- If a key was ever committed by accident, generate a new one and delete the old one in your OpenWeatherMap dashboard.
- For a production app, keep the key on the server side (backend or serverless function), not in frontend code.

## 🗺️ Roadmap

- [ ] Support more weather conditions (Snow, Thunderstorm, Fog, etc.)
- [ ] Multi-day forecast
- [ ] Automatic location detection (Geolocation)
- [ ] Move JavaScript into a separate file (`script.js`)
- [ ] Move the API key to a backend

## 🙏 Credits

- Weather data: [OpenWeatherMap](https://openweathermap.org/)

## 📄 License

This project was made for learning purposes. Add a license (e.g. MIT) if you'd like others to be able to reuse it.

---

Made by [@bobbyrahmanh](https://github.com/bobbyrahmanh)
