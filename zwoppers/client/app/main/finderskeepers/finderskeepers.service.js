(function() {
    'use strict';

    function finderskeepersService($http, $q) {
        var wsRoot = '/api/items/';

        return {
            get: get,
            getAll: getAll
        };

/*        function get(id) {
            return $http.get(wsRoot + id)
                .then(function(res) {
                    console.log(res);
                    return res;
                })
        }*/

        function get(id) {

        }

        function getAll() {
            return $q.when([{
                info: {
                    title: "19\" GUNMETAL STAGGERED CV3 STYLE RIMS",
                    price: "900",
                    zwop: true,
                    seller: "Ryan Stevenson",
                    sellDate: new Date()
                },
                img: {
                    url: "assets/images/sale/rims.png",
                    alt: "custom car rims"
                },
                type: "featured"
            }, {
                info: {
                    title: "19\" GUNMETAL STAGGERED CV3 STYLE RIMS",
                    price: "900",
                    zwop: true,
                    seller: "Ryan Stevenson",
                    sellDate: new Date()
                },
                img: {
                    url: "assets/images/sale/rims.png",
                    alt: "custom car rims"
                },
                type: "featured"
            }, {
                info: {
                    title: "19\" GUNMETAL STAGGERED CV3 STYLE RIMS",
                    price: "900",
                    zwop: true,
                    seller: "Ryan Stevenson",
                    sellDate: new Date()
                },
                img: {
                    url: "assets/images/sale/sw.jpeg",
                    alt: "custom car rims"
                },
                type: "regular"
            }, {
                info: {
                    title: "19\" GUNMETAL STAGGERED CV3 STYLE RIMS",
                    price: "900",
                    zwop: true,
                    seller: "Ryan Stevenson",
                    sellDate: new Date()
                },
                img: {
                    url: "assets/images/sale/watch.jpeg",
                    alt: "custom car rims"
                },
                type: "regular"
            }, {
                info: {
                    title: "19\" GUNMETAL STAGGERED CV3 STYLE RIMS",
                    price: "900",
                    zwop: true,
                    seller: "Ryan Stevenson",
                    sellDate: new Date()
                },
                img: {
                    url: "assets/images/sale/camera.jpeg",
                    alt: "custom car rims"
                },
                type: "regular"
            }, {
                info: {
                    title: "19\" GUNMETAL STAGGERED CV3 STYLE RIMS",
                    price: "900",
                    zwop: true,
                    seller: "Ryan Stevenson",
                    sellDate: new Date()
                },
                img: {
                    url: "assets/images/sale/boots.jpeg",
                    alt: "custom car rims"
                },
                type: "regular"
            }, {
                info: {
                    title: "19\" GUNMETAL STAGGERED CV3 STYLE RIMS",
                    price: "900",
                    zwop: true,
                    seller: "Ryan Stevenson",
                    sellDate: new Date()
                },
                img: {
                    url: "assets/images/sale/rims.png",
                    alt: "custom car rims"
                },
                type: "regular"
            }]);
        }
    }

    angular.module('finderskeepers')
        .factory('finderskeepersService', finderskeepersService);
})();