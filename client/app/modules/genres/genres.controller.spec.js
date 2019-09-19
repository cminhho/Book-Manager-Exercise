'use strict';

describe('Controller - Genres Controller', function () {

    var genresController;
    var genresServiceMock;
    var $rootScope;
    var $scope;
    var $q;
    var $timeout;
    var deferredListResponse;
    var mockGenreList;

    beforeEach(function () {

        module('book-inventory-app.genres');

        genresServiceMock = jasmine.createSpyObj('GenresService', ['getGenres', 'deleteGenre']);
        mockGenreList = [{ id: '1' }, { id: '2' }, { id: '3' }];

        inject(function ($controller, _$rootScope_, _$q_, _$timeout_) {
            $rootScope = _$rootScope_;
            $q = _$q_;
            $timeout = _$timeout_;
            $scope = {};

            deferredListResponse = $q.defer();
            genresServiceMock.getGenres.and.returnValue(deferredListResponse.promise);
            deferredListResponse.resolve(mockGenreList);

            genresController = $controller('GenresController', {
                $scope: $scope,
                GenresService: genresServiceMock
            });

            $rootScope.$apply();
        });
    });

    it('should load a list of genres on init', function () {
        expect($scope.genresList).toBeDefined();
        expect($scope.genresList).toBe(mockGenreList);
        expect($scope.genresList.length).toBe(3);
    })

    it('should select a book for the details view', function () {
        expect($scope.selectedGenre).toBeUndefined();
        
        $scope.selectGenre(mockGenreList[0]);
        expect($scope.selectedGenre).toBe(mockGenreList[0]);

        $scope.selectGenre(mockGenreList[2]);
        expect($scope.selectedGenre).toBe(mockGenreList[2]);
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
        var deferred = $q.defer();
        genresServiceMock.deleteGenre.and.returnValue(deferred.promise);

        genresServiceMock.getGenres.calls.reset();
        expect(genresServiceMock.getGenres).not.toHaveBeenCalled();

        $scope.deleteGenre('1');
        deferred.resolve(true);
        $rootScope.$apply();
        expect(genresServiceMock.getGenres).toHaveBeenCalled();
    })

});

