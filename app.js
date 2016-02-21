const express = require('express');
const path = require('path');
const logger = require('morgan');

var app = express();

app.use(logger("combined"));
app.use(express.static(path.join(__dirname, 'public')));

require('./express/app')(app);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
  console.log(err.stack);

  var statusCode = err.status || 500;
  switch(err.name) {
    case 'ValidationError':
      statusCode = 400;
      break;
  }

  res.status(statusCode);
  res.send(err);
});


app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'));
