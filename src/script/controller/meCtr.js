'use strict';
angular.module('app').controller('meCtrl', ['cache', '$state', '$http', '$scope', function (cache, $state, $http, $scope) {
    if (cache.get('name')) {
        $scope.name = cache.get('name');
        $scope.image = cache.get('image');
        console.log($scope.name);
        console.log($scope.image);
    }
    $scope.logout = function () {
        cache.remove('id');
        cache.remove('image');
        cache.remove('name');
        $state.go('main');
    }
}]);
