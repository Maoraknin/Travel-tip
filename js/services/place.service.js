
//         name,
//         id: makeId(),
//         time: date_time,
//         lat: gCurrCords.lat,
//         lng: gCurrCords.lng
//     }

import { utilService } from './util.service.js'
// import { storageService } from './async-storage.service.js'

const PLACE_KEY = 'placeDB'
// var gFilterBy = { txt: '', minScore: 0 }
// _createPets()



export const placeService = {
  query,
  get,
  remove,
  save,
  getEmptyPet,
  getFilterBy,
  setFilterBy
}





// function query() {
//   return storageService.query(PLACE_KEY)
//     .then(pets => {
//       if (gFilterBy.txt) {
//         const regex = new RegExp(gFilterBy.txt, 'i')
//         pets = pets.filter(pet => regex.test(pet.name))
//       }
//       if (gFilterBy.minScore) {
//         pets = pets.filter(pet => pet.score >= gFilterBy.minScore)
//       }
//       return pets
//     })
// }





