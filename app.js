const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req,res){

  // res.sendFile(__dirname + "/result.html");
    const query = req.body.cityName;
    const apiKey = "b9e2f508fab134220b00351726b42b5f";
    const unit = req.body.enterUnit;
    const url="https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit + "";

    https.get(url, function(response){
        console.log(response.statusCode);
              response.on("data",function(data){
                const weatherData = JSON.parse(data);
                const temp = weatherData.main.temp;
                const weatherDescription = weatherData.weather[0].description
                const icon = weatherData.weather[0].icon
                const imageURL = " https://openweathermap.org/img/wn/" + icon + "@2x.png";
                //
                // res.write("<p>The weather is " + weatherDescription + "</p>");
                // res.write("<h1>The Tempreture in " + query + " is " + temp + " degree Celcius.</h1>");
                // res.write("<img src=" + imageURL + ">");
                // res.send();

                res.render("list", {wd : weatherDescription});


             })
    })
})

app.post("/list", function(req,res){
  res.redirect("/");
})

app.listen(3000,function(){
  console.log("WeatherProject server is running on port 3000.");
})
