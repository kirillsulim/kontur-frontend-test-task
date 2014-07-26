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

feaApp.directive('feaBox', function () {
    return {
        restrict: 'E',
        templateUrl: 'box.html',

        controller: function($scope) {
            $scope.addNewRow = function () {
                var newValue = {
                    index: ++$scope.index,
                    value: ''
                }
                $scope.array.unshift(newValue);
            },

            $scope.sum = function(array) {
                var acc = 0;
                for(var i = 0; i < array.length; ++i) {
                    acc += array[i].value;
                }
                return acc;
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

        controller: function($scope){
            $scope.editing = true;
        }
    };
});
