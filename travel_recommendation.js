const btnSearch = document.getElementById("btnSearch");
const btnClear = document.getElementById("btnClear");
const searchResults = document.getElementById("searchResult");
const homeContent = document.getElementById("homeContent");
function clearSearch() {
  document.getElementById("searchInput").value = "";
  homeContent.classList.remove("hidden");
  searchResults.innerHTML = ` `;
}
function travelSearch() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const resultDiv = document.getElementById("searchResult");
  homeContent.classList.add("hidden");
  resultDiv.innerHTML = "";

  if (input === "") {
    resultDiv.innerHTML = "Please enter a condition.";
    return;
  }
  fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      const termFound = Object.keys(data).includes(input);
      const term = data[input];
      if (termFound) {
        if (input === "countries") {
          const countries = term;
          for (let country of countries) {
            const container = document.createElement("div");
            container.className =
              " text-center mx-auto gap-4 flex justify-center flex-col";
            container.innerHTML += `
          <h2 class="text-2xl font-bold mb-2 text-center">${country.name}</h2>
            `;
            const cityContainer = document.createElement("div");
            cityContainer.className =
              "grid grid-cols-2 justify-center gap-8 my-4";

            for (let city of country.cities) {
              cityContainer.innerHTML += `
              <div class="card flex flex-col  size-42">
                <img class=" object-cover" src="./assets/${city.imageUrl}" alt="${city.name}" />
                <h4 class="text-lg font-bold">${city.name}</h4>
                <p class="text-sm">${city.description}</p>
               </div>
              `;
              container.appendChild(cityContainer);
              resultDiv.appendChild(container);
              resultDiv.className =
                "results display-results grid grid-cols-3 gap-8";
            }

            searchResults.classList.add("display-results");
          }
        } else if (input === "temples" || input === "beaches") {
          const temples = term;
          const container = document.createElement("div");
          container.className =
            " text-center mx-auto gap-4 flex justify-center flex-col";
          container.innerHTML += `
            <h2 class="text-2xl font-bold mb-2 text-center capitalize">${input}</h2>
            `;
          const templeContainer = document.createElement("div");
          templeContainer.className =
            "grid grid-cols-2 justify-center items-baseline  gap-8 my-4";

          for (let temple of temples) {
            templeContainer.innerHTML += `
              <div class="card flex flex-col  size-42">
              <h4 class="text-lg font-bold">${temple.name}</h4>
                <img class=" object-cover" src="./assets/${temple.imageUrl}" alt="${temple.name}" />
                <p class="text-sm">${temple.description}</p>
               </div>
              `;
            container.appendChild(templeContainer);
            resultDiv.appendChild(container);
            resultDiv.className =
              "results display-results grid grid-cols-2 gap-8";
          }
          return 
        }
      } else {
        resultDiv.innerHTML = "Result not found.";
        return 
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      resultDiv.innerHTML = "An error occurred while fetching data.";
    });
}

btnSearch.addEventListener("click", travelSearch);

btnClear.addEventListener("click", clearSearch);
