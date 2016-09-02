var app = angular.module('app', ['btford.socket-io']);
var socketFactory = app.factory('socketFactory', function (socket) {
  return socket();
});


var indexController = app.controller('indexController',['$scope', 'socketFactory', function($scope, socket){
	socket.on('availableRemotes', function(msg){
		console.log(msg);
		for(var remoteName in msg){
		msg[remoteName].forEach(function(remoteCode){
			var $input = $('<input type="button" value="'+remoteName+' '+remoteCode+'" data-remotename="'+remoteName+'" data-remotecode="'+remoteCode+'" class=".col-md-4"/>');
			 $input.appendTo($("#buttonContainer"));
		});
	};
	
}]);

