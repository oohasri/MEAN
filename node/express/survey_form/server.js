const express = require('express');
const app = express();

const session = require('express-session');
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.use(express.static(__dirname + "/static"));

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.urlencoded({extended: true}));

app.get("/", (request, response) => {
	response.render("index");
});
app.post("/submit_form" , (request, response) => {
	console.log(request.body);
	console.log(request.body["name"]);
	request.session.data = request.body;
	response.redirect("/result");
});
app.get("/result", (request, response) => {
	console.log(request.session.data);
	dict = [
		{result: request.session.data}
	];
	response.render("result", {data : dict});
});

app.listen(8000, () => console.log("listening on port 8000"));