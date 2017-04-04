/**
 * Created by Srini P on 12/30/15.
 */

//Initiating application module
angular.module('aemCheckout', ['cartConstants'])
    .config(['$httpProvider',function($httpProvider) {
        //This will intercept all http calls and broadcast the event
          $httpProvider.interceptors.push(function($rootScope, $timeout) {
            return {
              request: function(config) {
                $rootScope.$broadcast('loading:show');
                return config;
              },
              response: function(response) {
                $rootScope.$broadcast('loading:hide')
                return response;
              }
            }
          })
        }])
    .run(['$rootScope', 'cartFactory', function ($rootScope, cartFactory) {
        $rootScope.$on('loading:show', function(e) {
            $rootScope.cartloader = true;
          });

          $rootScope.$on('loading:hide', function(e) {
            $rootScope.cartloader = false;
          });
    
        
        cartFactory.getCart().then(function(cdata){
            $rootScope.$broadcast('loginname', cdata);
        });
}]);

