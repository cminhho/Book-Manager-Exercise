'use strict';
describe('Controller Tests', function () {
    describe('EditGenreController - Edit Genre Controller', function () {

        var editGenreController;
        var genresServiceMock;
        var stateParamsMock;
        var $rootScope;
        var $state;
        var $q;
        var mockGenre;
        var $controller;

        beforeEach(function () {

            module('ui.router.state');
            module('book-inventory-app.genres');

            genresServiceMock = jasmine.createSpyObj('GenresService', ['getGenre', 'saveGenre']);
            stateParamsMock = { id: '12345' };
            mockGenre = {
                title: 'title',
                author: 'author',
                publicationDate: '1/1/2016'
            };

            inject(function ($injector) {
                $rootScope =  $injector.get('$rootScope');
                $state = $injector.get('$state');
                $q = $injector.get('$q');
                $controller = $injector.get('$controller');

                var deferred = $q.defer();
                genresServiceMock.getGenre.and.returnValue(deferred.promise);
                deferred.resolve(mockGenre);

                editGenreController = $controller('EditGenreController', {
                    $state: $state,
                    $stateParams: stateParamsMock,
                    GenresService: genresServiceMock
                });

                spyOn($state, 'go');
            });
        });

        it('should populate genre data from the genre service on init', function () {
            expect(genresServiceMock.getGenre).toHaveBeenCalled();
            expect(genresServiceMock.getGenre).toHaveBeenCalledWith(stateParamsMock.id);

            expect(editGenreController.genre.title).toBeFalsy();
            expect(editGenreController.genre.author).toBeFalsy();

            $rootScope.$apply();

            expect(editGenreController.genre.title).toBe('title');
            expect(editGenreController.genre.author).toBe('author');
        })

        it('should call the genre service to save the genre object', function () {
            $rootScope.$apply();
            var deferred = $q.defer();
            genresServiceMock.saveGenre.and.returnValue(deferred.promise);
            deferred.resolve(true);

            expect(genresServiceMock.saveGenre).not.toHaveBeenCalled();
            editGenreController.saveGenre();

            expect(genresServiceMock.saveGenre).toHaveBeenCalled();
            expect(genresServiceMock.saveGenre).toHaveBeenCalledWith(editGenreController.genre, editGenreController.genreId);
        })

        it('should return to the genre list', function () {
            editGenreController.cancelSave();
            expect($state.go).toHaveBeenCalledWith('genres')
        })
    });
});
