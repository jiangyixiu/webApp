'use strict';
angular.module('app').controller('registerCtrl', ['$interval', '$http', '$scope', '$state', function ($interval, $http, $scope, $state) {
    $scope.submit = function () {
        console.log($scope.user);
        $http.post('data/regist.json', $scope.user).success(function (resp) {
            $state.go('login');
        });
    }
    $scope.send = function () {
        $http.get('data/code.json').then(function (resp) {
            if (1===resp.data.state) {
                $scope.time = 6;
                var interval = $interval(function () {
                    if ($scope.time>0) {
                        $scope.time -= 1;
                    }else {
                        $interval.cancel(interval);
                        return;
                    }
                },1000);
            }
        })
    }
}]);
