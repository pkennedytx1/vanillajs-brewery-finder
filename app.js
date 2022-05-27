// We are using an open API! No key needed!
function getBreweryData() {
    const searchQuery = document.getElementById('brewery-serach-text').value;
    
    fetch(`https://api.openbrewerydb.org/breweries/search?query=${searchQuery}`)
        .then(response => response.json())
        .then((json) => {
            console.log(json);
            json.forEach((brewery, i) => {
                const breweryText = {
                    name: brewery.name,
                    state: brewery.state,
                    website_url: brewery.website_url,
                }
                console.log(brewery.name);
                displayResults(breweryText);
            })
        });
    
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