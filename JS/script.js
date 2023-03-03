
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
        const featuresList = app.features.map(feature => `<ol>
        <li> ${feature}</li>
        </ol>`).join('');
        appDiv.innerHTML = `
          <div class="card p-4">
            <img src="${app.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h3 class="card-title fw-semibold">Features</h3>
              <ul class="card-text">${featuresList}</ul>
            </div>
          </div>
        `;
        appContainer.appendChild(appDiv);
      });
};

loadApps();

