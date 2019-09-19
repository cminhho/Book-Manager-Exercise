(function (angular) {
    function GenresService($http) {
        return {
            getGenres: function () {
                return $http.get('/api/genres')
                    .then(function (response) {
                        return response.data;
                    });
            },

            getGenre: function (id) {
                return $http.get('/api/genre/' + id)
                    .then(function (response) {
                        return response.data;
                    });
            },

            createGenre: function (book) {
                return $http.post('/api/genre/', book);
            },

            saveGenre: function (book, bookId) {
                return $http.put('/api/genre/' + bookId, book)
                    .then(function (response) {
                        return true;
                    });
            },

            deleteGenre: function (id) {
                return $http.delete('/api/genre/' + id)
                    .then(function (response) {
                        return true;
                    });
            }
        };
    }

    angular.module('book-inventory-app.services')
        .factory('GenresService', GenresService);
})(angular);