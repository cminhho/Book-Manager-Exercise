(function (angular) {
    HelloJasmineController.$inject = ['$scope', 'BackendService'];

    function HelloJasmineController($scope, BackendService) {
        $scope.counter = 0;

        $scope.incrementCounter = function() {
            $scope.counter += BackendService.step();
        }
    
        $scope.resetCounter = function() {
            $scope.counter = BackendService.init();
        }
    }

    angular.module('book-inventory-app.hello-jasmine')
        .controller('HelloJasmineController', HelloJasmineController);
})(angular);