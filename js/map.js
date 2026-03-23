var map = L.map('map').setView([-6.15, 23.60], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

fetch("data/users.json")
    .then(res => res.json())
    .then(data => {

        data.forEach(user => {

            L.marker([user.lat, user.lng])
                .addTo(map)
                .bindPopup(user.name + " - " + user.role)

        })

    })
function locateUser(map) {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(position => {

            let lat = position.coords.latitude
            let lng = position.coords.longitude

            let marker = L.marker([lat, lng]).addTo(map)

            marker.bindPopup("Vous êtes ici").openPopup()

            map.setView([lat, lng], 13)

        })

    }

}
let requests = JSON.parse(localStorage.getItem("pickupRequests")) || []

let notif = document.getElementById("notifications")

if (requests.length > 0) {

    notif.innerHTML = "🔔 Vous avez " + requests.length + " demandes de collecte."

}
else {

    notif.innerHTML = "Aucune nouvelle demande."

}
async function loadPollutionZones(map) {

    const response = await fetch("data/pollution_zones.json")

    const zones = await response.json()

    zones.forEach(zone => {

        let color

        if (zone.level === "élevé") color = "red"
        if (zone.level === "moyen") color = "orange"
        if (zone.level === "faible") color = "green"

        let marker = L.circleMarker([zone.lat, zone.lng], {

            radius: 10,
            color: color,
            fillOpacity: 0.7

        }).addTo(map)

        marker.bindPopup(
            "<b>" + zone.name + "</b><br>Niveau pollution : " + zone.level
        )

    })

}
const map = L.map("map").setView([-6.137, 23.59], 13)

L.tileLayer(

    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

).addTo(map)
navigator.geolocation.getCurrentPosition(position => {

    const lat = position.coords.latitude
    const lng = position.coords.longitude

    L.marker([lat, lng])
        .addTo(map)
        .bindPopup("Vous êtes ici")

    map.setView([lat, lng], 14)

})
async function loadCollectorsMap() {

    const response = await fetch("data/collectors.json")

    const collectors = await response.json()

    collectors.forEach(c => {

        L.marker([c.lat, c.lng])
            .addTo(map)
            .bindPopup(

                "<b>" + c.name + "</b><br>" + c.location +

                "<br><button onclick=\"openChat('" + c.name + "')\">Contacter</button>"

            )

    })

}

loadCollectorsMap()
