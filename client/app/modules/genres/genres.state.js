(function() {
    'use strict';

    angular
        .module('book-inventory-app')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
                .state('genres', {
                    parent: 'app',
                    url: '/genres',
                    views: {
                        'content@': {
                            templateUrl: 'app/modules/genres/genres.html',
                            controller: 'GenresController'
                        }
                    }
                })
                .state('editGenre', {
                    parent: 'genres',
                    url: '/genres/edit/:id',
                    views: {
                        'content@': {
                            templateUrl: 'app/modules/genres/edit-genre/edit-genre.html',
                            controller: 'EditGenreController as editGenreVM'
                        }
                    }
                })
                .state('addGenre', {
                    parent: 'genres',
                    url: '/genres/add',
                    views: {
                        'content@': {
                            templateUrl: 'app/modules/genres/add-genre/add-genre.html',
                            controller: 'AddGenreController as addGenreVM'
                        }
                    }
                });
    }
})();