'use strict';

describe('Controller - HelloJasmineController Controller', function () {

    // Arrange
    var mockScope;
    var controller;
    var $rootScope;

    beforeEach(angular.mock.module('book-inventory-app.hello-jasmine'));

    beforeEach(angular.mock.inject(function ($controller, _$rootScope_) {
        $rootScope = _$rootScope_;
        mockScope = {};

        $controller('HelloJasmineController', {
            $scope: mockScope,
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
        expect(mockScope.counter).toEqual(0);
    })

    it('Increments counter', function () {
        mockScope.incrementCounter();
        expect(mockScope.counter).toEqual(5);
    });

    it('Resets counter', function () {
        mockScope.resetCounter();
        expect(mockScope.counter).toEqual(1);
    });
});