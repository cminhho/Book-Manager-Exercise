(function (angular) {
    'use strict';

    angular.module('book-inventory-app', [
        'ui.router.state',
        'book-inventory-app.services',
        'book-inventory-app.books',
        'book-inventory-app.filters',
        'book-inventory-app.genres',
        'book-inventory-app.hello-jasmine'
    ]);

    angular.module('book-inventory-app.services', []);
    angular.module('book-inventory-app.books', []);
    angular.module('book-inventory-app.filters', []);

    angular.module('book-inventory-app.genres', []);
    angular.module('book-inventory-app.hello-jasmine', []);
})(angular);