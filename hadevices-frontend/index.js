const BASE_URL = 'http://localhost:3000';

window.addEventListener('load', () => {
  getLocations();
  // attachClickToHadeviceLinks()
});

function getLocations() {
  // clearForm();
  // let main = document.querySelector('#main');
  // main.innerHTML = '';

  fetch(BASE_URL + '/locations')
    .then(resp => resp.json())
    .then(locations => {
      locations.forEach(location => {
        const locationCard = document.createElement('div');
        locationCard.dataset.id = location.id;
        locationCard.className = 'card';
        locationCard.innerHTML = `
        <p>${location.name}</p>
        <button data-location-id="${location.id}">Add RP Devices</button>}
        <ul id=location-card-ul-${location.id}>
        
        </ul>
        `;
      });
    });

  // function clearForm() {
  //   let locFormDiv = document.getElementById('location-form');
  //   locFormDiv.innerHTML = '';
  // }
}
