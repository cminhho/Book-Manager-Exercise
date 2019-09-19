'use strict';

var Genre = require('../models/genre');

var GenreController = {};

GenreController.getGenreList = function(req, res) {
    Genre.find({}, function(err, genres) {
        res.json(genres);
    });
};

GenreController.getGenre = function(req, res) {
    Genre.findOne({ _id: req.params.id }, function(err, genre) {
        if (err) {
            console.log('error', err);
            res.sendStatus(500);
        } else {
            res.json(genre);
        }
    });
};

GenreController.addGenre = function(req, res) {
    var dateobj = new Date();
    var genre = new Genre({
        title: req.body.title,
        author: 'admin',
        publicationDate: dateobj.toString()
    });

    genre.save(function(err) {
        if (err) {
            console.log('error', err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
};

GenreController.updateGenre = function(req, res) {
    Genre.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true }, function(err, genre) {
        if (err) {
            console.log('error', err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
};

GenreController.deleteGenre = function(req, res) {
    Genre.find({ _id: req.params.id }).remove(function(err, removed) {
        if (err) {
            console.log('error', err);
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
};

module.exports = GenreController;