var express = require('express')
var app = express();
var App = require('./app.js')

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
	extended: true
}))

app.get('/', function (req, res) {
	res.render('home.ejs');
})
app.get('/reports', function (req, res) {
	res.render('reportsPage.ejs', {
		settlementdata: App.settlement,
		performancedata: App.performance,
		inventorydata: App.inventory,
		orderdata: App.order,
		amazonpaydata: App.amazonpay
	})
})

try {
	app.post('/', function (req, res) {

		new App.RequestReports(req.body.aws_key, req.body.aws_secret_key, req.body.seller_id, req.body.mws_auth_token, req.body.seller_name, new Date(req.body.start_date).toISOString(), new Date(req.body.end_date).toISOString())
		res.render('loading.ejs', {
			settlementdata: App.settlement,
			performancedata: App.performance,
			inventorydata: App.inventory,
			orderdata: App.order,
			amazonpaydata: App.amazonpay
		})


	})
} catch (err) {
	console.log("Error")
}

app.listen(3000/*process.env.PORT*/, process.env.IP, function () {
	console.log("Server started")
})
