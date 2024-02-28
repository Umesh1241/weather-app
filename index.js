// const city="https://api.openweathermap.org/data/2.5/weather?units=metric&q={city name}&appid=9b95560f369cda74cc6a19ba191d8202";
let alertShown=false;
$('button').on('mouseover',function(){
    if(alertShown===false){
    alert('click here to get live location');
    alertShown=true;
    }
});
const currLoc="https://nominatim.openstreetmap.org/reverse?lat=<value>&lon=<value>&<params>"
const apiKey = "9b95560f369cda74cc6a19ba191d8202";

async function Generateweather(cityName) {
  try {
    const weather = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${cityName}&appid=${apiKey}`);
    if(weather.status===404){
        alert("invalid data");
        setTimeout(function() {
            location.reload();
          }, 1);
    }
    else{
    const data = await weather.json();
    // console.log(data);
    // console.log(data.name);
    $(".city").text(data.name);
    // console.log(data.main.temp);
    $(".temp").text(data.main.temp + "°C");
    $(".humid").text(data.main.humidity + "%");
    $(".winddy").text(data.wind.speed + " kmph");
    // console.log(data.main.temp_min);
    // console.log(data.main.temp_max);
    $(".min-1").text(Math.round(data.main.temp_min) + "°C");
    $(".max-1").text(Math.round(data.main.temp_max) + "°C");
    // console.log(data.weather[0].main);
    if (data.weather[0].main == "Clear") $('.logo').attr('src',"images/clear.png");
    else if (data.weather[0].main == "Clouds") $('.logo').attr('src',"images/clouds.png");
    else if (data.weather[0].main == "Rain") $('.logo').attr('src',"images/rain.png");
    else if (data.weather[0].main == "Drizzle") $('.logo').attr('src',"images/drizzle.png");
    else if (data.weather[0].main == "Mist") $('.logo').attr('src',"images/mist.png");
    else if (data.weather[0].main == "Snow") $('.logo').attr('src',"images/snow.png");
    else if (data.weather[0].main == "Haze") $('.logo').attr('src',"images/haze.png");
    $(".text").text(data.weather[0].description);
  }
 } catch (err) {
    console.error(err);
  }
}
$('input').on("keypress",function(e){
  if(e.which===13 && $('input').val()!==""){
    const inputVal=$(this).val();
    Generateweather(inputVal);
  }
});


async function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function(position){
        const lat=position.coords.latitude;
        const long=position.coords.longitude;
        // async function currWeather(){
            try{
            const curr= await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`);
            const data=await curr.json();
            console.log(data.address.city);
            const place=data.address.city;
            Generateweather(place);
            // console.log(data);
            }
            catch(err){
                console.error(err);
            }
        // }
      });
    }
    else{
        console.log("geolocation is not supported by your browser");
    }
}
$('button').on('click',getLocation);


