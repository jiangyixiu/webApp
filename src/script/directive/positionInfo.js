'use strict';
angular.module('app').directive('appPositionInfo', ['$http', function($http) {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'view/template/positionInfo.html',
        scope: {
            isActive: '=',
            isLogin: '=',
            pos: '=',
            com: '='
        },
        link: function($scope) {
            $scope.$watch('pos', function (newVal) {
                if (newVal) {
                    $scope.pos.select = $scope.pos.select || false;
                    $scope.imagePath = $scope.pos.select ? 'images/star-active.png' : 'images/star.png';
                }
            })
            $scope.favorite = function() {
                $http.post('data/favorite.json', {
                    id: $scope.pos.id,
                    select: !$scope.pos.select
                }).success(function(resp) {
                    $scope.pos.select = !$scope.pos.select;
                    $scope.imagePath = $scope.pos.select ? 'images/star-active.png' : 'images/star.png';
                })
            }
        }
    }
}]);
