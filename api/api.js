var express = require('express'),
  app = express(),
  advertisers = require('./mockdata/advertisers.json'),
  doges = require('./mockdata/dogeImages.json');

function getAdvertiser(id) {
  var k;

  for (k = 0; k < advertisers.length; k++) {
    if(advertisers[k].id === id) {
      return advertisers[k];
    }
  }
}

app.get('/advertisers', function(req, res) {
  //workaround to allow Cross-domain call
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "GET");
  res.send(advertisers);
});

app.get('/advertisers/:id', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "GET");
  res.send(getAdvertiser(req.params.id));
});

app.get('/doges', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.header("Access-Control-Allow-Methods", "GET");
  res.send(doges);
});

app.listen(3000);
console.log('Listening on port 3000...');;