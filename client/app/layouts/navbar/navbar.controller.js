(function (angular) {
    NavbarController.$inject = ['$state'];

    function NavbarController($state) {
        var vm = this;

    }

    angular.module('book-inventory-app')
        .controller('NavbarController', NavbarController);
})(angular);