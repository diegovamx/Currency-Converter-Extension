let toRate = null
let fromRate = null

// let testAPI = "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_FUjmt5ohWo9SaIX7RwOi0FuY0ew700d9yRCsbiez&currencies=USD%2CMXN"

function fetchFromCurrency () {

    const fromSelection = document.getElementById("from");
    const fromCurrency = fromSelection.value
    const fromAPIKey = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_FUjmt5ohWo9SaIX7RwOi0FuY0ew700d9yRCsbiez&currencies=${fromCurrency}`

    fetch(fromAPIKey) 
    
    .then(response => {
        if (!response.ok) {
        throw new Error('Data could not be fetcehd');
        }
        return (response.json())


    })
    .then(data => {
        fromRate = data.data[fromCurrency]
        console.log(fromRate)
    })
    .catch(error => console.error(error))
}

function fetchToCurrency () {

    const toSelection = document.getElementById("to");
    const toCurrency = toSelection.value
    const toAPIKey = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_FUjmt5ohWo9SaIX7RwOi0FuY0ew700d9yRCsbiez&currencies=${toCurrency}`

    fetch(toAPIKey) 
    
    .then(response => {
        if (!response.ok) {
        throw new Error('Data could not be fetcehd');
        }
        return (response.json())

    })
    .then(data => {
        toRate = data.data[toCurrency]
        console.log(toRate)
    })
    .catch(error => console.error(error))

}


const convertBtn = document.getElementById("convert")
const resultEl = document.getElementById("result-container")



convertBtn.addEventListener("click", function convert() {
    fetchFromCurrency()
    fetchToCurrency()
    let fromAmount = Number(document.getElementById("amount").value)


    if (isNaN(fromAmount) || !Number.isInteger(fromAmount)) {
        alert("Please enter a valid amount to convert.")
    } else if (fromAmount === 0) {
        alert("Please enter an amount higher than 0.")
    } else {
        let conversionRate = toRate/fromRate
        let result = fromAmount * conversionRate
        if (isNaN(result)) {
            fetchFromCurrency()
            fetchToCurrency()
        }
        else {
            resultEl.innerHTML = `<p id="result">Result: $${result.toFixed(2)}</p>`
            console.log(result)
        }
        
    }
})




