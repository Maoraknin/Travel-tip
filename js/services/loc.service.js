import { utilService } from './util.service.js'

export const locService = {
    getLocs,
    addLoc

}


const locs = [
    { id: utilService.makeId(), name: 'Greatplace', lat: 32.047104, lng: 34.832384, weather: 'sunny', createdAt: 5, updatedAt: 6 }
]

function addLoc(name, lat, lng, date) {
    const loc = {
        id: utilService.makeId(),
        name,
        lat,
        lng,
        weather: 'sunny',
        createdAt: date,
        updatedAt: date
    }
    locs.push(loc)
    console.log('locs:',locs)
}


// id: utilService.makeId(),

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 100)
    })
}


