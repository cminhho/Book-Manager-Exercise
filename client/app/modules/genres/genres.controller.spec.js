'use strict';

describe('Controller - Genres Controller', function () {

    var booksController;
    var booksServiceMock;
    var $rootScope;
    var $state;
    var $q;
    var $timeout;
    var deferredListResponse;
    var mockGenreList;

    beforeEach(function () {

        module('ui.router.state');
        module('book-inventory-app.genres');

        booksServiceMock = jasmine.createSpyObj('GenresService', ['getGenres', 'deleteGenre']);
        mockGenreList = [{ id: '1' }, { id: '2' }, { id: '3' }];

        inject(function ($controller, _$rootScope_, _$state_, _$q_, _$timeout_) {
            $rootScope = _$rootScope_;
            $state = _$state_;
            $q = _$q_;
            $timeout = _$timeout_;

            deferredListResponse = $q.defer();
            booksServiceMock.getGenres.and.returnValue(deferredListResponse.promise);
            deferredListResponse.resolve(mockGenreList);

            booksController = $controller('GenresController', {
                $state: $state,
                GenresService: booksServiceMock
            });

            spyOn($state, 'go');

            $rootScope.$apply();
        });
    });

    it('should load a list of books on init', function () {
        debugger
        var $scope = $rootScope.$new();
        $scope.hello();
        debugger
        expect($scope.selectedGenre).toBe('hello');
    })

    it('should load a list of books on init', function () {
        expect(booksController.booksList).toBeDefined();
        expect(booksController.booksList).toBe(mockGenreList);
        expect(booksController.booksList.length).toBe(3);
    })

    it('should select a book for the details view', function () {
        expect(booksController.selectedGenre).toBeUndefined();

        booksController.selectGenre(mockGenreList[0]);
        expect(booksController.selectedGenre).toBe(mockGenreList[0]);

        booksController.selectGenre(mockGenreList[2]);
        expect(booksController.selectedGenre).toBe(mockGenreList[2]);
    })

    it('should call the service to delete a book', function () {
        var deferred = $q.defer();
        booksServiceMock.deleteGenre.and.returnValue(deferred.promise);

        booksController.deleteGenre('2');
        expect(booksServiceMock.deleteGenre).toHaveBeenCalledWith('2');
    })

    it('should reload the book list after successfully deleting a book', function () {
        var deferred = $q.defer();
        booksServiceMock.deleteGenre.and.returnValue(deferred.promise);

        booksServiceMock.getGenres.calls.reset();
        expect(booksServiceMock.getGenres).not.toHaveBeenCalled();

        booksController.deleteGenre('1');
        deferred.resolve(true);
        $rootScope.$apply();
        expect(booksServiceMock.getGenres).toHaveBeenCalled();
    })

});

