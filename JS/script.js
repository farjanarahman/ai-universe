const loadApps = async (dataLimit) => {
const url = `https://openapi.programming-hero.com/api/ai/tools`;
const res = await fetch(url);
const data = await res.json();
displayApps(data.data.tools, dataLimit);
};

// sorting
let sortOrder = undefined;

document.getElementById('sorting').addEventListener('click', function(){
  sortOrder = 1;
  processShow();
});

const displayApps = (apps, dataLimit) => {
  if(sortOrder !== undefined){
    apps.sort((a, b) => sortOrder * (new Date(a.published_in) - new Date(b.published_in)));
  }
  const appContainer = document.getElementById('app-container');
  const showAllButton = document.getElementById('show-all');

  if (dataLimit && apps.length > dataLimit) {
    apps = apps.slice(0, dataLimit);
  }

  // clear previous content
  appContainer.innerHTML = '';

  //Cards
  apps.forEach((app) => {
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

//Start Loader
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

//Modal API
const loadAppDetails = async(id) =>{
  id = ("0" + id).slice(-2);
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayAppDetails(data);
}

// Modal
const displayAppDetails = app =>{
  const modalBody = document.getElementById('my-modal')
  modalBody.innerHTML = ''
  const div = document.createElement('div')
  const accurate = `${app.data.accuracy.score * 100}`;
  div.innerHTML = `
            <div class="d-flex modal-full">
                
              <div class="modal-left w-60">
                <h3 class="app-des">${app.data.description}</h3>
                <div class="subscibe d-flex fw-semibold mt-3">
                  <div class="basic text-success p-1">
                    <p><span class="app-cost">${app.data.pricing === null ? 'Free of Cost/': app.data.pricing[0].price }</span> <span class="app-plan">${app.data.pricing === null ? "Basic" : app.data.pricing[0].plan}</span></p>
                  </div>
                  <div class="pro text-warning-emphasis p-1">
                    <p><span class="app-cost">${app.data.pricing === null ? 'Free of Cost/' : app.data.pricing[1].price}</span> <span class="app-plan">${app.data.pricing === null ? "Pro" : app.data.pricing[1].plan}</span>
                      </p> 
                    </div>
                    <div class="contact text-danger p-1">
                      <p> <span class="app-cost">${app.data.pricing === null ? 'Free of Cost/' : app.data.pricing[2].price}</span> <span class="app-plan">${app.data.pricing === null ? "Enterprise" : app.data.pricing[2].plan}</span>
                      </p>
                     
                    </div>
                  </div>
                  <div class="features-int d-flex mt-3">
                  <div class="feature">
                    <h3 class="int-head">Features</h3>
                    <ul class="text">${app.data.features !=null ? Object.values(app.data.features).map(item=>`<li>${item.feature_name}</li>`).join('') : 'No data found'}</ul>
                  </div>
                 <div class="int">
                  <h3 class="int-head">Integrations</h3>
                  <ul class="text">${app.data.integrations !=null ? Object.values(app.data.integrations).map(items=>`<li>${items}</li>`).join(''): 'No data found'}</ul>
                </div>
                </div>
                </div>
                
                <div class="modal-right ms-2">
                <div class="card-wrapper">
                <img src="${app.data.image_link[0]}" class="card-img card-img-top app-img rounded" alt="...">
                
                ${accurate > 0 ? `<p class="accuracy">${accurate}% accuracy</p>` : ""}
                
                </div>
                
                <h4 class="input mt-3">${app.data.input_output_examples !=null ?app.data.input_output_examples[0].input : "Can you give any example?" }</h4>
                <p>${app.data.input_output_examples !=null ? app.data.input_output_examples[0].output : "No! Not Yet! Take a break!!!" }</p>
                </div> 
            </div>
            `
            modalBody.appendChild(div)
}

loadApps(6);







