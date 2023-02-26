const apiKey = '2c968b7c333349a7b67133121232502';
const header = document.querySelector('.header');
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');

form.onsubmit = function (event) {
  event.preventDefault();
  let city = input.value.trim();

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const html = `
        <div class="card">
          <h2 class="card-city">${data.location.name}<span>${data.location.country}</span></h2>
          <div class="card-weather">${data.current.temp_c}</div>
          <img src="./img/example.png" alt="Weather">
          <div class="card-description">${data.current.condition.text}</div>
        </div>
      `;

      header.insertAdjacentHTML('afterend', html);
    })
}