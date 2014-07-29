var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/omega3studios');
var Applicant = mongoose.model('Applicant', {
	 name: String,
	 bio: String,
	 skills: String,
	 xp: Number,
	 why: String
});

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/', function(req, res) {
	res.render('index');
});

// displays a list of applicants
app.get('/applicants', function(req, res){

	Applicant.find({}, function(error, data){
		if(error) {
			res.send(500, 'Error accessing applicants collection.')
		}
		else {
			res.render('applicants', {data: data})
		}
	})
});

// creates an applicant
app.post('/applicant', function(req, res){
	// Here is where you need to get the data
	// from the post body and store it in the database
	console.log(req.body)
	var user = new Applicant({
		name: req.body.name,
		bio: req.body.bio,
		skills: req.body.skills,
		xp: req.body.years,
		why: req.body.why
	});
	user.save()

	// res.send('Success!');
	res.render('success');

});

app.delete('/delete/:user', function(req, res) {
	Applicant.findOne({name: req.params.user}, function(err, user){
		user.remove()
	})
	console.log("req.params.user:", req.params.user)
	res.send(200)
})

app.get('/show/:userid', function(req, res){


	Applicant.find({_id: req.params.userid}, function(error, user){
		if(error) {
			res.send(500, 'Error accessing applicants collection.')
		}
		else {
			console.log("user:", user)
			res.render('application', {user: user[0]})
		}
	})

});

var server = app.listen(8441, function() {
	console.log('Express server listening on port ' + server.address().port);
});
