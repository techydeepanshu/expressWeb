console.log('index.js');

const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
const submitBtn = document.getElementById('submitBtn');
const middle_layer = document.querySelector('.middle_layer');
const temp_c = document.querySelector('.temp_c');
const addbg = document.getElementById('addbg');
const day = document.querySelector('.day');
const today_data = document.querySelector('.today_data');
const tempInformation = document.querySelector('.tempInformation');
const temp_status = document.querySelector('.temp_status');
const btn_position = document.querySelector('.btn_position');
const apiKey = 'ddf200495b54ba685e3dc6a9aa22a2bd';


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

let getData = async (e)=>{
    // e.preventDefault();
    console.log('clicked on search btn');
    let cityVal = localStorage.getItem("city");
    console.log(cityVal);
    
    if(cityVal==""){
        city_name.innerHTML="before search plz write city name";
        middle_layer.classList.add('data_hide');
    }else{
        // try{

            // city name store in localStorage
            localStorage.setItem("city",cityVal);
            
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=${apiKey}`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            console.log("temp : "+arrData[0].main.temp);
            temp_c.innerHTML = Math.round(arrData[0].main.temp);
            console.log('hello');
            city_name.innerHTML=`<h3>${arrData[0].name}, ${arrData[0].sys.country}</h3>`;
            console.log(`<h3>${arrData[0].name}, ${arrData[0].sys.country}</h3>`);

            // this code of clouds icons
            const tempicon = arrData[0].weather[0].main;
            // const tempicon = "Rain";
            console.log(tempicon);
            if(tempicon=="Clouds"){
                addbg.classList.remove('bg2');
                addbg.classList.remove('bg1');
                addbg.classList.add('bg3');
                // addbg.style.cssText=`
                // margin:2rem;`;
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

             
        // }
        // catch{
        //     city_name.innerHTML="THIS CITY NOT EXIST";
        //     middle_layer.classList.add('data_hide');

        // }

    }

}

let get = localStorage.getItem('city');
if(get != null){

    addbg.classList.remove('d-none');
    getData();
}else{
    console.log('condition false');
    addbg.classList.add('d-none');

}


btn_position.addEventListener("click",()=>{
    localStorage.removeItem('city');
    addbg.classList.add('d-none');
})