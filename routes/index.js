var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//connect to db...
mongoose.connect("mongodb://localhost/booksApp");

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("connected!");
});

var bookSchema = new mongoose.Schema({
	title: String,
	author : String,
	pages: Number,
	price: Number,
	image_url: String
});
 
books_collection = mongoose.model('books', bookSchema);

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Books Collection'});
});


//Index: Get all books...
router.get('/books', function(req, res){
	books_collection.find({}, function(err, docs){
		//res.json(docs);
		res.render('books/index', {books: docs});
	});
});

//Show: Return a single book given book ID...
router.get('/books/show/:id', function(req,res){
	id = req.params.id
	books_collection.find({_id: id}, function(err, doc){
		//res.json(doc)
		res.render('books/show', {book:doc[0]});
	});
});

//New: render a form to create new book...
router.get('/books/new', function(req, res){
	res.render('books/new')
});

//Create: post a form to create a new book...
router.post('/books/create', function(req, res){
	
	b = req.body

	data =  {title: b.title,
			author: b.author,
			pages: parseInt(b.pages),
			price: parseInt(b.price),
			image_url: b.image_url};

	var book = new books_collection(data);

	book.save(function(err, docs){
		if (err)
			res.json(err);
		else
			res.json(docs);
	});
});


module.exports = router;


