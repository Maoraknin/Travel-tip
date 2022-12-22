import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

export const locService = {
    getLocs,
    addLoc,
    deleteLoc

}

const LOCATION_KEY = 'locationDB'

let locs = []

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
    utilService.saveToStorage(LOCATION_KEY, locs)
    console.log('locs:', locs)
}


// id: utilService.makeId(),

function getLocs() {
    return storageService.query(LOCATION_KEY, 0).then(res => {
        if (res && res.length) {
            locs = res
            console.log(res);
            console.log('from CACHE');
            return res
        }
        else return new Promise((resolve, reject) => {
            console.log('from Site')
            setTimeout(() => {
                resolve(locs)
            }, 1)
        })
    })

}

function deleteLoc(locId) {
    return storageService.remove(LOCATION_KEY, locId) 
    
    // const locIdx = findLocById(locId)
    
}

