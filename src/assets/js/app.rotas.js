'use strict';

require("angular");

var modulo = angular.module('app.rotas', []);

modulo.config(['$provide', function($provide){
	
	var rotas = [];
	
	var req = require.context("../../modulos", true, /^.*rota\.js$/igm);///^(.*rota\.(js$))[^.]*$/igm
    
    console.log(req.keys());
    
	req.keys().forEach(function(key){
		rotas.push(req(key));
	});
	
	
	$provide.constant('rotas', rotas);
}]);


module.exports = modulo;