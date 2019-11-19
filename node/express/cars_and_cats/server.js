// const http = require('http');
// const fs = require('fs');
const express = require('express');
const app = express();
// var path = require ('path');
app.use(express.static(__dirname + "/static"));
// app.use(express.static(__dirname + "/static/css"));
app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');
// app.set('views',__dirname + '/static/css');
app.get('/', (request, response) => {
	response.render('index.html');
});
app.get('/cars', (request, response) => {
	response.render('cars');
});
app.get('/cats', (request, response) => {
	response.render('cats');
});
app.get('/cars/new', (request, response) => {
	response.render('new');
});
app.get('/cat_1', (request, response) => {
	var cat_data = [
		{'name' : "Kitty", 'age' : "1"},
	];
	response.render('details', {cats : cat_data});
});
app.get('/cat_2', (request, response) => {
	var cat_data = [
		{'name' : "Walnut", 'age' : "2"},
	];
	response.render('details', {cats : cat_data});
});
app.get('/cat_3', (request, response) => {
	var cat_data = [
		{'name' : "Meow", 'age' : "2"},
	];
	response.render('details', {cats : cat_data});
});
app.listen(8000, () => console.log("listening on port 8000"));
