var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
      res.send(response.responseBody);
  }).catch((err) => {
      console.error("Something went wrong! ", err);
  });

});

var server = app.listen(3000, function () {
    console.log("Listening on port %s...", server.address().port);
});
