class App {
  static init() {
    const searchBtn = document.getElementById('search-btn');
    // Default location is Lahore
    this.searchWeather("Lahore");

    searchBtn.addEventListener('click', (event) => {
      event.preventDefault();
      this.searchWeather();

    });
  }
  static searchWeather(address) {
    const searchInput = document.getElementById('search-inp');
    const textContent = document.getElementById('text-content');
    const error = document.querySelector('.error');

    textContent.classList.toggle('hide');
    this.showLoading();

    let url;
    if (address)  {
      url = `/weather?address=${address}`;
    } else {
      url = `/weather?address=${searchInput.value}`;
    }

    this.fetchData(url, (data)=> {
      if (data.error) {
        this.showLoading();
        error.textContent = data.error;
        error.classList.toggle("hide");
      }
      else {
        this.showLoading();
        this.setParamsToDisplay(data);
        textContent.classList.toggle('hide');
      }
    });
  }
  static fetchData(url, callback) {
    // this fetch function is builint
    fetch(url).then((response)=> {
      response.json().then((data)=>{
        callback(data);
      });
    });
  }
  static setParamsToDisplay(data) {
    const area = document.getElementById('location');
    const temprature = document.getElementById('temprature');
    const humidity = document.getElementById('humidity');
    const visibility = document.getElementById('visibility');

    area.innerHTML = `
      ${data.address.charAt(0).toUpperCase() + data.address.slice(1).toLowerCase()}<sup class="symbol">${data.country_tag}</sup>
    `;
    temprature.innerHTML = `
      ${data.temprature.toFixed(0)}<span class="symbol">C°</span>
    `;
    humidity.innerHTML = `
      ${data.humidity}<span class="symbol">%</span>
    `;
    visibility.innerHTML = `
      ${data.visibility}<span class="symbol">km</span>
    `;
  }
  static showLoading() {
    const loading = document.querySelector('img#loading');
    loading.classList.toggle('hide');
  }
}
App.init();