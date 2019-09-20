'use strict';

describe('Controller - HelloJasmineController Controller', function () {

    // Arrange
    var $scope;
    var controller;
    var $rootScope;

    beforeEach(module('book-inventory-app.hello-jasmine'));

    beforeEach(inject(function ($injector, $controller) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();

        $controller('HelloJasmineController', {
            $scope: $scope,
            BackendService: {
                init: function() {
                    return 1;
                },
                step: function() {
                    return 5;
                },
                echo: function(msg) {
                    return 'echo[' + msg + ']';
                }
            }
        });
        
        $rootScope.$apply();
    }));

    it('Creates variable', function () {
        expect($scope.counter).toEqual(0);
    })

    it('Increments counter', function () {
        $scope.incrementCounter();
        expect($scope.counter).toEqual(5);
    });

    it('Resets counter', function () {
        $scope.resetCounter();
        expect($scope.counter).toEqual(1);
    });
});