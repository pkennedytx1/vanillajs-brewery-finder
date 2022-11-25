// We are using an open API! No key needed!
function getBreweryDataByName(searchQuery) {
    fetch(`https://api.openbrewerydb.org/breweries?by_name=${searchQuery}`)
        .then(response => response.json())
        .then((json) => {
            document.getElementById('results').innerHTML = "";
            json.forEach((brewery) => {
                const breweryText = {
                    name: brewery.name,
                    state: brewery.state,
                    website_url: brewery.website_url,
                }
                displayResults(breweryText);
            })
        })
        .catch(err => console.error(err));
    
}

function getBreweryDataByCity(searchQuery) {
    fetch(`https://api.openbrewerydb.org/breweries?by_city=${searchQuery}`)
        .then(response => response.json())
        .then((json) => {
            document.getElementById('results').innerHTML = "";
            json.forEach((brewery, i) => {
                const breweryText = {
                    name: brewery.name,
                    state: brewery.state,
                    website_url: brewery.website_url,
                }
                displayResults(breweryText);
            })
        })
        .catch(err => console.error(err));
}

// Allows us to use the enter key to search a param
const input = document.getElementById('brewery-serach-text');

input.addEventListener('keypress', (event) => {
    if(event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('search-brewery-button').click();
    };
});

function getBreweryData() {
    const searchQuery = document.getElementById('brewery-serach-text').value;
    if (!searchQuery) {
        const errorMessage = document.getElementById('error-message');
        return errorMessage.innerText = "Please provide a search param"; 
    } else {
        document.getElementById('error-message').innerHTML = "";
    }
    const searchParam = document.querySelector('input[name="search-type"]:checked').value;
    document.getElementById('results').innerHTML = `<div class="d-flex justify-content-center"><div class="spinner-border text-danger" role="status"><span class="visually-hidden">Loading...</span></div></div>`;
    if (searchParam === "name") {
        getBreweryDataByName(searchQuery);
    } else {
        getBreweryDataByCity(searchQuery);
    }
}

function displayResults(breweryText) {
    const resultsContainer = document.createElement("div");
    resultsContainer.setAttribute('class', 'col-sm-12 col-md-6 col-lg-4')
    resultsContainer.innerHTML = `<div class="card" style="width: auto; min-height: 150px; display: flex; margin-bottom: 18px;">
    <div class="card-body">
      <h5 class="card-title">${breweryText.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${breweryText.state}</h6>
      <a href="${breweryText.website_url}" target="_blank" class="card-link">${breweryText.name} Website</a>
    </div>
  </div>`
  document.getElementById('results').appendChild(resultsContainer);
}

// Todo: Display only the frist 10 results in the DOM with basic info.

// BONUS: Put together pagination.