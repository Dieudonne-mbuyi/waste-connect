async function loadAnalytics() {

    let collectors = await fetch("data/collectors.json")
    collectors = await collectors.json()

    let producers = await fetch("data/producers.json")
    producers = await producers.json()

    let requests = JSON.parse(localStorage.getItem("pickupRequests")) || []

    let totalWaste = 0

    requests.forEach(r => {

        totalWaste += Number(r.quantity)

    })

    document.getElementById("totalCollectors").innerText = collectors.length
    document.getElementById("totalProducers").innerText = producers.length
    document.getElementById("totalWaste").innerText = totalWaste + " kg"

}