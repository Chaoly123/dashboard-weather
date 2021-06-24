var apiKey = "40e044300963894aebe6856af8bed421"
var searchBtn = document.getElementById("search")

function mainSearch () {
    var city = document.getElementById("inputData").value
    searchCity(city)
}

function searchCity (city){

    var urlCurrentWeather = "http://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=" + apiKey + "&units=imperial"
    
    fetch(urlCurrentWeather)
    .then(function(response) {
        return response.json()
    })
    .then(function(data){
        console.log(data)
        console.log(data.main.temp)
        document.getElementById("cityName").textContent = data.name
    })

    var urlFiveDay = "http://api.openweathermap.org/data/2.5/forecast?q="+ city +"&appid=" + apiKey + "&units=imperial"

    fetch(urlFiveDay)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        var noonArr = data.list.filter(index => index.dt_txt.includes("12:00"))
        console.log(noonArr)
    })
}

searchBtn.addEventListener("click", mainSearch)