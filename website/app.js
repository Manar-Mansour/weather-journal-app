/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = ',us&appid=b66f9d9fea7d4721ad4fc43934964606&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

//handle clicking the generate button
document.getElementById('generate').addEventListener('click', performAction);
function performAction(e){  
    e.preventDefault();
    let zipCode=document.getElementById('zip').value;
    let feelings =document.getElementById('feelings').value;
    getData(baseURL,zipCode,apiKey)
    .then(function(data){
        console.log(data);// to check 
        //post data to the server
        postData('/addData', {temperature:data.main.temp, date: newDate, response:feelings});  
    })
}

const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      //console.log('This is all fetched data:\n'+allData);
      //Update the relevant UI fields corresponding to the data in the server
      document.getElementById('date').innerHTML = 'Date is: '+allData.date;
      document.getElementById('temp').innerHTML = 'Temperature in Celsius is: '+allData.temperature+'°C';
      document.getElementById('content').innerHTML = 'How you feel today: '+allData.response;
    }catch(error){
      console.log("error", error);
    }
}

const getData = async (baseURL,zipCode,apiKey)=>{
      const res = await fetch(baseURL+zipCode+apiKey)
      try {
        const data = await res.json();
        return(data);
      }  catch(error) {
        console.log("error", error);
      }
}

const postData = async ( url = '', data = {})=>{
    console.log(data);
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data)
    });

      try {
        const newData = await response.json();
        console.log(newData);//to check
        updateUI();//update the UI based on the new data in the server
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }

