/**
 * Created by Srini P on 1/13/16.
 */

angular.module('aemCheckout').factory('cartFactory', ['$http', '$q', function ($http, $q) {

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
        
        getBilling : function () {

            var deffered = $q.defer();

            var req = {method: 'GET', url: 'http://jsonplaceholder.typicode.com/posts/1'}
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

}])

.service('RegisterService', function () {
    //to create unique Register id
    var uid = 1;
    
    //Registers array to hold list of all Registers
    var Registers = [];
    
    //save method create a new Register if not already exists
    //else update the existing Register object
    this.save = function (Register) {
        if (Register.id == null) {
            //if this is new Register, add it in Registers array
            Register.id = uid++;
            Registers.push(Register);
        } else {
            //for existing Register, find this Register using id
            //and update it.
            for (i in Registers) {
                if (Registers[i].id == Register.id) {
                    Registers[i] = Register;
                }
            }
        }

    }

    //simply search Registers list for given id
    //and returns the Register object if found
    this.get = function (id) {
        for (i in Registers) {
            if (Registers[i].id == id) {
                return Registers[i];
            }
        }

    }

    //simply returns the Registers list
    this.list = function () {
        return Registers;
    }
});


/*
Sub Pub

<div ng-controller=TheCtrl>
    <button ng-click=notify()>Notify</button>
    
    {{ notifications }}
</div>

angular.module('app', []);

angular.module('app').controller('TheCtrl', function($scope, NotifyingService) {
    $scope.notifications = 0;
    
    $scope.notify = function() {
        NotifyingService.notify();
    };
    
    // ... stuff ...
    NotifyingService.subscribe($scope, function somethingChanged() {
        // Handle notification
        $scope.notifications++;
    });
});

angular.module('app').factory('NotifyingService', function($rootScope) {
    return {
        subscribe: function(scope, callback) {
            var handler = $rootScope.$on('notifying-service-event', callback);
            scope.$on('$destroy', handler);
        },

        notify: function() {
            $rootScope.$emit('notifying-service-event');
        }
    };
});

*/