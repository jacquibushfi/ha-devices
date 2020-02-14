const BASE_URL = 'http://localhost:3000'

window.addEventListener('load', () => {
  getLocations()
})

function displayCreateLocForm() {
  let formdiv = document.querySelector('#device-form')
  formdiv.innerHTML = `<h3>New Location</h3>`
  let html = `
      <form>
      <label>Location:</label>
      <input type="text" id="name" name="name"></br>
      <input type="submit">
      </form>
      `
  formdiv.innerHTML += html
  let form = document.querySelector('form')
  form.addEventListener("submit", createLoc)
}

function createLoc() {
  event.preventDefault()
  const loc = {
    name: event.target.name.value
  }
  fetch(BASE_URL + '/locations', {
    method: "POST",
    body: JSON.stringify(loc),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then(resp => resp.json())
    .then(data => {
      let newLoc = new Location(data)
      newLoc.renderLocation()
      let formdiv = document.querySelector('#device-form')
      formdiv.innerHTML = ''
    })
    .catch(error => alert(error.message))
}

function displayCreateDevForm() {
  let locid = event.target.dataset.locationId
  let formdiv = document.querySelector('#device-form')

  fetch(BASE_URL + `/locations/${locid}`)
    .then(resp => resp.json())
    .then(data => {
      formdiv.innerHTML = `<h3>${data.name}</h3>`
      let html = `
      <form>
      <input type="hidden" id="location_id" name="location_id" value=${data.id}></br>
      <label>Hostname:</label>
      <input type="text" id="hostname" name="hostname" autofocus></br>
      <label>Ip Address:</label>
      <input type="text" id="ipadd" name="ipadd"></br>
      <input type="submit">
      </form>
      `
      formdiv.innerHTML += html
      document.getElementById("hostname").focus();
      let form = document.querySelector('form')
      form.addEventListener("submit", createDev)
    })
    .catch(error => alert(error.message))
}

function createDev() {
  event.preventDefault()
  const dev = {
    hostname: event.target.hostname.value,
    ipadd: event.target.ipadd.value,
    location_id: event.target.location_id.value
  }
  fetch(BASE_URL + `/locations/${dev.location_id}/rpdevices`, {
    method: "POST",
    body: JSON.stringify(dev),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then(resp => resp.json())
    .then(data => {
      let newDev = new RpDevice(data)
      newDev.renderDevice()
      let formdiv = document.querySelector('#device-form')
      formdiv.innerHTML = ''
    })
    .catch(error => alert(error.message))
}

function removeDevice() {
  fetch(BASE_URL + `/locations/${event.target.dataset.locId}/rpdevices/${event.target.dataset.rpdeviceId}`, {
    method: "DELETE",
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then(event.target.parentElement.remove())
    .catch(error => alert(error.message))
}

function getLocations() {
  fetch(BASE_URL + '/locations')
    .then(resp => resp.json())
    .then(data => {
      let locationContainer = document.querySelector('#location-container');
      locationContainer.innerHTML = '';
      data.forEach(location => {
        let newLocation = new Location(location);
        newLocation.renderLocation();
      })
    })
    .catch(error => alert(error.message))
}

class RpDevice {
  constructor(rpdevice) {
    this.id = rpdevice.id;
    this.hostname = rpdevice.hostname;
    this.ipadd = rpdevice.ipadd
    this.location_id = rpdevice.location_id;
  }

  renderDevice() {
    const locationCardUl = document.getElementById(`location-card-ul-${this.location_id}`);
    const rpdeviceLi = document.createElement('li');
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove';
    removeButton.className = 'remove';
    removeButton.dataset.locId = this.id;
    removeButton.dataset.rpdeviceId = this.id;
    rpdeviceLi.innerText = this.hostname + " (" + this.ipadd + ")";
    rpdeviceLi.append(removeButton);
    locationCardUl.append(rpdeviceLi);
    rpdeviceLi.addEventListener("click", removeDevice);
  }
}

class Location {
  constructor(location) {
    this.id = location.id;
    this.name = location.name;
    this.rpdevices = location.rpdevices;
  }

  renderLocation() {
    const locationContainer = document.querySelector('#location-container');
    const locationCard = document.createElement('div');
    locationCard.dataset.id = this.id;
    locationCard.className = 'card';
    locationCard.innerHTML = `
        <p>${this.name}</p>
             <button data-location-id="${this.id}" onclick="displayCreateDevForm()">Add Device</button>
        <ul id="location-card-ul-${this.id}"> 
        </ul >
      `;
    this.rpdevices.length > 0 ? this.renderDevices(locationCard, locationContainer) : locationContainer.append(locationCard)
  }

  renderDevices(locationCard, locationContainer) {
    let rpdevices = this.rpdevices

    rpdevices.forEach(rpdevice => {
      const locationCardUl = locationCard.querySelector('ul');
      const rpdeviceLi = document.createElement('li');
      const removeButton = document.createElement('button');
      removeButton.innerText = 'Remove';
      removeButton.className = 'remove';
      removeButton.dataset.locId = this.id;
      removeButton.dataset.rpdeviceId = rpdevice.id;
      rpdeviceLi.innerText = `${rpdevice.hostname} (${rpdevice.ipadd})`;
      rpdeviceLi.append(removeButton);
      locationCardUl.append(rpdeviceLi);
      locationContainer.append(locationCard);
      rpdeviceLi.addEventListener("click", removeDevice);
    })
  }
}

