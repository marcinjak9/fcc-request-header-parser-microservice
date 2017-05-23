var express = require('express');
var moment = require('moment');
var useragent = require('express-useragent');


var app = express();

var port = process.env.PORT || 3000;

moment().format();

app.get('/', function (req, res) {
	var source = req.headers['user-agent'];
	ua = useragent.parse(source);
	var os = ua.os;
	var ip = req.ip;
	var language = req.get('accept-language');
	console.log(language.split(',')[0]);

	var data = {
		ip,
		language:language.split(',')[0],
		os: ua.os + ' ' + ua.version
	};
	res.send(JSON.stringify(data));
})

app.get('/:date', function(req,res) {
	var parameter = req.params.date;
	var body = {};
	
	if (parameter.match(/[a-z]/i)){
		body.naturalDate = parameter;
		var date = new Date(parameter);
		body.unixDate = date.getTime()/1000;
	} else {
		body.unixDate = parseInt(parameter);
		body.naturalDate = moment.unix(parameter).format('MMMM D, YYYY');
	}
	res.send(JSON.stringify(body));
});
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
})