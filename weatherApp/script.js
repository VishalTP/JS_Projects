// https://api.openweathermap.org/data/2.5/weather?q=new%20delhi&appid=f5ca9e2ab03d2e5e59b34f648da4c1e4

const search = document.querySelector(".search")
const input = document.querySelector("input")
const _main = document.querySelector("main")
const weatherDetails = document.querySelector(".weather_details")

const _place = document.querySelector(".place"),
      _currentTemp = document.querySelector(".currentTemp"),
      _high = document.querySelector(".high"),
      _low = document.querySelector(".low"),
      _situation = document.querySelector(".situation"),
      _feelsLike = document.querySelector(".feelsLike"),
      _humidity = document.querySelector(".humidity"),
      _wind = document.querySelector(".wind"),
      _icon = document.querySelector(".icon")

const toggleUnits = document.querySelector(".toggleUnits"),
      saveLocation = document.querySelector(".saveLocation"),
      home = document.querySelector(".home"),
      refresh = document.querySelector(".refresh"),
      latLong = document.querySelector(".latLong")

let unit = "metric",
    currentPlace
const imgLinks = ['./clear.jpg', './snow.jpg', './clouds.jpg', './smoke.jpg', './haze.jpg']

const changeBackground = (link)=>{
    _main.style.background= `url(${link})`
    _main.style.backgroundPosition= "center"
    _main.style.backgroundSize= "cover"
    _main.style.backgroundColor= "rgba(0,0,0, .3)"
    _main.style.backgroundBlendMode= "overlay";
}

const displayData = (parsedData)=>{
    const {name:place, country, temp, temp_max:high, temp_min:low, main:situation, feels_like, humidity, speed:wind} = {...parsedData, ...parsedData.sys, ...parsedData.main, ...parsedData.weather[0],...parsedData.wind}
    currentPlace = place
    _place.textContent = `${place}, ${country}`
    _currentTemp.innerHTML =`${temp.toFixed(1)}${unit==="metric"?`&#8451;` :`&#8457`}`
    _high.innerHTML = `High ${high.toFixed(1)}${unit==="metric"?`&#8451;` :`&#8457`}`
    _low.innerHTML = `Low ${low.toFixed(1)}${unit==="metric"?`&#8451;` :`&#8457`}`
    _situation.textContent = `${situation}`
    _feelsLike.innerHTML = `Feels Like ${feels_like}${unit==="metric"?`&#8451;` :`&#8457`}`
    _humidity.textContent = `Humidity ${humidity}%`
    _wind.textContent = `Wind ${unit==="metric"?`${(wind*3.6).toFixed(1)}kmph` :`${wind.toFixed(1)}mph`}`
    
    if(situation==="Clear"){
        changeBackground(imgLinks[0])
        _icon.innerHTML =`<i class="fas fa-cloud-sun fa-2x"></i>`
    }else if(situation==="Snow"){
        changeBackground(imgLinks[1])
        _icon.innerHTML = `<i class="fas fa-snowflake fa-2x"></i>`
    }else if(situation==="Clouds"){
        changeBackground(imgLinks[2])
        _icon.innerHTML = `<i class="fas fa-clouds fa-2x"></i>`
    }else if(situation==="Smoke"){
        changeBackground(imgLinks[3])
        _icon.innerHTML = `<i class="fas fa-smoke fa-2x"></i>`
    }else if(situation==="Haze"){
        changeBackground(imgLinks[4])
        _icon.innerHTML = `<i class="fas fa-sun-haze fa-2x">`
    }
}

const fetchData = async (place, lat=0, long=0)=>{
    let api
    try{
        if(lat && long)
            api= `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=f5ca9e2ab03d2e5e59b34f648da4c1e4&units=${unit}`
        else
            api = `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=f5ca9e2ab03d2e5e59b34f648da4c1e4&units=${unit}`
        const fetchedData = await fetch(api)
        const parsedData = await fetchedData.json()
        displayData(await parsedData)
    }catch(err){
        alert("Oops! cant find the location")
    }
}

search.addEventListener("click", ()=>{
    if(input.value)
        fetchData(input.value)
    else
        alert("Enter you location")
    input.value = ""
})

toggleUnits.addEventListener("click", ()=>{
    if(unit === "metric")
        unit = "imperial"
    else    
        unit ="metric"
    weatherDetails.style.opacity = 0
    setTimeout(()=>{
        fetchData(currentPlace)
        weatherDetails.style.opacity = 1
    }, 300)
})

saveLocation.addEventListener("click", ()=>{
    localStorage.setItem("home", currentPlace)
    alert(`${currentPlace} saved as tour home location`)
})

home.addEventListener("click", ()=>{
    let home = localStorage.getItem("home")
    if(home){
        weatherDetails.style.opacity = 0
        setTimeout(()=>{
            fetchData(home)
            weatherDetails.style.opacity = 1
        }, 300)
    }else    
        alert("Please set your home location first")
})

refresh.addEventListener("click", ()=>{
    unit = "metric"
    weatherDetails.style.opacity = 0
    setTimeout(()=>{
        fetchData(currentPlace)
        weatherDetails.style.opacity = 1
    }, 300)
})

latLong.addEventListener("click", ()=>{
    let lat, long
    try {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position)=>{
                lat = position.coords.latitude
                long = position.coords.longitude
                fetchData("", lat, long)
            });
        } else { 
            throw(err)
          }
    } catch (error) {
        alert("Not able to access your Geo-location")
    }
})

const onLoad = ()=>{
    currentPlace = localStorage.getItem("home")
    if(!currentPlace)
        currentPlace = "Kerala"
    fetchData(currentPlace)
}
onLoad()
