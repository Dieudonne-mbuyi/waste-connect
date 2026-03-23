async function loadAnalytics() {
    let users = JSON.parse(localStorage.getItem("users")) || []
    let collectors = users.filter(u => u.role === "collector")
    let producers = users.filter(u => u.role === "producer")

    let requests = JSON.parse(localStorage.getItem("pickupRequests")) || []

    let totalWaste = 0

    requests.forEach(r => {

        totalWaste += Number(r.quantity)

    })

    document.getElementById("totalCollectors").innerText = collectors.length
    document.getElementById("totalProducers").innerText = producers.length
    document.getElementById("totalWaste").innerText = totalWaste + " kg"

}