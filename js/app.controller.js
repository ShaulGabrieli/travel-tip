// import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { placeService } from './services/place.service.js'

// export const locService = {
//     renderPlaces,
// }

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onDeletePlace = onDeletePlace
window.onSearchPlace =onSearchPlace

function onInit() {
    mapService
        .initMap()
        .then(() => {
            console.log('Map is ready')
        })
        .catch(() => console.log('Error: cannot init map'))

    // mapService.getGMap().
}

// mapService.initMap(). placeService.getPlacesForDisplay().then(places=>
//     renderPlaces(places))
// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker(posLat, posLng) {
    console.log('Adding a marker')
    mapService.addMarker({ lat: posLat, lng: posLng })
}

function onGetLocs() {
    console.log('Getting Location...')
    placeService.getPlacesForDisplay().then((places) => {
        renderPlaces(places)
    })
    // placeService.getLocs()
    //     .then(locs => {
    //         console.log('Locations:', locs)

    //         renderPlaces(locs)

    // document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
    // })
}

function onGetUserPos() {
    getPosition()
        .then((pos) => {
            onPanTo(pos.coords.latitude, pos.coords.longitude)
            
        })
        .catch((err) => {
            console.log('err!!!', err)
        })
}
function onPanTo(lat, lng) {
    console.log('lat', lat)
    console.log('lng', lng)
    console.log('Panning the Map')
    mapService.panTo(lat, lng)
    onAddMarker(lat,lng)

}

function renderPlaces(places) {
    var strHtmls = places.map(
        (place) => `
        <tr> 
            <td> ${place.name}</td>
            <td> ${place.lat}</td>
            <td> ${place.lng}</td>
            <td> <button onclick="onPanTo(${place.lat},${place.lng})">go</button></td>
            <td> <button onclick="onDeletePlace('${place.id}')" >delete</button></td>
        </tr>`
    )

    document.querySelector('.place-list').innerHTML = strHtmls.join('')
}
function onDeletePlace(placeId) {
    placeService.deletePlace(placeId).then((res) => onGetLocs())
}




function onSearchPlace(value){
    console.log('value', value);
 mapService.getSearchPlace(value).then(val=> onPanTo(val.lat, val.lng))
}

