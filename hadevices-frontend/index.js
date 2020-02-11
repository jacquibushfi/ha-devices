const BASE_URL = 'http://localhost:3000';

window.addEventListener('load', () => {
  getLocations();
});


function removeDevice(id) {
  const config = {
    method: "DELETE"
  }
  fetch(`${BASE_URL}/rpdevices/${event.target.dataset.rpdeviceId}`, config)
    .then(resp => resp.json())
    .then(data => {
      event.target.parentElement.remove()
      console.log(data)
    })
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
    this.renderDevices(locationCard, locationContainer)
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
      removeButton.onclick = 'removeDevice(${rpdevice.id})';
      rpdeviceLi.innerText = `${rpdevice.hostname}`;
      rpdeviceLi.append(removeButton);
      locationCardUl.append(rpdeviceLi);
      locationContainer.append(locationCard);
    });
  }
}
