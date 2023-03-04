const loadApps = async (dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  displayApps(data.data.tools, dataLimit);
};

const displayApps = (apps, dataLimit) => {
  const appContainer = document.getElementById("app-container");

  const showAll = document.getElementById("show-all");
  if (dataLimit && apps.length > dataLimit) {
    apps = apps.slice(0, dataLimit);
  }

// clear previous content
  appContainer.innerHTML = ""; 

  apps.forEach((app) => {
    const appDiv = document.createElement("div");
    appDiv.classList.add("col");

    const featuresList = app.features.map((feature) => `<li>${feature}</li>`).join("");
    appDiv.innerHTML = `
        <div class="card p-4">
          <img src="${app.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h3 class="card-title fw-semibold">Features</h3>
            <ol class="card-text" type="1">${featuresList}</ol>              
            <hr>
          <div class="d-flex justify-content-between">
            <div class="title-calendar">
              <h3 class="card-title fw-semibold">${app.name}</h3>
              <p class="calendar"><span><i class="fa-solid fa-calendar-days"></i></span> ${app.published_in}</p>
            </div>
            <div class="arrow mt-3 rounded-circle">
              <i class="fa-solid fa-arrow-right"></i>
            </div>
          </div>
        </div>
      `;
    appContainer.appendChild(appDiv);
  });
};

// loader start
const processShow = (dataLimit) => {
  toggleSpinner(true);
  loadApps(dataLimit);
};

document.getElementById("show-all").addEventListener("click", function () {
  processShow();
});


// Loader stop
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("d-none");
  } 
  else {
    loaderSection.classList.add("d-none");
  }
};

// initially show only 6 cards
loadApps(6); 

