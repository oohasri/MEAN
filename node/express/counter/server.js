const express = require('express');
const app = express();
app.use(express.static(__dirname + "/static"));

const session = require('express-session');
app.use(session({
  secret: 'keyboardkitteh',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

app.set('view engine','ejs');
app.set('views', __dirname + "/views");
app.get('/', (request, response) => {
	if(request.session.count == null){
		request.session.count = 0
	}
	else{
		request.session.count += 1;	
	}
	console.log(request.session.count);
	
	// response.send("sss");
	response.render("index", {count:request.session.count});
});
app.get('/add', (request, response) => {
	request.session.count += 2;	
	response.render("index", {count:request.session.count});
});
app.get('/reset', (request, response) => {
	request.session.destroy();	
	response.redirect("/");
});
app.listen(8000, () => console.log("listening on port 8000"));
