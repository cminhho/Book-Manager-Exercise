(function(angular) {

    AddGenreController.$inject = ['$state', 'GenresService', 'ValidateDateService'];

    function AddGenreController($state, GenresService, ValidateDateService) {
        var vm = this;

        vm.genre = {};
        vm.showPublicationDateError = false;
        vm.showFieldsRequiredError = false;
        vm.hasSubmittedForm = false;

        function returnToGenreList() {
            $state.go('genres');
        }

        function validateInput() {
            var valid = true;

            vm.showFieldsRequiredError = false;

            if (!vm.genre.title) {
                valid = false;
                vm.showFieldsRequiredError = true;
            }

            return valid;
        }

        vm.saveGenre = function() {
            vm.hasSubmittedForm = true;

            if (validateInput()) {
                GenresService.createGenre(vm.genre)
                    .then(function(success) {
                        if (success) returnToGenreList();
                    });
            }
        };

        vm.cancelSave = function() {
            returnToGenreList();
        };
    }

    angular.module('book-inventory-app.genres')
        .controller('AddGenreController', AddGenreController);
})(angular);