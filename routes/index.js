var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var uriUtil = require('mongodb-uri');
var config = require('../config');

var options = config.options;
var dbUser = config.dbUser;
var dbPassword = config.dbPassword;


//connect to local db...
//mongoose.connect("mongodb://localhost/booksApp");

//connect to mongolab...


var mongodbUri = 'mongodb://' + dbUser + ':' + dbPassword + '@ds035260.mongolab.com:35260/books_app';
var mongooseUri = uriUtil.formatMongoose(mongodbUri);

mongoose.connect(mongooseUri, options);

var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function callback () {
  console.log("connected!");

	var bookSchema = new mongoose.Schema({
		title: String,
		author : String,
		pages: Number,
		price: Number,
		image_url: String
	});
	 
	books_collection = mongoose.model('books', bookSchema);

	router.get('/partials/:name', function(req, res) {
		var name = req.params.name;
		res.render('partials/' + name);
	});

	/* GET home page. */
	router.get('/', function(req, res) {
		console.log("req received");
		res.render('index', { title: 'Books Collection'});
	});

	
	//Index: Get all books...
	router.get('/books', function(req, res){
		books_collection.find({}, function(err, docs){
			res.json(docs);
			//res.render('books/index', {books: docs});
		});
	});

	//Show: Return a single book given book ID...
	router.get('/books/show/:id', function(req,res){
		id = req.params.id;
		books_collection.find({_id: id}, function(err, doc){
			res.json(doc[0]);
			//res.render('books/show', {book:doc[0]});
		});
	});

	//New: render a form to create new book...
	router.get('/books/new', function(req, res){
		res.render('books/new');
	});

	//Create: post a form to create a new book...
	router.post('/books/create', function(req, res){
		
		b = req.body;

		data =  {title: b.title,
				author: b.author,
				pages: parseInt(b.pages, 10),
				price: parseFloat(b.price),
				image_url: b.image_url};

		var book = new books_collection(data);

		book.save(function(err, doc){
			if (err)
				res.json(err);
			else
				res.json(doc);
				//res.redirect('/books/show/' + docs._id);
		});
	});

	//Edit: Render an edit form, similar to a new form...
	router.get('/books/edit/:id', function(req, res){

		id = req.params.id;
		books_collection.find({_id: id}, function(err, doc){
			res.json(doc[0]);
			//res.render('books/edit', {book:doc[0]});

		});

	});

	//Update: update a book specified by its id...
	router.put('/books/update/:id', function(req, res){
		
		b = req.body;
		id = req.params.id;

		data =  {title: b.title,
				author: b.author,
				pages: parseInt(b.pages, 10),
				price: parseFloat(b.price),
				image_url: b.image_url,
				id: id};

		books_collection.update({_id:data.id}, data, function(err, docsAffected){
			//res.redirect('/books/show/' + data.id);
			res.json(docsAffected);
		});
	});


	//Destroy: delete a book given its id....
	router.delete('/books/destroy/:id', function(req, res){
		books_collection.remove({_id: req.params.id}, function(err, docsAffected){
			res.json(docsAffected);
		});
	});

});			//end: conn.once()

module.exports = router;


