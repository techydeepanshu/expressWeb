console.log("this is weather app");
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const submitBtn = document.getElementById('submitBtn');
const addbg = document.getElementById('addbg');
const temp = document.querySelector('.temp');
const temp_status = document.querySelector('.temp_status');
const temp_desp =document.querySelector('.temp_desp');
const middle_layer = document.querySelector('.middle_layer');
const today_data = document.querySelector('.today_data');
const tempInformation = document.querySelector('.tempInformation');
const day = document.querySelector('.day');
const apiKey = 'ddf200495b54ba685e3dc6a9aa22a2bd';

let currentLocation = 0;


addbg.classList.remove('bg3');

// set date
let nowDate = new Date();
let dayName = ["sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let din = dayName[nowDate.getDay()];
day.innerHTML = din;

// set month
    let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let Month = monthName[nowDate.getMonth()];
    let currentDate = nowDate.getUTCDate();
    today_data.innerHTML = `${currentDate} ${Month}`;

// geolocation api
function geoLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }else{
        console.log('this browser not supported geolocation api');
    }

}


function showPosition(position){
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log(`latitude : ${latitude}   &   longitude  :  ${longitude}`);
    let myapi = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}G&key=87f70e732bbd44d984f351fc57d3e4cc`;
    console.log(myapi);
    fetch(myapi).then((res)=>{
        console.log('this is response');
        return res.json();
    }).then((data)=>{
        console.log('this is data');
        currentLocation = data.results[0].components.city;
        console.log(currentLocation);
        // return currentLocation;
        if(currentLocation!=undefined){
            cityName.value = currentLocation;
            submitBtn.click();
        }
    })
    
}

geoLocation();

// *********
// cityName.value = currentLocation;
// console.log(currentLocation);
// if(cityName.value!=""){
//     getData();
// }



// **********

let getData = async (e)=>{
    e.preventDefault();
    console.log('clicked on search btn');
    let cityVal = cityName.value;

    
    if(cityVal==""){
        city_name.innerHTML="before search plz write city name";
        middle_layer.classList.add('data_hide');
    }else{
        try{

            // city name store in localStorage
            localStorage.setItem("city",cityVal);
            
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            console.log(arrData[0].main.temp);
            temp.children[0].innerHTML = Math.round(arrData[0].main.temp);
            city_name.innerHTML=`<h3>${arrData[0].name}, ${arrData[0].sys.country}</h3>`;


            // this code of clouds icons
            const tempicon = arrData[0].weather[0].main;
            // const tempicon = "Rain";
            console.log(tempicon);
            if(tempicon=="Clouds"){
                addbg.classList.remove('bg2');
                addbg.classList.remove('bg1');
                addbg.classList.add('bg3');
                tempInformation.classList.add('tempInformation_motion');
               
                    temp_status.innerHTML='<i class="fa fa-cloud" aria-hidden="true" > </i>';
            }else if(tempicon=="Sun"){
                addbg.classList.remove('bg2');
                addbg.classList.remove('bg1');
                addbg.classList.add('bg3');
                tempInformation.classList.add('tempInformation_motion');
                temp_status.innerHTML='<i class="fas fa-cloud-sun" aria-hidden="true" > </i>';
                
            }else if(tempicon=="Rain"){
                addbg.classList.remove('bg3');
                addbg.classList.remove('bg1');
                addbg.classList.add('bg2');
                tempInformation.classList.add('tempInformation_motion');
                temp_status.innerHTML='<i class="fas fa-cloud-rain" aria-hidden="true" > </i>';
                
            }else if(tempicon=="Thunderstorm"){
                addbg.classList.remove('bg1');
                addbg.classList.remove('bg3');
                addbg.classList.add('bg2');
                tempInformation.classList.add('tempInformation_motion');
                temp_status.innerHTML='<i class="fas fa-cloud-showers-heavy" aria-hidden="true" > </i>';
                
            }else{
                addbg.classList.remove('bg2');
                addbg.classList.remove('bg3');
                addbg.classList.add('bg1');
                tempInformation.classList.add('tempInformation_motion');
                temp_status.innerHTML='<i class="fas fa-sun" aria-hidden="true" style="color:#ffa200" > </i>';
                
            }
            // temp_desp = arrData[0].weather[0].description;
            middle_layer.classList.remove('data_hide');

             
        }
        catch{
            city_name.innerHTML="THIS CITY NOT EXIST";
            middle_layer.classList.add('data_hide');

        }

    }

}

submitBtn.addEventListener('click',getData);

