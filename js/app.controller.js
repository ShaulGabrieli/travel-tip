
// import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { placeService } from './services/place.service.js'


export const locService = {
    renderPlaces
}

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onDeletePlace = onDeletePlace


function onInit() {
    mapService.initMap()
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

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function onGetLocs() {
    console.log('Getting Location...')
    placeService.getPlacesForDisplay().then(places=>{
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
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}
function onPanTo() {
    console.log('Panning the Map')
    mapService.panTo(35.6895, 139.6917)
}


function renderPlaces(places) {
        var strHtmls = places.map(
            (place) => `
        <tr> 
            <td> ${place.name}</td>
            <td> ${place.lat}</td>
            <td> ${place.lng}</td>
            <td> <button onclick="onGo()">go</button></td>
            <td> <button onclick="onDeletePlace('${place.id}')" >delete</button></td>
        </tr>`
        )
    
        document.querySelector('.books-list').innerHTML = strHtmls.join('')
    
    
   
}
function onDeletePlace(placeId){
placeService.deletePlace(placeId).then(res=> onGetLocs())
 
}