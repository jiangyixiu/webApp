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
