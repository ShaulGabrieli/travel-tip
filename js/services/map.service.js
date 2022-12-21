import { placeService } from './place.service.js'

export const mapService = {
    initMap,
    addMarker,
    panTo,
    getGMap
}

// Var that is used throughout this Module (not global)
var gMap

function initMap(lat = 32.0749831, lng = 34.9120554) {
    const myLatlng = { lat, lng }
    console.log('InitMap')
    return _connectGoogleApi().then(() => {
        console.log('google available')
        gMap = new google.maps.Map(document.querySelector('#map'), {
            center: { lat, lng },
            zoom: 15,
        })
        gMap.addListener('click', (mapsMouseEvent) => {
            getLocationName(mapsMouseEvent.latLng.toJSON())
            .then(res=> {
                placeService.setPlace(res.name, res.lat, res.lng)

            })
            // console.log('dsdsdsdsd', mapsMouseEvent.latLng.toJSON());
            // console.log('dsdsdsdsd', mapsMouseEvent)
        })
        console.log('Map!', gMap)
    })
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!',
    })
    return marker
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng)
    gMap.panTo(laLatLng)
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = 'AIzaSyARsjihrwDbtuTo_bFddachb_6RGWDwQEQ' //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function getLocationName(latLng) {
    const API_KEY = 'AIzaSyARCuW6vBVWfD8OCam21Gn0W1X9VGD5f2Y'
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latLng.lat},${latLng.lng}&key=${API_KEY}`).then((res) => {
        return {
            name: res.data.results[0].address_components[2].long_name, 
            lat: latLng.lat, 
            lng: latLng.lng,
        }
    
        
        
    })
}

function getGMap (){
    console.log('gMap', gMap)
    return gMap
}

