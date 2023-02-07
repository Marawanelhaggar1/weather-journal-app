/* Global Variables */
const genBtn = document.getElementById("generate");

//the key for the URL
const apiKey = "&appid=47532def2877f15953b58e0a9aaed18a&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();

//the handeller function for the button for the addEventLisener
const genHandeller = () => {
  const zipCode = document.getElementById("zip").value;
  const fealings = document.getElementById("feelings").value;
  const baseURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}`;
  const fetchWeather = getMyData(baseURL);
  fetchWeather
    .then((weather) => {
      const projectData = {
        temp: weather.main.temp,
        fealings,
        newDate,
      };
      console.log(projectData);
      sendData("/add", projectData);
    })
    .then(() => {
      retrieveData();
    });
};

//get data from the weather service
const getMyData = async (baseURL) => {
  const res = await fetch(baseURL + apiKey);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

//send data to the server
const sendData = async (route, projectData) => {
  const response = await fetch(route, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });

  try {
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

//get data from server
const retrieveData = async () => {
  const request = await fetch("/get");
  try {
    // Transform into JSON
    const allData = await request.json();
    console.log(allData);
    // Write updated data to DOM elements
    document.getElementById("temp").innerHTML =
      Math.round(allData.temp) + "degrees";
    document.getElementById("content").innerHTML = allData.fealings;
    document.getElementById("date").innerHTML = allData.newDate;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

//the event listener
genBtn.addEventListener("click", genHandeller);
