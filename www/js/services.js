angular.module('starter.services', [])

.factory('Prices', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var prices = [{
    id: 0,
    name: 'Essentials',
    pricing: 0.50,
    minimum: 100,
    extra: 0.35,
    image: 'ion-image'
  }, {
    id: 1,
    name: 'Plus',
    pricing: 0.75,
    minimum: 250,
    extra: 0.55,
    image: 'ion-images'
  },{
    id: 2,
    name: 'Premium',
    pricing: 0.95,
    minimum: 450,
    extra: 0.75,
    image: 'ion-android-camera'
  }];
  return {
    all: function() {
      return prices;
    }
  };
});
