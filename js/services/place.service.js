import { storageService } from './async-storage.service.js'

export const placeService = {}

function createPlace({ id, name, lat, lng, weather, createdAt, updatedAt }) {
    const place = {
        id,
        name,
        lat,
        lng,
        weather,
        createdAt,
        updatedAt,
    }
    return place
}

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

createPlaces(){

}
