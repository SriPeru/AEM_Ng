/**
 * Created by Srini P on 1/1/16.
 */

angular.module('aemCheckout')
    .controller('mainForm', ['$scope', '$rootScope', 'cartFactory', 'RegisterService',
                                    function ($scope, $rootScope, cartFactory, RegisterService) {
     
    $scope.cart={};
    $scope.email={};
    $scope.billing={};

}]);