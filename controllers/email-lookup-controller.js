/**
 * Created by Srini P on 1/1/16.
 */

angular.module('aemCheckout')
    .controller('emailLookupCtrl', ['$scope', '$rootScope', 'cartFactory', 'RegisterService',
                                    function ($scope, $rootScope, cartFactory, RegisterService) {
    $scope.emailDiv = false;
     $scope.$on('loginname', function(event,cdata){
        $scope.lEmail = cdata.login;
    });
        
}]);