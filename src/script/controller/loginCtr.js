'usr strict';
angular.module('app').controller('loginCtrl', ['cache', '$state', '$http', '$scope', function (cache, $state, $http, $scope) {
    $scope.submit = function () {
        console.log($scope.user);
        $http.post('data/login.json', $scope.user).success(function (resp) {
            console.log(resp);
            cache.put('id', resp.data.id);
            cache.put('image', resp.data.image);
            cache.put('name', resp.data.name);
            $state.go('main');
        });
    }
}]);
