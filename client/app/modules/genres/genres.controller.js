(function (angular) {
    GenresController.$inject = ['GenresService', '$state'];

    function GenresController(GenresService, $state) {
        var vm = this;

        function onListReturn(data) {
            vm.booksList = data;
        };

        function loadGenres() {
            GenresService.getGenres().then(onListReturn);
        };

        vm.selectGenre = function (book) {
            vm.selectedGenre = book;
        };

        vm.deleteGenre = function (id) {
            GenresService.deleteGenre(id)
                .then(function (success) {
                    if (success)
                        loadGenres();
                });
        };

        vm.closeDetails = function () {
            vm.selectedGenre = null;
        };

        // Init controller
        loadGenres();
    }

    angular.module('book-inventory-app.genres')
        .controller('GenresController', GenresController);
})(angular);