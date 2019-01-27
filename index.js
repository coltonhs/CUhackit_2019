var express = require('express')
    ,app = express()
    ,last_value;

app.set('port', (process.env.PORT || 5000));

app.get('/', function (req, res) {
  if(req.query.command == ""){
	res.send("{ \"command\":\"" + last_value + "\"}");
  }else{
	if(req.query.command == "empty"){
		last_value = "";
		res.send("{}");
	}else{
		res.send("{ \"command\":\"" + req.query.command + "\"}");
		last_value = req.query.command;
	}
  }
})

app.listen(app.get('port'), function () {
  console.log("Node app is running on port', app.get('port')");
})