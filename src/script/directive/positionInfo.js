'use strict';
angular.module('app').directive('appPositionInfo', [function () {
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
    link: function ($scope) {
      $scope.imagePath = $scope.isActive ? 'images/active.png' : 'images/star.png';
    }
  }
}]);
