angular.module('starter.controllers', [])


.controller('SignupCtrl', function($scope, $http, $state, $location, Prices) {
  $scope.user = {username: "", company: "", address: "", address2: "", city: "", state: "", zipcode: "", tel: "", email: "", passwordDigest: ""};
  
  $scope.numberOfHomes = 0;
  $http.get("http://localhost:3000/token").
    success(function(data, status, config) {
      console.log(data);
    }).
    error(function(data, status, config) {
      console.log(data);
    });
  $scope.addUser = function() {
    console.log($scope.user);
    $http.post("http://localhost:3000/user/new", $scope.user).
      success(function(data, status, config) {
        console.log(data);
      }).
      error(function(data, status, config) {
        console.log(data);
      });
  };
  $scope.login = function() {
    $state.href(login);
  }

//PRICE PAGE 
  $scope.prices = Prices.all();
  $scope.total = 0;
  $scope.totalPrice;
    //-- create the selected price array
    $scope.selectedPrice = {};
    $scope.selectedPrice[1] = true;
    $scope.totalPrice = $scope.prices[1]
    //-- add the id to an array with a true-ey value
    $scope.addOrRemoveClassFromMe = function(id) {
    //-- Set selected peeps as true/false
    if($scope.selectedPrice[id] != 1) {
      $scope.selectedPrice[1] = false;
      $scope.selectedPrice[id] = true;
    } if ($scope.selectedPrice[id] == 1) {
      $scope.selectedPrice[0] = false;
      $scope.selectedPrice[2] = false;
      $scope.selectedPrice[id] = true;
    } if ($scope.selectedPrice[id] == 2) {
      $scope.selectedPrice[0] = false
      $scope.selectedPrice[1] = false;
      $scope.selectedPrice[id] = true;
    } if ($scope.selectedPrice[id] == 0) {
      $scope.selectedPrice[1] = false;
      $scope.selectedPrice[2] = false;
      $scope.selectedPrice[id] = true;
    }
    $scope.totalPrice = $scope.prices[id]
    console.log($scope.totalPrice);
  };
})


.controller('LoginCtrl', function($scope) {})

.controller('DashboardCtrl', function($scope, $http) {
  // $http.get('http://localhost/houses', function(success, error) {
  //   }
  // })
  $http.get("http://localhost:3000/associations").
    success(function(data, status, config) {
      $scope.associations = data;
      }).
    error(function(data, status, config) {
      console.log(data); 
    });

  $scope.addAssociation = function() {
    $http.post('http://localhost:3000/associations').
      success(function(data, status, config) {
        $scope.associations = data;
      }).
      error(function(data, status, config) {
        console.log(data);
      });
  };
})

.controller('AssociationCtrl', function($stateParams, $scope, $http) {
  console.log('$stateParams',$stateParams);
  $scope.association = {};

  $scope.$watch(function() {
      return $scope.association;
    }, function(newValue, oldValue) {
      console.log("change detected:",newValue);
      $scope.association = newValue;
    });

  $scope.$watch(function() {
      return $scope.violations;
    }, function(newValue, oldValue) {
      console.log("change detected:",newValue);
      $scope.violations = newValue;
    });
  $scope.house = {address: "", street: ""};
  $scope.violations = {address: "", street: ""};
  $http.get("http://localhost:3000/associations/" + $stateParams.name).
    success(function(d, stat, conf) {
      $scope.association = d;
    }).
    error(function(d, stat, conf) {
      console.error('d1',d);
    });
  $http.get("http://localhost")

  $scope.addHouse = function() {
    console.log($scope.house); //Object {address: "some address", street: "some street"}
    console.log($scope.house.address, $scope.house.street);
    $http.post("http://localhost:3000/associations/" + $scope.association.name, {address: $scope.house.address, street: $scope.house.street} + "/violations").
      success(function(data) {
        $scope.association = data;
        $scope.house = {address: "", street: ""};
      }).
      error(function(data) {
        console.log('error',data);
      });
    };

  $scope.addViolation = function() {
    console.log($scope.violations);
    $http.post("http://localhost:3000/associations/" + $scope.association.name, {address: $scope.violations.address, street: $scope.violations.street} + "/new").
      success(function(data) {
        $scope.violations = data;
      }).
      error(function(data) {
        console.log("error", data);
      });
  };
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
