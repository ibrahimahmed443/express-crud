var booksControllers = angular.module('booksControllers', []);

booksControllers.controller('IndexCtrl', ['$scope',
	function ($scope) {
		$scope.title = "Books collection";
}]);

booksControllers.controller('NewCtrl', ['$scope',
	function ($scope) {
}]);

booksControllers.controller('BooksCtrl', ['$scope', '$http',
	function ($scope, $http) {
		$http.get('/books').success(function(data){
			console.log(data);
			$scope.books = data;
		});
}]);


