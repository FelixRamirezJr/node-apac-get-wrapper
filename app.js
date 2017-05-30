var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var port = process.env.PORT || 3000;
var cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const {OperationHelper} = require('apac');


app.get("/item_search", function(req, res) {

  const opHelper = new OperationHelper({
      awsId:     req.query.awsId,
      awsSecret: req.query.awsSecret,
      assocId:   req.query.assocId
  });

  opHelper.execute('ItemSearch', {
    'SearchIndex': req.query.SearchIndex,
    'Keywords': req.query.Keywords,
    'ResponseGroup': req.query.ResponseGroup,
    'ItemPage': req.query.ItemPage
  }).then((response) => {
      console.log("Results object: ", response.result);
      console.log("Raw response body: ", response.responseBody);
      res.send(response.result);
  }).catch((err) => {
      console.error("Something went wrong! ", err);
  });

});

app.get("/item_lookup", function(req, res) {

  const opHelper = new OperationHelper({
      awsId:     req.query.awsId,
      awsSecret: req.query.awsSecret,
      assocId:   req.query.assocId
  });


  var queryHash = {
    'Operation': "ItemLookup",
    'ResponseGroup': "Images",
    'IdType': req.query.IdType,
    'ItemId': req.query.ItemId,
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
