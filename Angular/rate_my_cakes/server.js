const express = require('express');
      bodyParser = require('body-parser');
      app = express();

app.use(express.static( __dirname + '/public/dist/public' ));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./server/config/mongoose.js');
require('./server/config/routes.js') (app)

app.listen(8000, () => console.log("Listening on port 8000"));
