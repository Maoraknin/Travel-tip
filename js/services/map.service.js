import { locService } from './loc.service.js'

export const mapService = {
    addMarker,
    mapClick,
    connectGeoCodeApi,
    connectGoogleApi,

    // mapClick
}


// Var that is used throughout this Module (not global)


function mapClick(location) {
    const name = prompt('please describe location')

    let date = new Date();
    let current_date = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    let current_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let date_time = current_date + " " + current_time;

    if (!name) name = 'elhanan'
    locService.addLoc(name, location.lat, location.lng, date_time)


    // gSavedLocations.push(chosenLocation)
    // saveToStorage(LOCATION_KEY, gSavedLocations)

}




function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    })
    return marker
}





///////////////////////////////////////////////////////

function connectGeoCodeApi(address) {
    // if (window.google) return Promise.resolve()
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCB0AieRfE8jFeAQWL8okf7J69APWc8VTI`
    axios.get(url).then(res => res.data)
        .then(res => res.results)
        .then(res => res[0])
        .then(res => res.geometry)
        .then(res => res.location)
        .then(res => panTo(res.lat, res.lng))
    // var elGoogleApi = document.createElement('script')
    // elGoogleApi.src = 
    // elGoogleApi.async = true
    // document.body.append(elGoogleApi)

    // return new Promise((resolve, reject) => {
    //     elGoogleApi.onload = resolve
    //     elGoogleApi.onerror = () => reject('Google script failed to load')
    // })
}

/////////////////////////////////////////////////////////

function connectGoogleApi() {
    if (window.google) return Promise.resolve()
    var elGoogleApi = document.createElement('script')
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCB0AieRfE8jFeAQWL8okf7J69APWc8VTI`
    elGoogleApi.async = true
    document.body.append(elGoogleApi)

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}




// function getLocById(locId){
//     }



