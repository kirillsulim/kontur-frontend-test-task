/**
 * Created by kir on 25.07.2014.
 */

var feaApp = angular.module('feaApp', []);

feaApp.controller('feaController',
    [
        '$scope',
        function($scope) {
        }]
);

formatMoney = function(str) {
    str = str.replace(/ /g,'');
    var i = str.indexOf('.');
    if(i == -1) {
        i = str.length;
    }
    i -= 3;
    while (i > 0){
        str = str.substr(0, i) + ' ' + str.substr(i, str.length);
        i -= 3;
    }

    return str;
}

feaApp.directive('feaBox', function () {
    return {
        restrict: 'E',
        templateUrl: 'box.html',
        replace: true,

        controller: function($scope) {
            $scope.addNewRow = function () {
                var newValue = {
                    index: ++$scope.index,
                    value: ''
                };
                $scope.array.unshift(newValue);
            };

            $scope.sum = function(array) {
                var acc = 0;
                for(var i = 0; i < array.length; ++i) {
                    var val = parseFloat(array[i].value.replace(/ /g,''));
                    if (isFinite(val))
                    {
                        acc += val;
                    }
                }
                return formatMoney(acc.toString());
            };

            $scope.deleteRow = function(obj)
            {
                var index = $scope.array.indexOf(obj);
                if(index > -1) {
                    $scope.array.splice(index,1);
                }
            }
        },

        link: function(scope) {
            scope.array = [];
            scope.index = 0;
        }
    };
});

feaApp.directive('feaRow', function () {
    return {
        restrict: 'E',
        templateUrl: 'row.html',
        replace: true,
        require: '^feaBox',

        scope: {
            value: '='
        },

        controller: function($scope){
            $scope.editing = true;

            $scope.deleteRow = function () {
                var v = $scope.value;
                $scope.$parent.deleteRow(v);
            };

            $scope.save = function() {
                $scope.value.value = formatMoney($scope.value.value);
                $scope.editing = false;
            };

            $scope.edit = function() {
                $scope.editing = true;
            };


        }
    };
});
