const BASE_URL = 'http://localhost:3000';

window.addEventListener ('load', () => {
  getLocations ();
});

function getLocations () {
  const locationContainer = document.querySelector ('#location-container');
  let locations = [];

  locationContainer.innerHTML = '';

  fetch (BASE_URL + '/locations').then (resp => resp.json ()).then (data => {
    console.log (data);
    data.forEach (location => {
      const locationCard = document.createElement ('div');
      locationCard.dataset.id = location.id;
      locationCard.className = 'card';
      locationCard.innerHTML = `
        <p>${location.name}</p>
        <button data-location-id="${location.id}" onclick="addDevice(${location.id})"; return false;>Add Device</button>
        <ul id=location-card-ul-${location.id}> 
        </ul>
        `;

      location.rpdevices.forEach (rpdevice => {
        const locationCardUl = locationCard.querySelector ('ul');
        const rpdeviceLi = document.createElement ('li');
        const removeButton = document.createElement ('button');
        removeButton.innerText = 'Remove';
        removeButton.className = 'remove';
        removeButton.dataset.rpdeviceId = rpdevice.id;
        removeButton.onclick = 'removeDevice(${rpdevice.id})';
        rpdeviceLi.innerText = `${rpdevice.hostname}`;
        rpdeviceLi.append (removeButton);
        locationCardUl.append (rpdeviceLi);
        locationContainer.append (locationCard);
      });
    });
  });
}
