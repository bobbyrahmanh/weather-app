const apiKey = "bc25f90cdd2da7dbef9216fc2b5f9ae3";
const currentUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?units=metric&q=";

// --- DOM refs -----------------------------------------------------
const searchForm = document.getElementById("searchForm");
const cityInput = document.getElementById("cityInput");
const statusEl = document.getElementById("status");

const cityEl = document.getElementById("city");
const dateTimeEl = document.getElementById("dateTime");
const weatherIcon = document.getElementById("weatherIcon");
const tempEl = document.getElementById("temp");
const conditionEl = document.getElementById("condition");

const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const feelsLikeEl = document.getElementById("feelsLike");
const pressureEl = document.getElementById("pressure");
const visibilityEl = document.getElementById("visibility");
const sunEl = document.getElementById("sun");

const forecastStrip = document.getElementById("forecastStrip");

// --- Icon mapping ---------------------------------------------------
// Only 5 icon files exist in /images right now (clouds, clear, rain,
// drizzle, mist). Conditions without a dedicated asset fall back to the
// closest visual match. Drop in more PNGs (e.g. thunderstorm.png,
// snow.png) and add a line here to get a dedicated icon for them.
function iconForCondition(main) {
  const map = {
    Clouds: "clouds.png",
    Clear: "clear.png",
    Rain: "rain.png",
    Drizzle: "drizzle.png",
    Mist: "mist.png",
    Thunderstorm: "rain.png",
    Snow: "mist.png",
    Haze: "mist.png",
    Fog: "mist.png",
    Smoke: "mist.png",
    Dust: "mist.png",
    Sand: "mist.png",
  };
  return "images/" + (map[main] || "clouds.png");
}

function formatTime(unixSeconds, timezoneOffsetSeconds) {
  const d = new Date((unixSeconds + timezoneOffsetSeconds) * 1000);
  return d.toISOString().substring(11, 16);
}

function setStatus(message, isError) {
  if (!message) {
    statusEl.hidden = true;
    return;
  }
  statusEl.hidden = false;
  statusEl.textContent = message;
  statusEl.classList.toggle("error", Boolean(isError));
}

// --- Rendering --------------------------------------------------------
function renderCurrent(data) {
  cityEl.textContent = `${data.name}, ${data.sys.country}`;
  dateTimeEl.textContent = new Date().toLocaleString(undefined, {
    weekday: "long",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  tempEl.textContent = Math.round(data.main.temp) + "°";
  conditionEl.textContent = data.weather[0].description;
  weatherIcon.src = iconForCondition(data.weather[0].main);
  weatherIcon.alt = data.weather[0].description;

  humidityEl.innerHTML = `${data.main.humidity}<small>%</small>`;
  windEl.innerHTML = `${Math.round(data.wind.speed * 3.6)}<small>km/h</small>`;
  feelsLikeEl.innerHTML = `${Math.round(data.main.feels_like)}<small>°</small>`;
  pressureEl.innerHTML = `${data.main.pressure}<small>hPa</small>`;
  visibilityEl.innerHTML = `${(data.visibility / 1000).toFixed(1)}<small>km</small>`;

  const sunrise = formatTime(data.sys.sunrise, data.timezone);
  const sunset = formatTime(data.sys.sunset, data.timezone);
  sunEl.textContent = `${sunrise} · ${sunset}`;
}

function renderForecast(list) {
  // The free /forecast endpoint returns one entry every 3 hours.
  // Pick the entry closest to midday for each of the next 5 days.
  const middayEntries = list.filter((entry) => entry.dt_txt.includes("12:00:00")).slice(0, 5);

  forecastStrip.innerHTML = "";
  middayEntries.forEach((entry, i) => {
    const day = document.createElement("div");
    day.className = i === 0 ? "forecast-day today" : "forecast-day";

    const label = new Date(entry.dt * 1000).toLocaleDateString(undefined, { weekday: "short" });

    day.innerHTML = `
      <div class="day-label">${label}</div>
      <img src="${iconForCondition(entry.weather[0].main)}" alt="${entry.weather[0].description}">
      <div class="day-temps">${Math.round(entry.main.temp_max)}° <span class="lo">${Math.round(entry.main.temp_min)}°</span></div>
    `;
    forecastStrip.appendChild(day);
  });
}

// --- Main fetch ---------------------------------------------------------
async function checkWeather(city) {
  if (!city || !city.trim()) return;
  setStatus("Loading…");

  try {
    const [currentRes, forecastRes] = await Promise.all([
      fetch(`${currentUrl}${city}&appid=${apiKey}`),
      fetch(`${forecastUrl}${city}&appid=${apiKey}`),
    ]);

    const currentData = await currentRes.json();
    const forecastData = await forecastRes.json();

    if (String(currentData.cod) !== "200") {
      setStatus(currentData.message || "City not found.", true);
      return;
    }

    renderCurrent(currentData);
    if (String(forecastData.cod) === "200") {
      renderForecast(forecastData.list);
    }
    setStatus(null);
  } catch (err) {
    console.error("Failed to fetch weather:", err);
    setStatus("Something went wrong fetching the weather. Check the console.", true);
  }
}

// --- Events ---------------------------------------------------------
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  checkWeather(cityInput.value);
});

// Load a default city on first paint so the dashboard never looks empty
checkWeather("Jakarta");
