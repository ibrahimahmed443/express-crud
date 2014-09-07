var booksApp = angular.module("booksApp", [
	'ngRoute',
	'booksControllers'
]);

booksApp.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'partials/home',
			controller: 'IndexCtrl'
		}).
		when('/books', {
			templateUrl: 'partials/index',
			controller: 'BooksCtrl'
		}).
		when('/books/new', {
			templateUrl: 'partials/new',
			controller: 'NewCtrl'
		}).
		otherwise({ redirectTo: '/' });
}]);

// booksApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    
//     $routeProvider.
//       when('/', {
//         templateUrl: 'partials/listPost',
//         controller: IndexController
//       }).
//       // when('/addPost', {
//       //   templateUrl: 'partials/addPost',
//       //   controller: AddPostCtrl 
//       // }).
//       // when('/readPost/:id', {
//       //   templateUrl: 'partials/readPost',
//       //   controller: ReadPostCtrl
//       // }).
//       // when('/editPost/:id', {
//       //   templateUrl: 'partials/editPost',
//       //   controller: EditPostCtrl
//       // }).
//       // when('/deletePost/:id', {
//       //   templateUrl: 'partials/deletePost',
//       //   controller: DeletePostCtrl
//       // }).
//       otherwise({
//         redirectTo: '/'
//       });
//     $locationProvider.html5Mode(true);
