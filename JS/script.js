
const loadApps = async() => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  displayApps(data.data.tools);
}
const displayApps = apps => {
  const appContainer = document.getElementById('app-container');
  apps = apps.slice(0, 6);

  apps.forEach(app => {
      const appDiv = document.createElement('div');
      appDiv.classList.add('col');
      const featuresList = app.features.map((feature) => `<li>${feature}</li>`).join('');
      appDiv.innerHTML = `
        <div class="card p-4">
          <img src="${app.image}" class="card-img-top" alt="...">
          <div class="card-body">
            <h3 class="card-title fw-semibold">Features</h3>
            <ol class="card-text" type="1">${featuresList}</ol>              
            <hr>
            <div>
            <h3 class="card-title fw-semibold">${app.name}</h3>
            <div class="calendar">
              <i class="fa-solid fa-calendar-days"></i>
              <p>${app.published_in}</p>
            </div></div>
            <div>
            <i class="fa-solid fa-calendar-days"></i>
            </div></div>

          </div>
        </div>
      `;
      appContainer.appendChild(appDiv);
    });
};

loadApps();

