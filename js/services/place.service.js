import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const PLACE_KEY = 'placesDB'

export const placeService = {
    getLocs,
    createPlace,
    setPlace,
    getPlacesForDisplay,
    deletePlace
}

function createPlace(name, lat, lng, weather, updatedAt) {
    const place = {
        id: utilService.makeId(),
        name,
        lat,
        lng,
        weather,
        createdAt: Date.now(),
        updatedAt,
    }
    return place
}




const locs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

// createPlaces(){

// }

function setPlace(name, lat, lng){
    locs.push(createPlace(name, lat, lng))
    storageService.post(PLACE_KEY, createPlace(name, lat, lng))
}

function getPlacesForDisplay(){
    return storageService.query((PLACE_KEY))
}


function deletePlace(placeId){
    return storageService.remove(PLACE_KEY, placeId)
}