console.log("WasteConnect chargé");
navigator.geolocation.getCurrentPosition(function (position) {

    document.getElementById("lat").value = position.coords.latitude;

    document.getElementById("lng").value = position.coords.longitude;

});

// MODE SOMBRE

const toggleDark = document.createElement("button")
toggleDark.innerText = "🌙 Mode sombre"
toggleDark.style.position = "fixed"
toggleDark.style.bottom = "20px"
toggleDark.style.right = "20px"

document.body.appendChild(toggleDark)

toggleDark.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode")

    localStorage.setItem(
        "darkMode",
        document.body.classList.contains("dark-mode")
    )

})

if (localStorage.getItem("darkMode") === "true") {

    document.body.classList.add("dark-mode")

}


function rateCollector(email) {

    let rating = prompt("Donnez une note entre 1 et 5")

    if (!rating) return

    let ratings = JSON.parse(localStorage.getItem("ratings")) || {}

    if (!ratings[email]) {

        ratings[email] = []

    }

    ratings[email].push(Number(rating))

    localStorage.setItem("ratings", JSON.stringify(ratings))

    alert("Merci pour votre évaluation")

}
const burger = document.querySelector(".menu-toggle")
const navMenu = document.querySelector("nav ul")
const navLinks = document.querySelectorAll("nav ul li a")

// ouvrir et fermer menu

burger.addEventListener("click", () => {

    burger.classList.toggle("active")
    navMenu.classList.toggle("show")

})

// fermer menu quand on clique sur un lien

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        burger.classList.remove("active")
        navMenu.classList.remove("show")

    })

})

// fermer menu quand on clique hors du menu

document.addEventListener("click", (event) => {

    if (
        !burger.contains(event.target) &&
        !navMenu.contains(event.target)
    ) {

        burger.classList.remove("active")
        navMenu.classList.remove("show")

    }

})


const elements = document.querySelectorAll(".fade-in")

window.addEventListener("scroll", () => {

    elements.forEach(el => {

        const position = el.getBoundingClientRect().top

        if (position < window.innerHeight - 100) {

            el.classList.add("visible")

        }

    })

})