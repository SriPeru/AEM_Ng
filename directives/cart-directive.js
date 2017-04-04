/**
 * Created by Srini P on 1/13/16.
 */

angular.module('aemCheckout')
.directive('submitForm', ['$compile', 'RegisterService', function($compile, RegisterService){
    return {
        require: 'form',
        restrict: 'A',
        link: function (scope, element, attrs) {
            var scope = element.scope();
            /*
                Here need to submit the form and check the dirty
                if dirty do something. Will discuss.Below code to execute the submit.
                But our case is get each form and dirty check and redirect.
                So can we try to have single form for all controllers?
            */
        }
        
    }
 }]);


/*
To execute form submit

if (attrs.name && scope[attrs.name]) {
                scope[attrs.name].$submit = function() {
                    //Parse the handler of submit & execute that.
                        
                    //
                    var fn = $parse(attrs.ngSubmit);
                    $scope.$apply(function() {
                        fn($scope, {$event: e});
                    });
                };
            }
*/