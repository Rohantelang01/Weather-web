
const inputCity = document.querySelector(".input");
const searchBtn = document.querySelector(".searchIcun");
const cityNameCtr = document.querySelector(".cityName");
const tempratureCtr = document.querySelector(".temperature");
const timeCtr = document.querySelector(".time");
const dateCtr = document.querySelector(".datectr");
const curentWeatherPng = document.querySelector(".curentWeatherPng");
const tempConditionCtr = document.querySelector(".tempConditionCtr");
const dayPart = document.querySelector(".dayPart");
const hoursWeather = document.querySelector(".todayTimetemp");

// Check if city weather data is stored in localStorage
const storedCityWeather = localStorage.getItem("cityWeather");

// If data exists, parse and set it
if (storedCityWeather) {
    const cityWeather = JSON.parse(storedCityWeather);
    setWeatherDetails(cityWeather);
}

inputCity.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        search();
    }
});

searchBtn.addEventListener("click", () => {
    search();
});


async function search() {
    try {
        let url = "https://api.weatherapi.com/v1/forecast.json";
        let apiKey = "7ef22ab9c4ce479280c82702241503"; // Replace with your actual API key
        let location = inputCity.value;
        let apiUrl = `${url}?key=${apiKey}&q=${location}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Network response was not okay");
        }

        const data = await response.json();
        if (data.error) {
            throw new Error("City not found");
        } else {
            localStorage.setItem("cityWeather", JSON.stringify(data)); // Store city weather data in localStorage
            setWeatherDetails(data);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("City not found");
    }
}


function setWeatherDetails(data) {
    try {
        console.log(data)
        const tempCelcius = data.current.temp_c;
        const tempFahrenheit = data.current.temp_f;
        const tempCondition = data.current.condition.text;
        const tempConditionImg = data.current.condition.icon;
        setTemperature(tempCelcius, tempFahrenheit, tempCondition, tempConditionImg);

        const cityName = data.location.name;
        const stateName = data.location.region;
        const countryName = data.location.country;
        setCityDetails(cityName, stateName, countryName);

        const nowDate = data.location.localtime.split(" ")[0];
        const nowTime = data.location.localtime.split(" ")[1];

        setDateAndTime(nowDate, nowTime);

        
         //wind Details
         setWindDetails(data.current.wind_dir,data.current.wind_kph)

         setHumidityDetails(data.current.humidity)

         //pressure
         setPressureDetails(data.current.pressure_in,data.current.pressure_mb)

        //visibility
        setVisibilityDetails(data.current.vis_km,data.current.vis_miles)
        //Gust
        setGustDetails(data.current.gust_kph,data.current.gust_mph)
        //maximum and minmum Temprature
        setMaxAndMinTemp(data.forecast.forecastday[0].day.maxtemp_c,data.forecast.forecastday[0].day.mintemp_c)
        //sunRise And SunSet 
        setSunRiseAndSet(data.forecast.forecastday[0].astro.sunrise,data.forecast.forecastday[0].astro.sunset)
        //moon rise and moon set
        setMoonRiseAndSet(data.forecast.forecastday[0].astro.moonrise,data.forecast.forecastday[0].astro.moonset)
        console.log(data.forecast.forecastday[0].astro.moonrise)
        // hours wise Weather
        setHoursWeather(data.forecast.forecastday[0].hour)

    } catch (error) {
        console.error("Error in setWeatherDetails:", error);
        // Handle error gracefully, e.g., display an error message to the user
    }
}

function setCityDetails(cityName, stateName, countryName) {
    try {
        cityNameCtr.innerHTML = `${cityName}<br><span>${stateName}, ${countryName}</span>`;
        cityNameCtr.classList.add("centerItom");
    } catch (error) {
        console.error("Error in setCityDetails:", error);
        // Handle error gracefully, e.g., display an error message to the user
    }
}

function setTemperature(tempCelcius, tempFahrenheit, tempCondition, tempConditionImg) {
    try {
        curentWeatherPng.src = tempConditionImg;
        tempratureCtr.textContent = tempCelcius;
        tempConditionCtr.textContent = tempCondition;
        document.querySelector(".tempCelciusCtr").innerText = `${tempCelcius}°C`;
        document.querySelector(".tempFarenheitCtr").innerText = `${tempFahrenheit}°C`;
    } catch (error) {
        console.error("Error in setTemperature:", error);
        // Handle error gracefully, e.g., display an error message to the user
    }
}

function setDateAndTime(nowDate, nowTime) {
    try {
        dateCtr.innerText = nowDate;
        let hours = parseInt(nowTime.split(':')[0]);
        let AmorPm;
        if (12 <= hours) {
            AmorPm = "AM";
            hours -= 12;
        } else {
            AmorPm = "PM";
        }
        nowTime = `${hours}:${nowTime.split(":")[1]}${AmorPm}`;
        timeCtr.textContent = nowTime;

        if (AmorPm === "AM") {
            dayPart.textContent = "day";
        } else {
            dayPart.textContent = "night";
        }
    } catch (error) {
        console.error("Error in setDateAndTime:", error);
        // Handle error gracefully, e.g., display an error message to the user
    }
}

function setWindDetails(direction,kph){
    try {
        console.log(direction)
    document.querySelector(".WindDirCtr").innerText = `${direction} Direction`
    document.querySelector(".windkphCtr").textContent = `${kph} kph`
    } catch (error) {
        console.error("Error in setDateAndTime:", error);
        // Handle error gracefully, e.g., display an error message to the user
    }
}

function setHumidityDetails(humadity){
   try {
    document.querySelector(".humadityValueCtr").innerText = `${humadity}%`
   } catch (error) {
    console.error("Error in setDateAndTime:", error);
    // Handle error gracefully, e.g., display an error message to the user
   }
}

function setPressureDetails(In,mb){
    try {
        
        document.querySelector(".pressureInctr").textContent = `${In} in`
    document.querySelector(".pressurembCtr").textContent = `${mb} mb`
    } catch (error) {
        console.error("Error in setDateAndTime:", error);
        // Handle error gracefully, e.g., display an error message to the user
    }
}

function setVisibilityDetails(km,miles){
   try {
    console.log(miles)
    document.querySelector(".visibilityKmCtr").innerText = `${km} km`
    document.querySelector(".visibilityMilesCtr").innerText = `${miles} miles`
   } catch (error) {
    console.error("Error in setDateAndTime:", error);
        // Handle error gracefully, e.g., display an error message to the user
   }
}

function setGustDetails(kph,mph){
    try {
        document.querySelector(".gustKphCtr").textContent = `${kph} kph`
    document.querySelector(".gustMphCtr").textContent = `${mph} mph`
    } catch (error) {
        console.error("Error in setDateAndTime:", error);
        // Handle error gracefully, e.g., display an error message to the user
    }

}

function setMaxAndMinTemp(max,min){
    document.querySelector(".maxTempratureCtr").innerText = max;
    document.querySelector(".minTempratureCtr").innerText = min;
}
function setSunRiseAndSet(rise,set){
    document.querySelector(".sunRiseCtr").innerText = rise;
   document.querySelector(".sunSetCtr").innerText = set
}

function setMoonRiseAndSet(rise,set){
    document.querySelector(".moonRiseCtr").innerText = rise;
   document.querySelector(".moonSetCtr").innerText = set
}
function setHoursWeather(hoursTemprature) {
    // Clear previous content of hoursWeather div
    hoursWeather.innerHTML = "";

  
        hoursTemprature.forEach(temp => {
            let nowDate = temp.time.split(" ")[0];
            let nowTime = temp.time.split(" ")[1];
            let nowHours = nowTime.split(":")[0];
            let realTime;
            if (nowHours >= 12) {
                realTime = `${nowHours - 12}:${nowTime.split(":")[1]}PM`;
            } else {
                realTime = `${nowHours}:${nowTime.split(":")[1]}AM`;
            }
            console.log(realTime);
            let div = document.createElement("div");
            div.classList.add("hours");
            div.innerHTML = `<span class="timeCtr">${realTime}</span>
            <img src="${temp.condition.icon}" alt="pbg">
            <span class="timeConditionCtr"> ${temp.condition.text}</span>
            <span class="timeTemp">${temp.temp_c}°C</span>`;
            hoursWeather.appendChild(div);
        });
    
}
