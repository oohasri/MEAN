const express = require('express');
      app = express();
      bodyParser = require('body-parser');
      mongoose = require('mongoose');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app)

app.listen(8000, () => console.log("Listening on port 8000"));