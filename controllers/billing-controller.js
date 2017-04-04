/**
 * Created by Srini P on 1/1/16.
 */

var app = angular.module('aCart', []);

app.controller('mainForm', function($scope, cartFactory) {
  $scope.name = "test";
  //Cart Type Wizard or single page
  $scope.cartType = 1;
  $scope.child = {};
  
  var postData = $scope.child;
  
    $scope.SubmitForm = function () {
      
      // Child scopes also should be converted to JSON like below to send as JSON
     console.log(angular.fromJson(angular.toJson($scope.child)));
      
   /* cartFactory.cartService(postData).then(function(cdata){
            // Lakshmi do whatever you want
        });*/

  };
})
.controller('emailCtrl', function($scope) {
  var parentScope = $scope.$parent;
  parentScope.child.email = $scope;
  $scope.emailName = "Email Name";
})
.controller('billingCtrl', function($scope) {
  var parentScope = $scope.$parent;
  parentScope.child.billing = $scope;
  $scope.billingName = "Billing Name";
})
.controller('paymentCtrl', function($scope) {
  var parentScope = $scope.$parent;
  parentScope.child.payment = $scope;
  $scope.paymentName = "Payment Name";
})
.factory('cartFactory', ['$http', '$q', function ($http, $q) {

    return {

        getCart : function () {

            var deffered = $q.defer();

            var req = {method: 'GET', url: 'https://api.github.com/users/angular'}
            $http(req).then(function (response) {
                deffered.resolve(response.data);
            }, function () {
            });

            return deffered.promise;
        },
        
        cartService : function (cartData) {

            var deffered = $q.defer();
            var uural;
            if(scope.cartType == 1){
              uural = 'https://api.github.com/users/angular';
            }else{}

            var req = {method: 'POST', url: uural, data: cartData, headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
            $http(req).then(function (response) {
                deffered.resolve(response.data);
            }, function () {
            });

            return deffered.promise;
        },
        
        getSetData : function () {
            var data = {};
    
            var getData = function(id){
                alert(data[id]);
                return data[id];
            };

            var setData = function(id, value){
                //alert(id +"::"+ value);
                data[id] = value;
            };

            return {
                getData: getData,
                setData: setData
            }
        
        }
                                                      
    }

}]);



app.directive("mainForm", [
  
  function() {
    return {
      restrict: "A",
      controller: [
        
        "$scope",
        
        function($scope) {
          
          var childrenFormsCount = 0;
          var validChildrenFormsCount = 0;
          
          function onChildFormChanged() {
            $scope.mainFormValid = childrenFormsCount === validChildrenFormsCount;
          }
          
          this.addChildForm = function(childFormCtrl) {
            // TODO save reference to child form controller
            childrenFormsCount++;
          };
          
          this.removeChildForm = function(childFormCtrl) {
            // TODO remove reference to child form controller
            childrenFormsCount--;
            if(childrenFormsCount < 0) {
              childrenFormsCount = 0;
            }
          };
          
          this.onChildFormValid = function() {
            validChildrenFormsCount++;
            onChildFormChanged();
          };
          
          this.onChildFormInvalid = function() {
            validChildrenFormsCount--;
            if(validChildrenFormsCount < 0) {
              validChildrenFormsCount = 0;
            }
            onChildFormChanged();
          };
        }
      ]
    };
  }
]);

app.directive("childForm", [
  
  function() {
    return {
      restrict: "A",
      scope: {},
      require: ["^mainForm", "?form"],
      link: function($scope, el, attributes, controllers) {
        var mainFormCtrl = controllers[0];
        var formCtrl = controllers[1];
        
        mainFormCtrl.addChildForm(formCtrl);
        
        $scope.$on("$destroy", function(){
          mainFormCtrl.removeChildForm(formCtrl);
        });
       
        $scope.$watch(function(){
          return formCtrl.$valid;
        }, function(value) {
          if(value === true) {
           mainFormCtrl.onChildFormValid();
          }
          else {
           mainFormCtrl.onChildFormInvalid();
          }
        });
      }
    }
  }
]);




