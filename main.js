const apiKey = '2c968b7c333349a7b67133121232502';

const header = document.querySelector('.header');
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');

function removeCard() {
  const prevCard = document.querySelector('.card');
  if (prevCard) prevCard.remove();
}

function showError (errorMessage) {
  const html = `<div class="card">${errorMessage}</div>`;
  header.insertAdjacentHTML('afterEnd', html);
}

form.onsubmit = function (event) {
  event.preventDefault();

  let city = input.value.trim();
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  fetch (url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        removeCard();
        showError(data.error.message);
      } else {
        removeCard();
        showCard(data.location.name, 
                  data.location.country,
                  data.current.temp_c,
                  data.current.condition.text);

        function showCard (name, country, temp, condition) {
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
        
      }
    })
}