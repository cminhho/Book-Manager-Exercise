(function (angular) {
    'use strict';
    angular.module('book-inventory-app')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');

            $stateProvider.state('app', {
                abstract: true,
                views: {
                    'navbar@': {
                        templateUrl: 'app/layouts/navbar/navbar.html',
                        controller: 'NavbarController',
                        controllerAs: 'vm'
                    }
                }
            });
        }])
        .run(['$state', function ($state) {
            $state.go('books');
        }]);
})(angular);