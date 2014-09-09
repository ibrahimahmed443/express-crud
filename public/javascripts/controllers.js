var booksControllers = angular.module('booksControllers', []);

booksControllers.controller('IndexCtrl', ['$scope',
	function ($scope) {
		$scope.title = "Books collection";
}]);

booksControllers.controller('NewCtrl', ['$scope', '$http', '$location',
	function ($scope, $http, $location) {
		$scope.form = {};
		$scope.submitBook = function () {
			$http.post('/books/create', $scope.form).success(function(data) {
				console.log(data);
				$location.url('/books/show/' + data._id);
			});
		};
}]);

booksControllers.controller('BooksCtrl', ['$scope', '$http',
	function ($scope, $http) {
		$http.get('/books').success(function(data){
			$scope.books = data;
		});
}]);

booksControllers.controller('ShowCtrl', ['$scope', '$http', '$routeParams', '$location',
	function ($scope, $http, $routeParams, $location) {
		var bookId = $routeParams.book_id;
		$http.get('/books/show/' + bookId).success(function(data){
			$scope.book = data;
			console.log(data);
		});

		$scope.editBook = function() {
			$location.path('/books/edit/' + bookId);
		};

		$scope.deleteBook = function() {
			if (!confirm("Are you sure you want to delete?"))
				return;

			$http.delete("/books/destroy/" + bookId).success(function(data){
				console.log(data);
				$location.url("/books");
			});
		};
}]);

booksControllers.controller('EditCtrl', ['$scope', '$http', '$routeParams', '$location',
	function ($scope, $http, $routeParams, $location) {
		$scope.form = {};
		var bookId = $routeParams.book_id;
		
		$http.get('/books/show/' + bookId).success(function(data){
			$scope.form = data;
			console.log($scope.form);
		});

		$scope.updateBook = function(){
			$http.put('/books/update/' + bookId, $scope.form).success(function(data){
				$location.url('/books/show/' + bookId);
			});
		};
	
}]);


