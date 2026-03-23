// ==========================
// Variables globales
// ==========================
let userLat = null;
let userLng = null;

// ==========================
// Récupération de la géolocalisation
// ==========================
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            userLat = position.coords.latitude;
            userLng = position.coords.longitude;
            loadCollectors(); // reload pour afficher les distances
        },
        (err) => {
            console.warn("Géolocalisation non autorisée, distances non calculées.");
            loadCollectors(); // charger sans distance
        }
    );
} else {
    loadCollectors(); // pas de géolocalisation
}

// ==========================
// Charger tous les collecteurs
// ==========================
async function loadCollectors() {
    try {
        const response = await fetch("data/collectors.json");
        const collectors = await response.json();
        displayCollectors(collectors);
    } catch (err) {
        console.error("Erreur chargement collecteurs:", err);
    }
}

// ==========================
// Affichage des collecteurs
// ==========================
function displayCollectors(list) {
    const container = document.getElementById("collectorList");
    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = "<p>Aucun collecteur trouvé pour cette localisation.</p>";
        return;
    }

    list.forEach(c => {
        let distance = "N/A";
        if (userLat && userLng) {
            const d = getDistance(userLat, userLng, c.lat, c.lng);
            distance = d.toFixed(1) + " km";
        }

        container.innerHTML += `
            <div class="card">
                <h3>${c.name}</h3>
                <p>📍 Commune : ${c.location}</p>
                <p>📏 Distance : ${distance}</p>
                <p>⭐ Note : ${c.rating}</p>
                <p>📞 Téléphone : ${c.phone}</p>
                <div class="collector-actions">
                    <button class="btn-contact" onclick="openChat('${c.name}')">💬 Contacter</button>
                </div>
            </div>
        `;
    });
}

// ==========================
// Fonction de recherche par localisation
// ==========================
async function searchCollector() {
    const locationInput = document.getElementById("locationSearch").value.toLowerCase();

    try {
        const response = await fetch("data/collectors.json");
        const collectors = await response.json();

        const results = collectors.filter(c =>
            c.location.toLowerCase().includes(locationInput)
        );

        displayCollectors(results);
    } catch (err) {
        console.error("Erreur recherche collecteurs:", err);
    }
}

// ==========================
// Fonction chat
// ==========================
function openChat(name) {
    localStorage.setItem("currentCollector", name);
    window.location.href = "chat.html";
}

// ==========================
// Calcul de la distance (Haversine)
// ==========================
function getDistance(lat1, lng1, lat2, lng2) {
    const R = 6371; // rayon de la terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1 * Math.PI / 180) *
        Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLng / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}