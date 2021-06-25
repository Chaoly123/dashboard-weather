var apiKey = "40e044300963894aebe6856af8bed421"
var searchBtn = document.getElementById("search")

function mainSearch() {
    var city = document.getElementById("inputData").value
    searchCity(city)
}

function searchCity(city) {

    var urlCurrentWeather = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial"

    fetch(urlCurrentWeather)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            console.log(data.main.temp)
            // <h1 id="cityName"></h1>
            // <h2 id="temp">Temperature</h>
            // <h3 id="wind">Wind</h3>
            // <h4 id="humid">Humidity</h4>
            document.getElementById("cityName").textContent = data.name
            document.getElementById("temp").textContent = data.main.temp + " " + "F"
            document.getElementById("wind").textContent = data.wind.speed + " " + "MPH"
            document.getElementById("humid").textContent = data.main.humidity + " " + "%"
        })

    var urlFiveDay = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial"

    fetch(urlFiveDay)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            var noonArr = data.list.filter(index => index.dt_txt.includes("12:00"))
            console.log(noonArr)

            var forecastContainer = document.querySelector(".forecast")
            forecastContainer.innerHTML = "";

            var newRow = document.createElement("div")
            newRow.setAttribute("class", "row")
            for (i = 0; i < noonArr.length; i++) {
                // <div class="card" style="width: 18rem;">
                //     <div class="card-body">
                //         <h5 class="card-title">Card title</h5>
                //         <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                //         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                //     </div>
                // </div>
                var newCardCont = document.createElement("div")
                newCardCont.setAttribute("class", "card col mr-1 bg-dark text-white")

                var newCardBody = document.createElement("div")
                newCardBody.setAttribute("class", "card-body")

                var newCardTitle = document.createElement("h5")
                newCardTitle.setAttribute("class", "card-title")
                newCardTitle.textContent = noonArr[i].main.temp + ' ' + "F"

                var newCardWind = document.createElement("p")
                newCardWind.setAttribute("class", "card-text")
                newCardWind.textContent = noonArr[i].wind.speed + ' ' + "mph"

                var newCardhumidity = document.createElement("p")
                newCardhumidity.setAttribute("class", "card-text")
                newCardhumidity.textContent = noonArr[i].main.humidity + ' ' + "%"

                var newCardDate = document.createElement("p")
                newCardDate.setAttribute("class", "card-text")
                newCardDate.textContent = noonArr[i].dt_txt.split(" ")[0]

                newCardBody.appendChild(newCardDate)
                newCardBody.appendChild(newCardTitle)
                newCardBody.appendChild(newCardWind)
                newCardBody.appendChild(newCardhumidity)
                //newCardBody.appendChild(somethingNewCreated)
                newCardCont.appendChild(newCardBody)
                newRow.appendChild(newCardCont)
            }
            forecastContainer.appendChild(newRow)
        })
}

searchBtn.addEventListener("click", mainSearch)