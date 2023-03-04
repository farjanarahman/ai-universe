const loadApps = async (dataLimit) => {


  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  displayApps(data.data.tools, dataLimit);
};

//sorting
// let sortOrder = 1;

// document.getElementById('sorting').addEventListener('click', function(){
//   sortOrder *= -1;

//   processShow();
// });

const displayApps = (apps, dataLimit) => {
  // apps.sort((a, b) => sortOrder * (new Date(a.published_in) - new Date(b.published_in)));

  const appContainer = document.getElementById('app-container');
  const showAllButton = document.getElementById('show-all');

  if (dataLimit && apps.length > dataLimit) {
    apps = apps.slice(0, dataLimit);
  }

  // clear previous content
  appContainer.innerHTML = '';

  apps.forEach((app) => {
    console.log("appid",app.description);
    const appDiv = document.createElement('div');
    appDiv.classList.add('col');
    const featuresList = app.features.map((feature) => `<li>${feature}</li>`).join('');
    appDiv.innerHTML = `
    <div class="card p-4 h-100 rounded-3">
      <img src="${app.image}" class="card-img-top rounded-4" alt="...">
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
          <button onclick="loadAppDetails(${app.id})" data-bs-toggle="modal" data-bs-target="#appModal"><i class="fa-solid fa-arrow-right text-danger" data-bs-toggle="modal" data-bs-target="#appModal"></i></buttton>
        </div>
      </div>
    </div>
    <!-- Modal -->
  <div class="modal" id="appModal" tabindex="-1" aria-labelledby="appModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div>
          <button type="button" class="btn-close text-danger" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body d-flex">
          <div>
            <h3 class="app-des">${app.description}</h3>
            <img src="${app.logo}" class="card-img-top app-img" alt="...">
            <p class="app-cost">${app.pricing ? app.pricing.price : 'Free of Cost'}</p>
            <p class="app-plan">${app.plan}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;
    appContainer.appendChild(appDiv);
  });

  if (dataLimit && apps.length === dataLimit) {
    showAllButton.classList.remove('d-none');
  } 
  else {
    showAllButton.classList.add('d-none');
  }

  // Stop Loader
  toggleSpinner(false);
};

const processShow = (dataLimit) => {
  toggleSpinner(true);
  loadApps(dataLimit);
};

document.getElementById('show-all').addEventListener('click', function () {
  processShow();
});

const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById('loader');
  if (isLoading) {
    loaderSection.classList.remove('d-none');
  } 
  else {
    loaderSection.classList.add('d-none');
  }
};

document.getElementById('btn-show-all').addEventListener('click', function () {
  processShow();
});

const loadAppDetails = async(id) =>{
  id = ("0" + id).slice(-2);
  console.log("idd",id);
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayAppDetails(data);
}

const displayAppDetails = app =>{
  console.log(app);
}

loadApps(6);



