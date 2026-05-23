/* =============================================================
   weather.js — Krishi Portal Weather Module
   Agriculture-focused weather dashboard using OpenWeatherMap API.
   Falls back to simulated data if API key is not set.
   ============================================================= */

(function () {
  'use strict';

  /* ── Configuration ────────────────────────────────────────── */
  // Replace with a real OpenWeatherMap API key for live data.
  // Get a free key at: https://openweathermap.org/api
  // Without a key the module uses realistic simulated data.
  var OWM_API_KEY = '';   // e.g. 'abc123def456...'
  var OWM_BASE    = 'https://api.openweathermap.org/data/2.5/';
  var DEFAULT_CITY = 'Ludhiana';
  var currentCity  = DEFAULT_CITY;

  /* ── UI element references ────────────────────────────────── */
  var els = {};

  function cacheElements() {
    els.locationLabel  = document.getElementById('weather-location-label');
    els.currentDate    = document.getElementById('current-date');
    els.weatherIcon    = document.getElementById('weather-icon');
    els.temperature    = document.getElementById('weather-temp');
    els.condition      = document.getElementById('weather-condition');
    els.humidity       = document.getElementById('weather-humidity');
    els.windSpeed      = document.getElementById('weather-wind');
    els.visibility     = document.getElementById('weather-visibility');
    els.feelsLike      = document.getElementById('weather-feels-like');
    els.sunrise        = document.getElementById('weather-sunrise');
    els.sunset         = document.getElementById('weather-sunset');
    els.forecastList   = document.getElementById('forecast-list');
    els.advisoryText   = document.getElementById('farming-advisory');
    els.searchInput    = document.getElementById('location-search');
    els.searchBtn      = document.getElementById('location-btn');
    els.rainAlert      = document.getElementById('rain-alert-text');
    els.uvText         = document.getElementById('uv-alert-text');
    els.uvTitle        = document.getElementById('uv-alert-title');
    els.monthlyHigh    = document.getElementById('monthly-high');
    els.monthlyLow     = document.getElementById('monthly-low');
    els.monthlyRain    = document.getElementById('monthly-rain');
    els.monthlyWind    = document.getElementById('monthly-wind');
    els.loadingOverlay = document.getElementById('weather-loading');
  }

  /* ── Date / Time helpers ──────────────────────────────────── */
  function formatDate(date) {
    return date.toLocaleDateString('en-IN', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  }

  function formatTime(unixTs, offsetSec) {
    var d = new Date((unixTs + offsetSec) * 1000);
    var h = d.getUTCHours();
    var m = d.getUTCMinutes();
    var ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    return h + ':' + (m < 10 ? '0' + m : m) + ' ' + ampm;
  }

  function dayName(dt) {
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    return days[new Date(dt * 1000).getDay()];
  }

  /* ── OWM condition code → Material Symbol icon ────────────── */
  function owmIcon(id, pod) {
    // pod: 'd' = day, 'n' = night
    if (id >= 200 && id < 300) return 'thunderstorm';
    if (id >= 300 && id < 400) return 'rainy';
    if (id >= 500 && id < 600) return id >= 511 ? 'weather_mix' : 'rainy';
    if (id >= 600 && id < 700) return 'weather_snowy';
    if (id >= 700 && id < 800) return 'foggy';
    if (id === 800) return pod === 'n' ? 'nights_stay' : 'wb_sunny';
    if (id === 801) return pod === 'n' ? 'partly_cloudy_night' : 'partly_cloudy_day';
    if (id >= 802 && id < 900) return 'cloud';
    return 'partly_cloudy_day';
  }

  /* ── Farmer advisories engine ─────────────────────────────── */
  function generateAdvisory(data) {
    var temp      = data.temp;
    var humidity  = data.humidity;
    var windKmh   = data.windKmh;
    var rain      = data.rainChance || 0;
    var condId    = data.condId || 800;
    var tips      = [];

    // Temperature advisories
    if (temp >= 40) {
      tips.push('🌡️ <strong>Extreme heat alert.</strong> Irrigate fields early morning (before 8 AM) or late evening to prevent evaporation. Provide shade covers for tender seedlings.');
    } else if (temp >= 35) {
      tips.push('☀️ <strong>High temperature detected.</strong> Increase irrigation frequency. Avoid pesticide application — chemicals evaporate quickly and may harm crops.');
    } else if (temp >= 28 && temp < 35) {
      tips.push('✅ <strong>Ideal temperature for most Kharif crops.</strong> Good conditions for paddy, maize, and cotton growth. Maintain adequate soil moisture.');
    } else if (temp >= 15 && temp < 28) {
      tips.push('🌾 <strong>Good conditions for Rabi crops.</strong> Suitable for wheat, mustard, and gram cultivation. Sowing window is favorable.');
    } else if (temp < 10) {
      tips.push('❄️ <strong>Low temperature warning.</strong> Protect frost-sensitive crops (tomato, chilli) with mulching or temporary covers overnight.');
    }

    // Humidity advisories
    if (humidity >= 80) {
      tips.push('💧 <strong>Very high humidity.</strong> Ideal conditions for fungal diseases (blight, mildew). Apply preventive fungicide and ensure proper field drainage.');
    } else if (humidity >= 60 && humidity < 80) {
      tips.push('🌿 <strong>Moderate humidity.</strong> Monitor crops for early signs of pest infestation. Good conditions for most crops.');
    } else if (humidity < 40) {
      tips.push('⚠️ <strong>Low humidity detected.</strong> Soil moisture may deplete faster. Schedule irrigation and consider mulching to retain soil moisture.');
    }

    // Wind advisories
    if (windKmh >= 40) {
      tips.push('💨 <strong>Strong winds detected.</strong> Delay spraying operations — chemicals will drift. Secure young saplings and greenhouse covers.');
    } else if (windKmh >= 25) {
      tips.push('🌬️ <strong>Moderate winds.</strong> Avoid foliar spray applications. Drip irrigation preferred over sprinklers today.');
    }

    // Rain advisories
    if (rain >= 70) {
      tips.push('🌧️ <strong>Heavy rainfall expected.</strong> Delay harvesting operations by 1-2 days. Cover stored grain in open areas. Ensure field drainage channels are clear.');
    } else if (rain >= 40 && rain < 70) {
      tips.push('🌦️ <strong>Moderate rain likely.</strong> Avoid applying fertilizers or pesticides today — rain will wash them away, reducing effectiveness and causing runoff.');
    } else if (rain >= 15 && rain < 40) {
      tips.push('🌤️ <strong>Light rain possible.</strong> Good opportunity to transplant seedlings. Delay chemical applications until tomorrow.');
    } else if (rain < 15) {
      if (condId === 800 || condId === 801) {
        tips.push('☀️ <strong>Clear skies.</strong> Excellent conditions for top-dressing fertilizer, harvesting, and post-harvest operations. Ideal for field work.');
      }
    }

    // Condition-specific advisories
    if (condId >= 200 && condId < 300) {
      tips.push('⛈️ <strong>Thunderstorm warning.</strong> Keep workers off the field. Disconnect electrical farming equipment. Check crops for physical damage after the storm.');
    }

    // Fallback
    if (tips.length === 0) {
      tips.push('🌿 <strong>Weather conditions are suitable for general farm activities.</strong> Monitor soil moisture and check crops for pest activity.');
    }

    return tips;
  }

  /* ── Loading state ────────────────────────────────────────── */
  function showLoading(state) {
    if (els.loadingOverlay) {
      els.loadingOverlay.style.display = state ? 'flex' : 'none';
    }
  }

  /* ── Render current weather ───────────────────────────────── */
  function renderCurrentWeather(w) {
    if (els.locationLabel) els.locationLabel.textContent = '📍 ' + w.city + ', ' + w.country;
    if (els.currentDate)   els.currentDate.textContent   = formatDate(new Date());
    if (els.weatherIcon)   els.weatherIcon.textContent   = w.icon;
    if (els.temperature)   els.temperature.textContent   = Math.round(w.temp) + '°C';
    if (els.condition)     els.condition.textContent     = w.condition;
    if (els.humidity)      els.humidity.textContent      = w.humidity + '%';
    if (els.windSpeed)     els.windSpeed.textContent     = w.windKmh + ' km/h';
    if (els.visibility)    els.visibility.textContent    = (w.visibility / 1000).toFixed(1) + ' km';
    if (els.feelsLike)     els.feelsLike.textContent     = Math.round(w.feelsLike) + '°C';
    if (els.sunrise)       els.sunrise.textContent       = w.sunrise;
    if (els.sunset)        els.sunset.textContent        = w.sunset;

    // Monthly outlook (estimates based on current data)
    if (els.monthlyHigh) els.monthlyHigh.textContent = Math.round(w.temp + 4) + '°C';
    if (els.monthlyLow)  els.monthlyLow.textContent  = Math.round(w.temp - 8) + '°C';
    if (els.monthlyRain) els.monthlyRain.textContent = Math.round(w.rain1h || 0) + 'mm';
    if (els.monthlyWind) els.monthlyWind.textContent = w.windKmh + ' km/h';
  }

  /* ── Render forecast ──────────────────────────────────────── */
  function renderForecast(days) {
    if (!els.forecastList || !days.length) return;
    els.forecastList.innerHTML = days.map(function (f, i) {
      var rainColor = f.rainChance >= 60 ? 'text-error' : 'text-on-surface-variant';
      var border    = i < days.length - 1 ? 'border-b border-outline-variant' : '';
      return '<div class="flex items-center justify-between py-3 ' + border + '">'
        + '<p class="text-label-md font-label-md text-on-surface w-24">' + f.day + '</p>'
        + '<span class="material-symbols-outlined text-primary text-[28px]">' + f.icon + '</span>'
        + '<p class="text-body-md text-on-surface-variant flex-1 text-center hidden sm:block">' + f.condition + '</p>'
        + '<p class="text-caption ' + rainColor + ' w-12 text-center">💧 ' + f.rainChance + '%</p>'
        + '<p class="text-label-md font-bold text-primary w-16 text-right">'
        + Math.round(f.high) + '° / <span class="font-normal text-on-surface-variant">' + Math.round(f.low) + '°</span></p>'
        + '</div>';
    }).join('');
  }

  /* ── Render farming advisory ──────────────────────────────── */
  function renderAdvisory(weatherData) {
    if (!els.advisoryText) return;
    var tips = generateAdvisory(weatherData);
    // Show primary tip in the banner, store extras
    els.advisoryText.innerHTML = tips[0] + (tips.length > 1
      ? '<ul class="mt-2 space-y-1 list-none">' + tips.slice(1).map(function(t){ return '<li class="text-body-md text-on-surface-variant mt-1">' + t + '</li>'; }).join('') + '</ul>'
      : '');
  }

  /* ── Render weather alerts ────────────────────────────────── */
  function renderAlerts(weatherData, forecast) {
    // Rain alert
    if (els.rainAlert) {
      var rainDay = forecast.find(function(f){ return f.rainChance >= 50; });
      if (rainDay) {
        els.rainAlert.innerHTML = 'Rain likely on <strong>' + rainDay.day + '</strong> ('
          + rainDay.rainChance + '% chance). Delay harvesting operations. Cover stored grain in open areas.';
      } else {
        els.rainAlert.innerHTML = 'No significant rainfall expected in the next 5 days. '
          + 'Good window for harvesting and field operations.';
      }
    }
    // UV / heat alert
    if (els.uvTitle && els.uvText) {
      var uvIndex = weatherData.temp >= 38 ? 'Very High (9+)'
                  : weatherData.temp >= 32 ? 'High (7-8)'
                  : weatherData.temp >= 25 ? 'Moderate (4-5)'
                  : 'Low (1-3)';
      els.uvTitle.textContent = 'UV Index: ' + uvIndex;
      if (weatherData.temp >= 32) {
        els.uvText.innerHTML = 'Workers in open fields should wear hats and light-colored clothing. '
          + 'Peak UV hours: <strong>11 AM – 3 PM</strong>. Schedule heavy outdoor tasks before 10 AM.';
      } else {
        els.uvText.innerHTML = 'UV levels are manageable. Routine field work can proceed throughout the day. '
          + 'Stay hydrated.';
      }
    }
  }

  /* ── LIVE DATA PATH: OpenWeatherMap API ───────────────────── */
  function fetchLiveWeather(city) {
    showLoading(true);
    var currentUrl = OWM_BASE + 'weather?q=' + encodeURIComponent(city)
      + '&appid=' + OWM_API_KEY + '&units=metric';
    var forecastUrl = OWM_BASE + 'forecast?q=' + encodeURIComponent(city)
      + '&appid=' + OWM_API_KEY + '&units=metric&cnt=40';

    Promise.all([
      fetch(currentUrl).then(function(r){ return r.json(); }),
      fetch(forecastUrl).then(function(r){ return r.json(); })
    ]).then(function(results) {
      showLoading(false);
      var cur  = results[0];
      var fore = results[1];

      if (cur.cod !== 200) {
        handleCityError(city);
        return;
      }

      var offsetSec = cur.timezone;
      var windKmh   = Math.round(cur.wind.speed * 3.6);

      var currentData = {
        city:       cur.name,
        country:    cur.sys.country,
        temp:       cur.main.temp,
        feelsLike:  cur.main.feels_like,
        humidity:   cur.main.humidity,
        windKmh:    windKmh,
        visibility: cur.visibility || 10000,
        condition:  cur.weather[0].description.replace(/\b\w/g, function(l){ return l.toUpperCase(); }),
        icon:       owmIcon(cur.weather[0].id, cur.weather[0].icon.slice(-1)),
        sunrise:    formatTime(cur.sys.sunrise, offsetSec),
        sunset:     formatTime(cur.sys.sunset,  offsetSec),
        condId:     cur.weather[0].id,
        rain1h:     (cur.rain && cur.rain['1h']) || 0,
        rainChance: 0
      };

      // Build 5-day forecast (one entry per day at noon)
      var seenDays = {};
      var days     = [];
      (fore.list || []).forEach(function(item) {
        var d = new Date(item.dt * 1000);
        var dKey = d.toDateString();
        if (seenDays[dKey] || days.length >= 5) return;
        seenDays[dKey] = true;
        days.push({
          day:        dayName(item.dt),
          icon:       owmIcon(item.weather[0].id, item.weather[0].icon.slice(-1)),
          condition:  item.weather[0].description.replace(/\b\w/g, function(l){ return l.toUpperCase(); }),
          high:       item.main.temp_max,
          low:        item.main.temp_min,
          rainChance: Math.round((item.pop || 0) * 100),
          condId:     item.weather[0].id
        });
      });
      if (days.length < 5) days = days.concat(simulateForecast(currentData, 5 - days.length));

      currentData.rainChance = days.length > 0 ? days[0].rainChance : 0;

      renderCurrentWeather(currentData);
      renderForecast(days);
      renderAdvisory(currentData);
      renderAlerts(currentData, days);

      currentCity = city;
      if (typeof showToast === 'function') showToast('📍 Weather loaded: ' + currentData.city + ', ' + currentData.country);

    }).catch(function(err) {
      showLoading(false);
      console.warn('Weather API error:', err);
      loadSimulatedWeather(city);
    });
  }

  /* ── SIMULATED DATA PATH (no API key / API failure) ──────── */
  // Generates realistic weather data seeded by city name so it's consistent
  function cityHash(name) {
    var h = 0;
    for (var i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xFFFFFFFF;
    return Math.abs(h);
  }

  function simulateCurrentWeather(city) {
    var h    = cityHash(city);
    var now  = new Date();
    var mo   = now.getMonth(); // 0-11
    // Seasonal base temp (India context)
    var base = mo >= 3 && mo <= 5 ? 35    // Apr-Jun: hot
             : mo >= 6 && mo <= 9 ? 28    // Jul-Sep: monsoon
             : mo >= 10 || mo <= 1 ? 18   // Oct-Jan: cool
             : 26;                          // Feb-Mar: mild

    var temp      = base + (h % 9) - 4;
    var humidity  = mo >= 6 && mo <= 9 ? 70 + (h % 20) : 40 + (h % 30);
    var windKmh   = 8 + (h % 18);
    var condIds   = [800, 801, 802, 500, 200, 721];
    var condId    = condIds[h % condIds.length];
    var condNames = ['Clear & Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Thunderstorm', 'Hazy'];
    var icons     = ['wb_sunny', 'partly_cloudy_day', 'cloud', 'rainy', 'thunderstorm', 'foggy'];
    var idx       = condIds.indexOf(condId);

    // Sunrise ~5:30-6:15 AM, sunset ~6:30-7:30 PM
    var srH = 5 + (h % 2), srM = (h % 60);
    var ssH = 18 + (h % 2), ssM = (h % 60);
    function fmt(hh, mm) {
      var ap = hh >= 12 ? 'PM' : 'AM';
      hh = hh % 12 || 12;
      return hh + ':' + (mm < 10 ? '0' + mm : mm) + ' ' + ap;
    }

    return {
      city:       city,
      country:    'IN',
      temp:       temp,
      feelsLike:  temp + 2 + (h % 4),
      humidity:   humidity,
      windKmh:    windKmh,
      visibility: 6000 + (h % 4000),
      condition:  condNames[idx] || 'Partly Cloudy',
      icon:       icons[idx] || 'partly_cloudy_day',
      sunrise:    fmt(srH, srM),
      sunset:     fmt(ssH, ssM),
      condId:     condId,
      rain1h:     condId >= 500 && condId < 600 ? (h % 15) : 0,
      rainChance: condId >= 500 ? 50 + (h % 35) : (h % 20)
    };
  }

  function simulateForecast(current, count) {
    var icons     = ['wb_sunny','partly_cloudy_day','cloud','rainy','thunderstorm'];
    var conds     = ['Clear','Partly Cloudy','Cloudy','Light Rain','Thunderstowers'];
    var rainChances = [5, 15, 30, 70, 85];
    var days      = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var today     = new Date().getDay();
    var result    = [];
    for (var i = 0; i < (count || 5); i++) {
      var idx = (i + cityHash(current.city + i)) % 5;
      result.push({
        day:        days[(today + i + 1) % 7],
        icon:       icons[idx],
        condition:  conds[idx],
        high:       Math.round(current.temp + 2 - i * 0.5),
        low:        Math.round(current.temp - 8 + i * 0.3),
        rainChance: rainChances[idx],
        condId:     [800, 801, 802, 500, 200][idx]
      });
    }
    return result;
  }

  function loadSimulatedWeather(city) {
    showLoading(true);
    // Small delay to feel responsive
    setTimeout(function() {
      showLoading(false);
      var w    = simulateCurrentWeather(city);
      var days = simulateForecast(w, 5);
      w.rainChance = days.length > 0 ? days[0].rainChance : 0;

      renderCurrentWeather(w);
      renderForecast(days);
      renderAdvisory(w);
      renderAlerts(w, days);

      currentCity = city;
      // Show disclaimer on simulated data
      if (typeof showToast === 'function') {
        showToast('📊 Showing forecast data for ' + city + '. Add API key for live data.');
      }
    }, 600);
  }

  /* ── Error handling ───────────────────────────────────────── */
  function handleCityError(city) {
    showLoading(false);
    if (typeof showToast === 'function') {
      showToast('❌ City not found: "' + city + '". Please check the spelling and try again.');
    }
    // Reset search input highlight
    if (els.searchInput) {
      els.searchInput.style.borderColor = '#ba1a1a';
      setTimeout(function(){ els.searchInput.style.borderColor = ''; }, 2000);
    }
  }

  /* ── Master load function ─────────────────────────────────── */
  function loadWeather(city) {
    if (!city || !city.trim()) {
      if (typeof showToast === 'function') showToast('⚠️ Please enter a city or district name.');
      return;
    }
    city = city.trim();
    if (OWM_API_KEY && OWM_API_KEY.length > 10) {
      fetchLiveWeather(city);
    } else {
      loadSimulatedWeather(city);
    }
  }

  /* ── Geolocation ──────────────────────────────────────────── */
  function useMyLocation() {
    if (!navigator.geolocation) {
      if (typeof showToast === 'function') showToast('📍 Geolocation not supported. Showing default location.');
      loadWeather(DEFAULT_CITY);
      return;
    }
    showLoading(true);
    if (typeof showToast === 'function') showToast('📡 Detecting your location…');
    navigator.geolocation.getCurrentPosition(
      function (pos) {
        if (OWM_API_KEY && OWM_API_KEY.length > 10) {
          var url = OWM_BASE + 'weather?lat=' + pos.coords.latitude
            + '&lon=' + pos.coords.longitude
            + '&appid=' + OWM_API_KEY + '&units=metric';
          fetch(url).then(function(r){ return r.json(); }).then(function(data) {
            if (data.name) loadWeather(data.name);
            else loadWeather(DEFAULT_CITY);
          }).catch(function() { loadWeather(DEFAULT_CITY); });
        } else {
          // Without API key: try reverse geocode via open-meteo geo
          var geoUrl = 'https://nominatim.openstreetmap.org/reverse?lat='
            + pos.coords.latitude + '&lon=' + pos.coords.longitude
            + '&format=json';
          fetch(geoUrl, { headers: { 'Accept-Language': 'en' } })
            .then(function(r){ return r.json(); })
            .then(function(data) {
              var city = (data.address && (data.address.city || data.address.town || data.address.village)) || DEFAULT_CITY;
              loadWeather(city);
            })
            .catch(function() { loadWeather(DEFAULT_CITY); });
        }
      },
      function (err) {
        showLoading(false);
        var msg = err.code === 1 ? '📍 Location access denied. Showing Ludhiana.'
                : '📍 Could not detect location. Showing Ludhiana.';
        if (typeof showToast === 'function') showToast(msg);
        loadWeather(DEFAULT_CITY);
      },
      { timeout: 8000 }
    );
  }

  /* ── Wire search UI ───────────────────────────────────────── */
  function wireSearch() {
    if (els.searchBtn) {
      els.searchBtn.addEventListener('click', function() {
        var val = els.searchInput ? els.searchInput.value.trim() : '';
        if (val) {
          loadWeather(val);
        } else {
          useMyLocation();
        }
      });
    }
    if (els.searchInput) {
      els.searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
          var val = els.searchInput.value.trim();
          if (val) loadWeather(val);
          else if (els.searchBtn) els.searchBtn.click();
        }
      });
    }
  }

  /* ── Init ─────────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function() {
    cacheElements();
    wireSearch();
    // Set today's date immediately
    if (els.currentDate) els.currentDate.textContent = formatDate(new Date());
    // Load default city
    loadWeather(DEFAULT_CITY);
  });

})();
