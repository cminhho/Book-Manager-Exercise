'use strict';

module.exports = function(app) {
    var basePath = '/api';
    var BookController = require('./controllers/booksController');
    var GenreController = require('./controllers/genresController');

    // Genre Controller Routes
    app.get(basePath + '/books', BookController.getBookList);
    app.get(basePath + '/book/:id', BookController.getBook);
    app.post(basePath + '/book', BookController.addBook);
    app.put(basePath + '/book/:id', BookController.updateBook);
    app.delete(basePath + '/book/:id', BookController.deleteBook);
    
    // Genre Controller Routes
    app.get(basePath + '/genres', GenreController.getGenreList);
    app.get(basePath + '/genre/:id', GenreController.getGenre);
    app.post(basePath + '/genre', GenreController.addGenre);
    app.put(basePath + '/genre/:id', GenreController.updateGenre);
    app.delete(basePath + '/genre/:id', GenreController.deleteGenre);
};