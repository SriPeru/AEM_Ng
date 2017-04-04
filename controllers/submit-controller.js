/**
 * Created by Srini P on 1/1/16.
 */

angular.module('aemCheckout')
    .controller('submitCtrl', ['$rootScope', '$scope', '$rootScope', 'cartFactory', 'RegisterService',
                                    function ($rootScope, $scope, $rootScope, cartFactory, RegisterService) {
    var self = this;
    
    
    self.onsubmit = function(){
        $scope.registers = RegisterService.list();
    }
}]);