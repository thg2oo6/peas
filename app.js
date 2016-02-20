const express = require('express');
const path = require('path')

var app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', function(req, res) {
    console.log('index');
    res.sendFile('./public/index.html'); // load our public/index.html file
});

require('./express/app')(app);

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
});