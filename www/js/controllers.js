angular.module('starter.controllers', [])


.controller('SignupCtrl', function($scope, $http, $state, $location, Prices) {
  $scope.user = {username: "", company: "", address: "", address2: "", city: "", state: "", zipcode: "", tel: "", email: "", passwordDigest: ""};
  $scope.associationName = "";
  
  $scope.numberOfHomes = 0;

  $scope.addUser = function() {
    console.log($scope.user);
    $http.post("https://hoaserver2.herokuapp.com/user/new", $scope.user).
      success(function(data, status, config) {
        console.log(data);
      }).
      error(function(data, status, config) {
        console.log(data);
      });
  };

  $scope.addAssociation = function() {
    console.log($scope.associationName);
    $http.post("https://hoaserver2.herokuapp.com/association/new", $scope.associationName).
      success(function(data, status, config) {
        console.log(data);
      }).
      error(function(data, status, config) {
        console.error(data);
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


.controller('LoginCtrl', function($scope, $http, $location, $animate) {
  $scope.loginUser = {email: "", password: ""};
  $scope.wrongPass = "";
  $scope.login = function() {
    $http.post("https://hoaserver2.herokuapp.com/login", $scope.loginUser).
      success(function(data, status, config) {
        console.log(data);
        if(data) {
          $location.path( "/associations" );
        }
        else {
          $scope.wrongPass = "Sorry Email or Password are not recognized";
        }
      }).
      error(function(data, status, config) {
        console.log(data);
      });
  };
})
.controller('ConfirmCtrl', function($scope) {})

.controller('DashboardCtrl', function($scope, $http) {
  // $http.get('http://localhost/houses', function(success, error) {
  //   }
  // })
  $http.get("https://hoaserver2.herokuapp.com/associations").
    success(function(data, status, config) {
      $scope.associations = data;
      }).
    error(function(data, status, config) {
      console.log(data); 
    });

  $scope.addAssociation = function() {
    $http.post("https://hoaserver2.herokuapp.com/associations/new").
      success(function(data, status, config) {
        $scope.associations = data;
      }).
      error(function(data, status, config) {
        console.log(data);
      });
  };
})

.controller('AssociationCtrl', function($stateParams, $scope, $http) {
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
      $scope.associationHouses = d.houses;
      console.log($scope.associationHouses);
    }).
    error(function(d, stat, conf) {
      console.error('d1',d);
    });

  $scope.addHouse = function() {
    console.log($scope.house); //Object {address: "some address", street: "some street"}
    console.log($scope.house.address, $scope.house.street);
    $http.post("http://localhost:3000/associations/" + $scope.association.name, {address: $scope.house.address, street: $scope.house.street}).
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
})

.controller('HouseCtrl', function($scope, $http, $stateParams) {
  $http.get("http://localhost:3000/associations/" + $stateParams.name + "/house/" + $stateParams.id).
    success(function(data) {
      $scope.house = data
      console.log(data.violations)
      $scope.violations = data.violations
    }).
    error(function(data) {
      console.log("Error", data);
    });
})

.controller('Controller', function Controller(jwtHelper) {
  var expToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3NhbXBsZXMuYXV0aDAuY29tLyIsInN1YiI6ImZhY2Vib29rfDEwMTU0Mjg3MDI3NTEwMzAyIiwiYXVkIjoiQlVJSlNXOXg2MHNJSEJ3OEtkOUVtQ2JqOGVESUZ4REMiLCJleHAiOjE0MTIyMzQ3MzAsImlhdCI6MTQxMjE5ODczMH0.7M5sAV50fF1-_h9qVbdSgqAnXVF7mz3I6RjS6JiH0H8';  

  var tokenPayload = jwtHelper.decodeToken(expToken);

  $http.get('http://localhost:3000/protected', tokenPayload)
})

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
