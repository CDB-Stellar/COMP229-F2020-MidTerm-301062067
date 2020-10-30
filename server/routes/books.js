/* Edited by Chloe Baker - 301062067 - October 30, 2020 */

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let Book = require('../models/books'); //capitalized Book

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  Book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });
});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
    /****************
     * MY CODE HERE *
     ****************/
    res.render('books/details', { title: 'Add Book', book: "" });
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
    /****************
     * MY CODE HERE *
     ****************/
    let newBook = Book({ //Book model
      "Title": req.body.title,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
    });

    Book.create(newBook, (err, Book) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the book list
            res.redirect('/books'); //idk
        }
    });
});

// GET the Book Details page in order to edit an existing Book
router.get('/details/:id', (req, res, next) => {
    /****************
     * MY CODE HERE *
     ****************/
    let id = req.params.id; //search for this id in the database and update it

    Book.findById(id, (err, bookToEdit) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('books/details', {title: 'Edit Book', book: bookToEdit });
        }
    });
});

// POST - process the information passed from the details form and update the document
router.post('/details/:id', (req, res, next) => {
    /****************
     * MY CODE HERE *
     ****************/
    let id = req.params.id;

    let updatedBook = Book({
        "_id": id, //going to overwrite the id
        "Title": req.body.title,
        "Price": req.body.price,
        "Author": req.body.author,
        "Genre": req.body.genre
    })

    //update the model
    Book.updateOne({_id: id}, updatedBook, (err) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the book list
            res.redirect('/books');
        }
    })
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
    /****************
     * MY CODE HERE *
     ****************/
    let id = req.params.id;

    Book.remove({_id: id}, (err) => {
        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the book list
            res.redirect('/books');
        }
    });
});

module.exports = router;