const BASE_URL = 'http://localhost:3000';
const LOCATIONS_URL = `${BASE_URL}/locations`
const DEVICES_URL = `${BASE_URL}/rpdevices`

window.addEventListener('load', () => {
  getLocations();
  const locationContainer = document.querySelector('#location-container');
  locationContainer.addEventListener("click", removeDevice);

});

function removeDevice(id) {
  console.log(id)
  fetch(`${DEVICES_URL}/${event.target.dataset.rpdeviceId}`, {
    method: "DELETE",
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then(event.target.parentElement.remove())
}

function getLocations() {
  fetch(BASE_URL + '/locations')
    .then(resp => resp.json())
    .then(data => {
      const locationContainer = document.querySelector('#location-container');
      locationContainer.innerHTML = '';
      data.forEach(location => {
        console.log(location);
        let newLocation = new Location(location);
        newLocation.renderLocation();
      });
    });
}

class Location {
  constructor(location) {
    this.id = location.id;
    this.name = location.name;
    this.rpdevices = location.rpdevices;
  }

  renderLocation() {
    const locationContainer = document.querySelector('#location-container');

    console.log(location);
    const locationCard = document.createElement('div');
    locationCard.dataset.id = this.id;
    locationCard.className = 'card';
    locationCard.innerHTML = `
        <p>${this.name}</p>
        <button data-location-id="${this.id}" onclick="addDevice(${this.id})"; return false;>Add Device</button>
        <ul id=location-card-ul-${this.id}> 
        </ul>
        `;
    this.rpdevices.length > 0 ? this.renderDevices(locationCard, locationContainer) : locationContainer.append(locationCard)
  }

  renderDevices(locationCard, locationContainer) {
    let rpdevices = this.rpdevices
    console.log(rpdevices);
    rpdevices.forEach(rpdevice => {
      const locationCardUl = locationCard.querySelector('ul');
      const rpdeviceLi = document.createElement('li');
      const removeButton = document.createElement('button');
      removeButton.innerText = 'Remove';
      removeButton.className = 'remove';
      removeButton.dataset.rpdeviceId = rpdevice.id;
      // removeButton.onclick = 'removeDevice(${rpdevice.id})';
      rpdeviceLi.innerText = `${rpdevice.hostname}`;
      rpdeviceLi.append(removeButton);
      locationCardUl.append(rpdeviceLi);
      locationContainer.append(locationCard);
    })
  }
}
