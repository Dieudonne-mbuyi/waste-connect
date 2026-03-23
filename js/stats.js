function calculateStats() {

    let requests = JSON.parse(localStorage.getItem("pickupRequests")) || []

    let totalKg = 0

    requests.forEach(r => {

        totalKg += Number(r.quantity)

    })

    return {

        totalRequests: requests.length,
        totalWaste: totalKg

    }

}