const BASE_URL = 'http://localhost:3000'



window.addEventListener('load', () => {
  getLocations()
})

function displayCreateForm() {
  let formdiv = document.querySelector('#device-form')
  let html = `
   <form onsubmit="createDev()"; return false;>
   <label>Location Id:</label>
   <input type="text" id="location_id" name="location_id"></br>
   <label>Hostname:</label>
   <input type="text" id="hostname" name="hostname"></br>
   <label>Ip Address:</label>
   <input type="text" id="ipadd" name="ipadd"></br>
   
   <input type="submit">
   </form>
 `
  formdiv.innerHTML = html
}


function createDev() {
  const dev = {
    hostname: document.getElementById('hostname').value,
    ipadd: document.getElementById('ipadd').value,
    location_id: document.getElementById('location_id').value
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
      const locationContainer = document.querySelector('#location-container');
      const locationCard = document.querySelector(`ul id=location-card-ul-${dev.location_id}`)
      newDev.renderDevices(locationCard, locationContainer)
    })
}

function removeDevice() {
  fetch(BASE_URL + `/locations/${event.target.locationCard.dataset.id}/rpdevices/${event.target.dataset.rpdeviceId}`, {
    method: "DELETE",
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    }
  })
    .then(event.target.parentElement.remove())
}

// function displayCreateForm2(id) {

//   let devFormDiv = document.getElementById("device-form")
//   let html = `
//     <form onsubmit="createDev()";return false;>
//     <label>Location Id:</label>
//     <input type="text" name="location_id" value=${id}></br>
//     <label>Hostname:</label>
//     <input type="text" id="hostname"></br>
//     <label>Ip Address:</label>
//     <input type="text" id="ipadd"></br>
//     <input type="submit" value="Create Device">
//     </form>
//   `
//   devFormDiv.innerHTML = html
// }



// function createDev2() {
//   e.preventDefault()
//   const dev = {
//     hostname: document.getElementById('hostname').value,
//     ipadd: document.getElementById('ipadd').value,
//     location_id: document.getElementById('location_id').value
//   }

//   fetch(BASE_URL + `/locations/${location_id}/rpdevices`), {
//     method: "POST",
//     body: JSON.stringify(dev),
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept': 'application/json'
//     }
//   }
//     .then(resp => resp.json())
//     .then(data => {
//       let newDev = new RpDevice(data)
//       const locationContainer = document.querySelector('#location-container');
//       const locationCard = document.querySelector(`ul id=location-card-ul-${location_id}`)
//       newDev.renderDevices(locationCard, locationContainer)
//     })
// }


function getLocations() {
  fetch(BASE_URL + '/locations')
    .then(resp => resp.json())
    .then(data => {
      let locationContainer = document.querySelector('#location-container');
      locationContainer.innerHTML = '';
      data.forEach(location => {

        let newLocation = new Location(location);
        newLocation.renderLocation();
      });
    });
}


class RpDevice {
  constructor(rpdevice) {
    this.id = rpdevice.id;
    this.name = rpdevice.name;
    this.location_id = rpdevice.location_id;
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
        <button data-location-id="${this.id}" onclick="displayCreateForm(${this.id})">Add Device</button>
        <ul id=location-card-ul-${this.id}> 
        </ul>
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
      removeButton.dataset.rpdeviceId = rpdevice.id;
      rpdeviceLi.innerText = `${rpdevice.hostname}`;
      rpdeviceLi.append(removeButton);
      locationCardUl.append(rpdeviceLi);
      locationContainer.append(locationCard);
      rpdeviceLi.addEventListener("click", removeDevice);
    })
  }
}

