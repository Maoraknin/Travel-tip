
import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'

window.onload = onInit
window.onPanTo = onPanTo
window.panTo = panTo
window.onGetLocs = onGetLocs
window.onGetUserPos = onGetUserPos
window.onGo = onGo
window.onDelete = onDelete
window.getPosition = getPosition
// window.onMapClick = onMapClick
var gMap
const gQueryStringParams = new URLSearchParams(window.location.search)

function onInit() {
    getQueryStringParam()
    onGetLocs()
    renderByQueryStringParams()
}

function panTo(lat, lng) {
    console.log('lat, lng:',lat, lng)
    // console.log('lat:',lat)
    var laLatLng = new google.maps.LatLng(lat, lng)
    // console.log('laLatLng:',laLatLng)
    console.log('gMap:',gMap)
    gMap.panTo(laLatLng)
}

function getQueryStringParam() {
    // gQueryStringParams.set('lang', `he`)
    const searchParam = gQueryStringParams.toString()
    const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname + "?" + searchParam
    window.history.pushState({ path: newUrl }, '', newUrl)
    console.log(newUrl);

}

function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap')
    return mapService.connectGoogleApi()
        .then(() => {
            console.log('google available')
            gMap = new google.maps.Map(
                document.querySelector('.map-container'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap)

            let infoWindow = new google.maps.InfoWindow({
                content: "Click the map to get Lat/Lng!",
                position: { lat, lng },
            });

            infoWindow.open(gMap);

            gMap.addListener("click", (mapsMouseEvent) => {
                infoWindow.close();
                infoWindow = new google.maps.InfoWindow({
                    position: mapsMouseEvent.latLng,
                });

                infoWindow.setContent(
                    JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
                );


                infoWindow.open(gMap);
                // gCurrCords = JSON.parse(infoWindow.content)
                // marker.position = gCurrCords
                const location = mapsMouseEvent.latLng.toJSON()
                mapService.mapClick(location)
                _updateStringParam(location.lat,location.lng)
                onGetLocs()

            });
        })
}

function onPanTo(elInput) {
    const value = elInput.value
    elInput.value = ''
    console.log('Panning the Map')
    mapService.connectGeoCodeApi(value)
}


function renderByQueryStringParams() {
    const lat = gQueryStringParams.get('lat')
    const lng = gQueryStringParams.get('lng')
    if (!lat || !lng) return
    initMap(+lat, +lng)
    .then(() => {
        console.log('Map is ready')
    })
    .catch(() => console.log('Error: cannot init map'))
}


// This function provides a Promise API to the callback-based-api of getCurrentPosition

function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    }).then(res => res.coords).then(res => initMap(res.latitude, res.longitude))
}


function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            renderLocs(locs)
            // document.querySelector('.locs').innerText = JSON.stringify(locs, null, 2)
        })
}

function renderLocs(locs) {
    const strHTML = locs.map(loc => {
        return `<tr>
        <td>${loc.id}</td>
        <td>${loc.name}</td>
        <td>${loc.lat}</td>
        <td>${loc.lng}</td>
        <td>${loc.weather}</td>
        <td>${loc.createdAt}</td>
        <td>${loc.updatedAt}</td>
        <td>
        <button class="btn-go btn" onclick="onGo(${loc.lat},${loc.lng})">Go</button>
        <button class="btn-delete btn" onclick="onDelete('${loc.id}')">Delete</button>
        </td>
    </tr>`
    }).join('')
    document.querySelector('.locs').innerHTML = strHTML

}

function onDelete(locId){
    locService.deleteLoc(locId).then(onGetLocs)
}

function onGo(lat, lng){
    _updateStringParam(lat, lng)
    // console.log('lat, lng:',lat, lng)
    panTo(lat, lng)
    // initMap()
}

function _updateStringParam(lat,lng){
    gQueryStringParams.set('lat', `${lat}`)
    gQueryStringParams.set('lng', `${lng}`)
    getQueryStringParam()
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




















// function getPosition() {

//     if (!navigator.geolocation) {
//         alert('HTML5 Geolocation is not supported in your browser')
//         return
//     }

//     // One shot position retrieval...
//     navigator.geolocation.getCurrentPosition(showLocation, handleLocationError)
    
//     // ...or continous watch
//     // navigator.geolocation.watchPosition(showLocation, handleLocationError)
// }

// function showLocation(position) {
    
//     console.log(position)
//     const {latitude: lat, longitude: lng, accuracy} = position.coords

//     document.getElementById("latitude").innerHTML = lat
//     document.getElementById("longitude").innerHTML = lng
    
//     initMap(lat, lng)
// }

// function handleLocationError(error) {
//     var locationError = document.getElementById("locationError")

//     switch (error.code) {
//         case 0:
//             locationError.innerHTML = "There was an error while retrieving your location: " + error.message
//             break
//         case 1:
//             locationError.innerHTML = "The user didn't allow this page to retrieve a location."
//             break
//         case 2:
//             locationError.innerHTML = "The browser was unable to determine your location: " + error.message
//             break
//         case 3:
//             locationError.innerHTML = "The browser timed out before retrieving the location."
//             break
//     }
// }