function calculateRecyclingValue() {

    let requests = JSON.parse(localStorage.getItem("pickupRequests")) || []

    let plasticPrice = 0.25
    let metalPrice = 0.40
    let organicPrice = 0.10

    let totalValue = 0

    requests.forEach(r => {

        if (r.wasteType === "plastique") {

            totalValue += r.quantity * plasticPrice

        }

        if (r.wasteType === "metal") {

            totalValue += r.quantity * metalPrice

        }

        if (r.wasteType === "organique") {

            totalValue += r.quantity * organicPrice

        }

    })

    return totalValue

}