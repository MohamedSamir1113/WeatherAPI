let searchInput = document.getElementById(`search`)
let dataContainer = []
let tomForecastList = []
let afterForecastList = []

async function getWeather(country) {
    let myResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=c41b92fc983447b2925132656221010&q=${country}&days=3`)
    if (myResponse.status == 200) {
        let myData = await myResponse.json()
        dataContainer = myData
        tomForecastList = myData.forecast.forecastday[1]
        afterForecastList = myData.forecast.forecastday[2]

        displayToday()
        displayTommorow()
        displayAfter() 
    }

}

document.getElementById("search").addEventListener("keyup", e => {
    if (e.target.value.length < 2) {
        getWeather("cairo")
    } else {
        getWeather(e.target.value)
       
    }

});

getWeather("cairo")

function displayToday() {
    let temp = ` <div class="today-head d-flex justify-content-between px-2">
    <div class="day">${getDayName()}</div>
    <div class="date">${dataContainer.current.last_updated.slice(8, 10) + " " + getMonthName()}</div>
</div>

<div class="today-info pt-3 ps-3">
    <div class="city fs-3">${dataContainer.location.name}</div>
    <div class="degree ">${dataContainer.current.temp_c}
        <sup>o</sup>C
    </div>
    <div class="weather-icon">
        <img src="${dataContainer.current.condition.icon}" alt="">
    </div>

</div>

<div class="weather-state ps-3 pb-3">
    <div class="weatherCurrentState pb-3">${dataContainer.current.condition.text}</div>

    <span class="me-3">
        <img src="images/icon-umberella.png" alt="">
        20%
    </span>
    <span class="me-3"><img src="images/icon-wind.png" alt="">
        18 km/h</span>
    <span><img src="images/icon-compass.png" alt="">
        East</span>
</div>`


    document.querySelector(`.today-bg`).innerHTML = temp

}

function displayTommorow() {
    let temp = `<div class="tomm-head d-flex justify-content-center px-2">
<div class="tommorrow">${getTommorowName()}</div>
</div>

<div class="tomm-info text-center py-5">
<div ><img src="${tomForecastList.day.condition.icon}" alt=""></div>
<div class="tomm-degree1 fs-3 pt-3">${tomForecastList.day.maxtemp_c}
    <sup>o</sup>C
</div>
<div class="tomm-degree2">${tomForecastList.day.mintemp_c}
    <sup>o</sup>C
</div>
<div class="tomm-weather-state pt-4 pb-5">
    ${tomForecastList.day.condition.text}
</div>

</div>`
    document.getElementById(`tommforecast`).innerHTML = temp


}

function displayAfter() {
    let temp = `<div class="after-head d-flex justify-content-center px-2">
    <div class="tommorrow">${getAfterTommName()}</div>
    </div>
    
    <div class="after-info text-center py-5">
    <div><img src="${afterForecastList.day.condition.icon}" alt=""></div>
    <div class="after-degree1 fs-3 pt-3">${afterForecastList.day.maxtemp_c}
        <sup>o</sup>C
    </div>
    <div class="after-degree2">${afterForecastList.day.mintemp_c}
        <sup>o</sup>C
    </div>
    <div class="after-weather-state pt-4 pb-5">
    ${afterForecastList.day.condition.text}
    </div>
    
    </div>`

    document.getElementById(`afterforecast`).innerHTML = temp
}

function getDayName() {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let d = new Date(dataContainer.current.last_updated);
    let dayName = days[d.getDay()];
    return dayName
}

function getMonthName() {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let m = new Date(dataContainer.current.last_updated);
    let monthName = months[m.getMonth()];
    return monthName;
}

function getTommorowName() {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let d = new Date(/*dataContainer.current.last_updated*/);
    if (d.getDay()==6) {
         
        let dayName = days[0];
        return dayName
    }
    else
    {
        let dayName = days[d.getDay() + 1];
        return dayName
    }
    
}

function getAfterTommName() {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let d = new Date();
    if (d.getDay()==6) {
         
        let dayName = days[1];
        return dayName
    }
    else
    {
        let dayName = days[d.getDay() + 2];
        return dayName
    }
    
}



getTommorowName()
console.log("hello");
