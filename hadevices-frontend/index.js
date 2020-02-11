const BASE_URL = 'http://localhost:3000';
const LOCATIONS_URL = `${BASE_URL}/locations`
const DEVICES_URL = `${BASE_URL}/rpdevices`

window.addEventListener('load', () => {
  getLocations()
})

function removeDevice() {
  fetch(`${DEVICES_URL}/${event.target.dataset.rpdeviceId}`, {
    method: "DELETE",
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then(event.target.parentElement.remove())
}

function displayCreateForm(id) {
  console.log(id)
  let devFormDiv = document.getElementById("Device-form")
  let html = `
    <form onsubmit="createDev(); return false;">
    <label>Hostname:</label>
    <input type = "text" id="hostname"></br>
    <label>Ip Address:</label>
    <input type = "text" id="ipadd"></br>
    <input type = "submit" value = "Create Device">
  `
  devFormDiv.innerHTML = html
}

function createDev(id) {
  const dev = {
    location_id: event.target.dataset.id,
    hostname: document.getElementById('hostname').Value,
    ipadd: document.getElementById('ipadd').value
  }
//   fetch(LOCATIONS_URL, {
//     method: "POST"
//     body: JSON.stringify(dev),
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     }
//   })
//   .then(resp => resp.json())
//   .then(dev => {
//     let newDev = new RpDev(dev)
//     document.querySelector('#location-container').innerHTML += ')
//   })
// }


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
        <button data-location-id="${this.id}" onclick="displayCreateForm(${this.id})"; return false;>Add Device</button>
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
      rpdeviceLi.innerText = `${rpdevice.hostname}`;
      rpdeviceLi.append(removeButton);
      locationCardUl.append(rpdeviceLi);
      locationContainer.append(locationCard);
      rpdeviceLi.addEventListener("click", removeDevice);
    })
  }
}

// class Rpdevice {
//   constructor(rpdevice) {
//     this.id = rpdevice.id;
//     this.name = rpdevice.name;
//     this.location_id = rpdevice.location_id;
//   }