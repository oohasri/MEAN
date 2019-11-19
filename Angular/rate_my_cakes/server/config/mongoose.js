const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
var models_path = path.join(__dirname + './../models');
mongoose.connect('mongodb://localhost/first_db', {useNewUrlParser: true, useUnifiedTopology:
true});

// read all of the files in the models_path and require (run) each of the javascript files
fs.readdirSync(models_path).forEach(function(file) {
    if(file.indexOf('.js') >= 0) {
      // require the file (this runs the model file which registers the schema)
      require(models_path + '/' + file);
     }
  })