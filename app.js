var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 3000;
var cors = require('cors');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const {OperationHelper} = require('apac');


app.get("/", function(req, res) {

  const opHelper = new OperationHelper({
      awsId:     req.query.awsId,
      awsSecret: req.query.awsSecret,
      assocId:   req.query.assocId
  });


  var queryHash = {
    'SearchIndex': req.query.SearchIndex,
    'Kerywords': req.query.Keywords,
    'ResponseGroup': req.query.ResponseGroup
  };

  opHelper.execute('ItemSearch', {
    'SearchIndex': req.query.SearchIndex,
    'Keywords': req.query.Keywords,
    'ResponseGroup': req.query.ResponseGroup
  }).then((response) => {
      console.log("Results object: ", response.result);
      console.log("Raw response body: ", response.responseBody);
      res.send(response.result);
  }).catch((err) => {
      console.error("Something went wrong! ", err);
  });

});

var server = app.listen(port, function () {
    console.log("Listening on port %s...", server.address().port);
});
