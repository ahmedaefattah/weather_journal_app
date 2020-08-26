/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let month = d.getMonth() + 1;
let date = month +'.'+  d.getDate() + '.'+  d.getFullYear();

// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey  = '&appid=25a4273db6fe4c746c84657697fb35f6';

// Event listener to add function to existing HTML DOM element

document.getElementById('generate').addEventListener('click', performAction);


/* Function called by event listener */
function performAction(e){
const zip     = document.getElementById('zip').value;
const content = document.getElementById('feelings').value;
  if(zip != '') {
    getWeather(baseURL,zip,apiKey).then(function(data){
      postData('/add', {temp:data.main.temp, date:date, content:content});
    })
    .then(function() {
       updateUI();
    });
  }
}

/* Function to GET Web API Data*/
const getWeather = async (baseURL,zip,apiKkey)=>{

  const res = await fetch(baseURL+zip+apiKey);

  try {
    const data = await res.json();
    return data;
  }  catch(error) {
    console.log('error', error); 
  }
}


/* Function to POST data */
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  try {
    const newData = await response.json();
    return newData;
  }
  catch (error) {
    console.log(error);
  }
};



/* Function to GET Project Data */
const updateUI = async () => {
  const request = await fetch('/all');
  try{
    const allData = await request.json();

    document.getElementById('temp').innerHTML    = 'Temperature: ' + allData.temp;
    document.getElementById('date').innerHTML    = 'Date: ' + allData.date;
    document.getElementById('content').innerHTML = 'Feelings: ' + allData.content;
  }catch(error){
    console.log('error', error);
  }
} 
