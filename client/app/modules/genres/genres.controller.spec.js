'use strict';
describe('Controller Tests', function () {
    
    describe('GenresController', function () {
        var genresServiceMock;
        var $rootScope;
        var $scope;
        var $q;
        var deferredListResponse;
        var mockGenreList;
        var createController;

        beforeEach(function () {

            module('book-inventory-app.genres');

            genresServiceMock = jasmine.createSpyObj('GenresService', ['getGenres', 'deleteGenre']);
            mockGenreList = [{ id: '1' }, { id: '2' }, { id: '3' }];

            inject(function ($injector) {
                $rootScope = $injector.get('$rootScope');
                $q = $injector.get('$q');
                $scope = $rootScope.$new();

                deferredListResponse = $q.defer();
                genresServiceMock.getGenres.and.returnValue(deferredListResponse.promise);
                deferredListResponse.resolve(mockGenreList);

                var locals = {
                    'GenresService': genresServiceMock,
                    '$scope': $scope
                };
                createController = function() {
                    $injector.get('$controller')('GenresController', locals);
                    $rootScope.$apply();
                };
                createController();
            });
        });

        it('should load a list of genres on init', function () {
            // then
            expect($scope.genresList).toBeDefined();
            expect($scope.genresList).toBe(mockGenreList);
            expect($scope.genresList.length).toBe(3);
        })

        it('should select a book for the details view', function () {
            // given
            expect($scope.selectedGenre).toBeUndefined();

            // then
            $scope.selectGenre(mockGenreList[0]);

            // when
            expect($scope.selectedGenre).toBe(mockGenreList[0]);
        })

        it('should call the service to delete a genre', function () {
            // given
            var deferred = $q.defer();
            genresServiceMock.deleteGenre.and.returnValue(deferred.promise);

            // when
            $scope.deleteGenre('2');

            // then
            expect(genresServiceMock.deleteGenre).toHaveBeenCalledWith('2');
        })

        it('should reload the genre list after successfully deleting a genre', function () {
            // given
            var deferred = $q.defer();
            genresServiceMock.deleteGenre.and.returnValue(deferred.promise);

            // when
            $scope.deleteGenre('1');
            deferred.resolve(true);
            $rootScope.$apply();

            // then
            expect(genresServiceMock.getGenres).toHaveBeenCalled();
            expect(genresServiceMock.deleteGenre).toHaveBeenCalled();
        })

    });
});

