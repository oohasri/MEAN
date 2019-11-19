const express = require('express');
const app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.urlencoded({extended :true}));
app.use(bodyparser.json());
app.use(express.static( __dirname + '/public/dist/public' ));

app.get("/index", (req, res) => console.log("worked"));

app.listen(8000, () => console.log("Listening on port 8000"));