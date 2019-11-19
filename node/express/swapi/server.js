const express = require("express");
const app = express();
app.use(express.static(__dirname + "/static"));

const session = require('express-session');
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.urlencoded({extended: true}));

app.get("/", (request, response) => {
	response.render("index")
});

const axios = require('axios');
app.get('/people', function(request, response){

    // use the axios .get() method - provide a url and chain the .then() and .catch() methods
    axios.get('http://swapi.co/api/people')
    .then(data => {
        // log the response.data before moving on! 
        console.log(data.data);
        // rather than rendering, just send back the json response.data!
        response.json(data.data);
    })
    .catch(error => {
        // log the error before moving on!
        console.log(error);
        response.json(error);
    })
});

app.get('/planet', function(request, response){
    // use the axios .get() method - provide a url and chain the .then() and .catch() methods
    axios.get('http://swapi.co/api/planets')
    .then(data => {
        // log the response.data before moving on! 
        console.log(data.data);
        // rather than rendering, just send back the json response.data!
        response.json(data.data);
    })
    .catch(error => {
        // log the error before moving on!
        console.log(error);
        response.json(error);
    })
});

app.get('/all_planets', function(request, response){
    // use the axios .get() method - provide a url and chain the .then() and .catch() methods
    	var arr = [];
        axios.get('http://swapi.co/api/planets/')
	    .then(data => {
	    	arr += data.data.results;
	    	while(data.data.next!="null"){
                console.log(arr);
                var r = axios.get(data.data.next);
                arr += r.results;
                console.log("----------------------------")
                        console.log(arr);
                        response.json(data.data);
            }
                    })
               
                
                    .catch(error => {
                        // log the error before moving on!
                        console.log(error);
                        response.json(error);
                    })
                
			   
});

app.listen(8000, () => console.log("Port is listening at 8000"));