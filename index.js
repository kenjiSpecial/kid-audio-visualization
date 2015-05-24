var express = require('express');
var basicAuth = require('basic-auth');

var app = express();


var auth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === 'hello' && user.pass === 'world') {
    return next();
  } else {
    return unauthorized(res);
  };
};

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', auth, function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});



app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
