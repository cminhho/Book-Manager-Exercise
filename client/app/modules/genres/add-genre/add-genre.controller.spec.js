'use strict';
describe('Controller Tests', function () {
    describe('AddGenreController - Add Genre', function () {

        var addGenreControler;
        var genresServiceMock;
        var validateServiceMock;
        var $state;
        var $q;
        var $controller;

        beforeEach(function () {
            module('ui.router.state');
            module('book-inventory-app.genres');

            genresServiceMock = jasmine.createSpyObj('GenresService', ['createGenre']);
            validateServiceMock = jasmine.createSpyObj('ValidateDateService', ['isValidDate']);

            inject(function ($injector) {
                $state = $injector.get('$state');
                $q = $injector.get('$q');
                $controller = $injector.get('$controller');

                addGenreControler = $controller('AddGenreController', {
                    $state: $state,
                    GenresService: genresServiceMock,
                    ValidateDateService: validateServiceMock
                });

                spyOn($state, 'go');
            });
        });

        it('should display an error message if all of the fields are not completed', function () {
            expect(addGenreControler.showFieldsRequiredError).toBe(false);
            addGenreControler.saveGenre();
            expect(addGenreControler.showFieldsRequiredError).toBe(true);
        });

        it('should display an error message if the publication date entered is not a valid date', function () {
            expect(addGenreControler.showPublicationDateError).toBe(false);
            validateServiceMock.isValidDate.and.returnValue(false);
            addGenreControler.saveGenre();
        });

        it('should call createGenre on the GenresService if validation is successful', function () {
            var mockGenre = {
                title: 'Test',
                author: 'Test Author',
                publicationDate: '1/1/2016'
            };

            var deferred = $q.defer();
            genresServiceMock.createGenre.and.returnValue(deferred.promise)
            validateServiceMock.isValidDate.and.returnValue(true);

            addGenreControler.genre = mockGenre;
            addGenreControler.saveGenre();

            expect(genresServiceMock.createGenre).toHaveBeenCalled();
            expect(genresServiceMock.createGenre).toHaveBeenCalledWith(mockGenre);
        });

        it('should return to the list view on cancel', function () {
            addGenreControler.cancelSave();
            expect($state.go).toHaveBeenCalled();
            expect($state.go).toHaveBeenCalledWith('genres');
        });
    });
});
