// We are using an open API! No key needed!
function getBreweryDataByName(searchQuery) {
    fetch(`https://api.openbrewerydb.org/breweries/search?query=${searchQuery}`)
        .then(response => response.json())
        .then((json) => {
            json.forEach((brewery, i) => {
                const breweryText = {
                    name: brewery.name,
                    state: brewery.state,
                    website_url: brewery.website_url,
                }
                displayResults(breweryText);
            })
        });
    
}

function getBreweryDataByCity(searchQuery) {
    fetch(`https://api.openbrewerydb.org/breweries?by_city=${searchQuery}`)
        .then(response => response.json())
        .then((json) => {
            json.forEach((brewery, i) => {
                const breweryText = {
                    name: brewery.name,
                    state: brewery.state,
                    website_url: brewery.website_url,
                }
                displayResults(breweryText);
            })
        });
}

function getBreweryData() {
    const searchQuery = document.getElementById('brewery-serach-text').value;
    if (!searchQuery) {
        const errorMessage = document.getElementById('error-message');
        errorMessage.innerText = "Please provide a search param"; 
    } else {
        document.getElementById('error-message').innerHTML = "";
    }
    const searchParam = document.querySelector('input[name="search-type"]:checked').value;
    document.getElementById('results').innerHTML = "";
    if (searchParam === "name") {
        getBreweryDataByName(searchQuery);
    } else {
        getBreweryDataByCity(searchQuery);
    }
}

function displayResults(breweryText) {
    const resultsContainer = document.createElement("div");
    resultsContainer.innerHTML = `<div class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${breweryText.name}</h5>
      <h6 class="card-subtitle mb-2 text-muted">${breweryText.state}</h6>
      <a href="${breweryText.website_url}" target="_blank" class="card-link">${breweryText.name} Website</a>
    </div>
  </div>`
  document.getElementById('results').appendChild(resultsContainer);
}

// Todo: Need to make the getBreweryData function execute on search as well as take in a query and apply it to the request.

// Todo: Add another fetch to grab brewerydataby city

// Todo: Display only the frist 10 results in the DOM with basic info.

// BONUS: Put together pagination.