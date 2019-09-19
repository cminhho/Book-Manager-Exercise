(function (angular) {
    GenresController.$inject = ['$scope', 'GenresService'];

    function GenresController($scope, GenresService) {

        function onListReturn(data) {
            $scope.genresList = data;
        };

        function loadGenres() {
            GenresService.getGenres().then(onListReturn);
        };
        
        $scope.selectGenre = function (genre) {
            $scope.selectedGenre = genre;
        };

        $scope.deleteGenre = function (id) {
            GenresService.deleteGenre(id)
                .then(function (success) {
                    if (success)
                        loadGenres();
                });
        };

        $scope.closeDetails = function () {
            $scope.selectedGenre = null;
        };

        // Init controller
        loadGenres();
    }

    angular.module('book-inventory-app.genres')
        .controller('GenresController', GenresController);
})(angular);