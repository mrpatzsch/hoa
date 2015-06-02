angular.module('starter.controllers', [])

.controller('SignupCtrl', function($scope) {})


.controller('LoginCtrl', function($scope) {})

.controller('DashboardCtrl', function($scope, $http) {
  // $http.get('http://localhost/houses', function(success, error) {
  //   }
  // })
  $http.get("http://localhost:3000/houses").
    success(function(data, status, config) {
      console.log(data);
      $scope.houses = data;
    }).
    error(function(data, status, config) {
    });
  });
// .controller('ChatsCtrl', function($scope, Chats) {
//   $scope.chats = Chats.all();
//   $scope.remove = function(chat) {
//     Chats.remove(chat);
//   }
// })

// .controller("HousesCtrl", function($scope) {
//   $http.get("http://localhost:3000/houses")
//     .success(function(data) {

//     })
//     .error(function(data) {

//     })
//     //success and error functions
// })

// .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })

// .controller('AccountCtrl', function($scope) {
//   $scope.settings = {
//     enableFriends: true
//   };
// });
