'use strict';
describe('Service Tests', function () {
    describe('GenresService', function () {

        var genresService;
        var $httpBackend;

        beforeEach(function () {
            module('book-inventory-app.services');

            inject(function (GenresService, _$httpBackend_) {
                $httpBackend = _$httpBackend_;
                genresService = GenresService;

                $httpBackend.verifyNoOutstandingRequest();
            });
        });

        afterEach(function () {
            $httpBackend.flush();
            $httpBackend.verifyNoOutstandingRequest();
        })

        it('should make a GET call to retrieve a list of genres', function () {
            $httpBackend.expectGET('/api/genres').respond(200, []);
            genresService.getGenres();
        });

        it('should make a GET call to retrieve a single genre object', function () {
            $httpBackend.expectGET('/api/genre/9').respond(200, {});
            genresService.getGenre('9');
        });

        it('should make a POST call to create a new genre', function () {
            var mockGenre = { id: '111' };
            $httpBackend.expectPOST('/api/genre/').respond(200, true);
            genresService.createGenre(mockGenre);
        });

        it('should make a PUT call to update an existing genre object', function () {
            var mockGenre = { id: '999' };
            $httpBackend.expectPUT('/api/genre/999', mockGenre).respond(200, true);
            genresService.saveGenre(mockGenre, mockGenre.id);
        });

        it('should make a DELETE call to remove a genre object', function () {
            $httpBackend.expectDELETE('/api/genre/123').respond(200, true);
            genresService.deleteGenre('123');
        });
    });

});