const apiKey = '2c968b7c333349a7b67133121232502';
const header = document.querySelector('.header');
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');

function showCard ({name, country, temp, condition}) {
          const html = `
            <div class="card">
              <h2 class="card-city">
                ${name}<span>${country}</span>
              </h2>
              <div class="card-weather">${temp}</div>
              <img src="./img/example.png" alt="Weather">
              <div class="card-description">${condition}</div>
            </div>
          `;

          header.insertAdjacentHTML('afterEnd', html);
        }

function removeCard() {
  const prevCard = document.querySelector('.card');
  if (prevCard) prevCard.remove();
}

function showError (errorMessage) {
  const html = `<div class="card">${errorMessage}</div>`;
  header.insertAdjacentHTML('afterEnd', html);
}



async function getWeather(city) {
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

form.onsubmit = async function (event) {
  event.preventDefault();

  let city = input.value.trim();

  const data = await getWeather(city);

  if (data.error) {
    removeCard();
    showError(data.error.message);
  } else {
    removeCard();
    const weatherData = {
      name: data.location.name,
      country: data.location.country,
      temp: data.current.temp_c,
      condition: data.current.condition.text
    } 

    showCard(weatherData);
  }
}