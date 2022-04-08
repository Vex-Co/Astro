const searchInput = document.getElementById('search-inp');
const searchBtn = document.getElementById('search-btn');

const fetchData = (url, callback) => {
  // this fetch function is builint
  fetch(url).then((response)=> {
    response.json().then((data)=>{
      callback(data);
    });
  });
}

searchBtn.addEventListener('click', (event) => {
  event.preventDefault();
  fetchData(`http://localhost:3000/weather?address=${searchInput.value}`, (data)=> {
    if (data.error) {
      console.log(data.error)
    }
    else {
      console.log(data)
    }
  });
});