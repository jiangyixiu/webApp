'use strict';

angular.module('app', ['ui.router', 'ngCookies']);

'use strict';

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
  $stateProvider.state('main', {
    url: '/main',
    templateUrl: 'view/main.html',
    controller: 'mainCtrl'
}).state('position', {
    url: '/position/:id',
    templateUrl: 'view/position.html',
    controller: 'positionCtrl'
}).state('company', {
    url: '/company:id',
    templateUrl: 'view/company.html',
    controller: 'companyCtrl'
});
  $urlRouterProvider.otherwise('main');
}]);

'use strict';

angular.module('app').controller('companyCtrl', ['$http', '$state', '$scope', function($http, $state, $scope) {
    $http.get('data/company.json?id='+$state.params.id).then(function(resp) {
        $scope.company = resp.data;
    });
}]);

'use strict';

angular.module('app').controller('mainCtrl', ['$http', '$scope', function($http, $scope) {
    $http.get('/data/positionList.json').then(function(resp) {
        console.log(resp);
        $scope.list = resp.data;
    }).catch(function(err) {
        console.log(err);
    })
    // $scope.list = [{
    //         id: '123',
    //         name: '销售',
    //         imgSrc: 'images/postman.jpg',
    //         companyName: 'postman',
    //         city: '上海',
    //         industry: '互联网',
    //         time: '2016-06-1 11:6'
    //     },
    //     {
    //         id: '124',
    //         name: 'web前端',
    //         imgSrc: 'images/timg.jpeg',
    //         companyName: 'html,css,js',
    //         city: '北京',
    //         industry: '互联网',
    //         time: '2016-03 11:6'
    //     }
    // ];
}]);

'use strict';

angular.module('app').controller('positionCtrl',['$q', '$http', '$state', '$scope', 'cache', function($q, $http, $state, $scope, cache) {
    cache.put('userId','123213');
    $scope.isLogin = false;
    function getPosition() {
        var def = $q.defer();
        $http.get('/data/position.json?id=' + $state.params.id).then(function(resp) {
            $scope.position = resp.data;
            def.resolve(resp);
        }).catch(function (err) {
            def.reject(err);
        });
        return def.promise;
    }
    function getCompany(id) {
        $http.get('data/company.json?id='+id).then(function(resp) {
            $scope.company = resp.data;
        });
    }
    getPosition().then(function(obj){
        getCompany(obj.data.companyId);
    });
}]);

'use strict';

angular.module('app').directive('appCompany', [function(){
   return {
     restrict: 'A',
     replace: true,
     scope: {
         com: '='
     },
     templateUrl: 'view/template/company.html'
   }
}]);

'use strict';
angular.module('app').directive('appFoot', [function(){
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/foot.html'
  }
}]);

'use strict';

angular.module('app').directive('appHead', [function() {
  return {
    restrict: 'A',
    replacr: true,
    templateUrl: 'view/template/head.html'
  };
}]);

'use strict';

angular.module('app').directive('appHeadBar', [function() {
  return {
    restrict: 'A',
    replacr: true,
    templateUrl: 'view/template/headBar.html',
    scope: {
        text: '@'
    },
    link: function ($scope) {
        $scope.back = function () {
            window.history.back();
        }
    }
  };
}]);

'use strict';
angular.module('app').directive('appPositionClass', [function () {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            com: '='
        },
        templateUrl: 'view/template/positionClass.html',
        link: function ($scope) {
            $scope.showPositionList = function (idx) {
                $scope.positionList = $scope.com.positionClass[idx].positionList;
                $scope.isActive = idx;
            }
            $scope.$watch('com', function (newVal) {
                if (newVal) {
                    $scope.showPositionList(0);
                }
            })
        }
    };
}]);

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

'use strict';
angular.module('app').directive('appPositionList', [function() {
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'view/template/positionList.html',
        scope: {
            data: '='
        }
    };
}]);

'use strict';
angular.module('app').service('cache', ['$cookies', function ($cookies) {
    this.put = function (key, value) {
        $cookies.put(key, value);
    };
    this.get = function (key) {
        return $cookies.get(key);
    };
    this.remove = function (key) {
        $cookies.remove(key);
    };
}])
