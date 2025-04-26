const apiKey = "4f74ebf2feec6632d4058ce309e0e10a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";


let inputBox = document.getElementById("inputBox")
let searchBtn = document.getElementById("searchBtn")
let card = document.querySelector(".card")
let errorBox = document.querySelector(".error")
let weatherBox = document.querySelector(".weather")
let error = document.querySelector(".error p")

let previousValue = "";

const ShowData = (show) => {
    console.log(show);
    if (show.cod === 200) {

        card.classList.add("inc-height")
        weatherBox.style.display = "block"
       setTimeout(() => {
        weatherBox.classList.add("weather-show")
       }, 100);
        errorBox.style.display = "none"
        let imgPath = show.weather[0].icon;
        let temp = Math.floor(show.main.temp);
        let humidity = show.main.humidity;
        let wind = Math.floor(show.wind.speed);

        // Update All Details 
        document.querySelector(".weather img").src = `https://openweathermap.org/img/wn/${imgPath}@2x.png`;
        document.querySelector(".temp").innerHTML = `${temp}°C`;
        document.querySelector(".city").innerHTML = show.name;
        document.querySelector(".humidity").innerHTML = `${humidity}%`;
        document.querySelector(".wind").innerHTML = `${wind} km/h`;
        
    }
    
    else {
        errorBox.style.display = "block"
        weatherBox.style.display = "none"
        card.classList.remove("inc-height")
        error.innerHTML = `Invalid city name ${previousValue}`
    }

}

const getInput = async () => {
    const cityName = inputBox.value;
    const Response = await fetch(`${apiUrl}${cityName}&appid=${apiKey}`)
    const data = await Response.json()
    ShowData(data)


}

inputBox.addEventListener("keyup",
    function (e) {
        if (e.code == "Enter") {
            if (inputBox.value !== previousValue) {
                getInput()
                previousValue = inputBox.value;
                inputBox.value = ""
            }
            else {
                error.innerHTML = "Please Enter The City Name";
                errorBox.style.display = "block"
                weatherBox.style.display = "none"
                card.classList.remove("inc-height")
                
            }
        }
    }
)
searchBtn.addEventListener("click", function () {
    if (inputBox.value !== previousValue) {
        getInput()
        previousValue = inputBox.value;
        inputBox.value = ""
    }
    else {
        error.innerHTML = "Please Enter The City Name";
        errorBox.style.display = "block"
        weatherBox.style.display = "none"
        card.classList.remove("inc-height")
        
    }
  
})

