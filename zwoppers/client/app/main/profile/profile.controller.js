(function () {
    'use strict';

    function ProfileController($scope, $state, $stateParams, Upload, $window, snapRemote, $timeout, ProfileService) {
        var _ctrl = this;

        $scope.$watch('ProfileController.files', function () {
	        $scope.upload(_ctrl.files);
		});
	    _ctrl.log = '';

	    var _snapper;


        // $scope.$watch(function(){
        //     return $window.innerWidth;
        // }, function(value) {
        //     if (value < 768) {
        //     	snapper.open('left');
        //     } else {
        //     	snapper.close('left');
        //     }
        // });

        // $(window).resize(function() {
        // 	$scope.$watch(function(){
	       //      return $window.innerWidth;
	       //  }, function(value) {
	       //  	debugger;
	       //      if (value < 768) {
	       //      	snapper.open('left');
	       //      } else {
	       //      	snapper.close('left');
	       //      }
        // 	});
        // });

	    $scope.upload = function (files) {
	        if (files && files.length) {
	            for (var i = 0; i < files.length; i++) {
	                var file = files[i];
	                if (!file.$error) {
	                    Upload.upload({
	                        url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
	                        data: {
	                            username: $scope.username,
	                            file: file
	                        }
	                    }).progress(function (evt) {
	                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
	                        _ctrl.log = 'progress: ' + progressPercentage + '% ' + evt.config.data.file.name + '\n' + _ctrl.log;
	                    }).success(function (data, status, headers, config) {
	                        $timeout(function () {
	                            _ctrl.log = 'file: ' + config.data.file.name + ', Response: ' + JSON.stringify(data) + '\n' + _ctrl.log;
	                            console.log(_ctrl.log);
	                            _ctrl.fileName = config.data.file.name;
	                        });
	                    });
	                }
	            }
	        }
	    };
	    _ctrl.featuredItems = [];
        _ctrl.regularItems = [];

        ProfileService.getAll().then(function(res) {
            _ctrl.regularItems = getItemsByType(res, "regular");
        });

        function getItemsByType(collection, type) {
            var result = [];

            collection.forEach(function(item) {
                if (item.type === type) {
                    result.push(item);
                }
            });

            return result;
        }
    }

    angular
        .module('profile', [])
        .controller('ProfileController', ProfileController);

})();   