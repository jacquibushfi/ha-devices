
  const BASE_URL = "http://localhost:3000"
  const LOCATIONS_URL = `${BASE_URL}/locations`
  const RPDEVICES_URL = `${BASE_URL}/rpdevices`
  const locationContainer = document.querySelector('#location-container')
  const locations = []

  window.addEventListener('load', () => {
    getlocations()
    attachClickToHadeviceLinks()
  })

  
    
  
