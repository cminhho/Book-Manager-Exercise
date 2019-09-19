(function (angular) {
    'use strict';

    EditGenreController.$inject = ['$state', '$stateParams', 'GenresService'];

    function EditGenreController($state, $stateParams, GenresService) {
        var vm = this;

        vm.genre = {
            title: ''
        };

        //private methods
        function returnToGenreList() {
            $state.go('genres');
        }

        //public methods
        vm.saveGenre = function () {
            GenresService.saveGenre(vm.genre, vm.genreId)
                .then(function (success) {
                    if (success) returnToGenreList();
                });
        };

        vm.cancelSave = function () {
            returnToGenreList();
        };

        // Init Controller
        vm.genreId = $stateParams.id;
        if (!vm.genreId) returnToGenreList();

        GenresService.getGenre($stateParams.id)
            .then(function (data) {
                vm.genre.title = data.title;
                vm.genre.author = data.author;
                vm.genre.publisher = data.publisher;
                vm.genre.publicationDate = data.publicationDate;
                vm.genre.pageLength = data.pageLength;
                vm.genre.description = data.description;
            });
    }

    angular.module('book-inventory-app.genres')
        .controller('EditGenreController', EditGenreController);
})(angular);