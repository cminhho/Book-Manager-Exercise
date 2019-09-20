(function () {
    'use strict';

    angular
        .module('book-inventory-app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('books', {
                parent: 'app',
                url: '/',
                views: {
                    'content@': {
                        templateUrl: 'app/modules/books/books.html',
                        controller: 'BooksController as booksVM',
                    }
                }
            })
            .state('editBook', {
                parent: 'books',
                url: '/books/edit/:id',
                views: {
                    'content@': {
                        templateUrl: 'app/modules/books/edit-book/editBook.html',
                        controller: 'EditBookController as editBookVM'
                    }
                }
            })
            .state('addBook', {
                parent: 'books',
                url: '/books/add',
                views: {
                    'content@': {
                        templateUrl: 'app/modules/books/add-book/addBook.html',
                        controller: 'AddBookController as addBookVM'
                    }
                }
            });
    }
})();