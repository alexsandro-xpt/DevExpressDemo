'use strict';


require("angular");
require("angular-sanitize");
require("angular-ui-router");
require("oclazyload");
require("angular-resource");


var jq = require('jquery');
var dx = require("DevExpress");




var app = angular.module('demoApp', ['ui.router', 'ngResource', 'oc.lazyLoad', 'ngSanitize', require('./app.rotas').name]);


app.config(['$urlRouterProvider','$stateProvider','$locationProvider', '$controllerProvider', '$compileProvider', '$filterProvider','$provide', 'rotas', function($urlRouterProvider, $stateProvider
, $locationProvider, $controllerProvider, $compileProvider
, $filterProvider, $provide, rotas) {


	
	for(var i=0, t = rotas.length; i < t; i++){
		$stateProvider.state.apply(this, rotas[i]);
	}


	$urlRouterProvider.otherwise('/week');

	/*$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});*/

}]); 

app.value('navigationItems', [
        {
            title: 'Week',
            text: 'Week',
            uri: '/week'
        },
        {
            title: 'About',
            text: 'About',
            uri: '/about'
        }
    ]).factory('currentViewInfo', ['$rootScope', 'navigationItems', function($rootScope, navigationItems) {
        var selectedIndex = 0,
            viewTitle = 'Week';
        /*
        $rootScope.$on('$stateChangeStart', function(event, nextLoc, currentLoc) {
            if(nextLoc.$$route) {
                selectedIndex = $.inArray(nextLoc.$$route.originalPath, $.map(navigationItems, function(item) {
                    return item.uri;
                }));
                if(selectedIndex > -1) {
                    viewTitle = navigationItems[selectedIndex].title;
                } else {
                    viewTitle = undefined;
                }
            }
        });*/

        return {
            getSelectedIndex: function() {
                return selectedIndex;
            },
            getTitle: function() {
                return viewTitle;
            }
        }
    }])
    .factory('menu', function() {
        var isVisible = false;

        return {
            getVisibility: function() {
                return isVisible;
            },
            setVisibility: function(value) {
                isVisible = value;
            },
            toggle: function() {
                isVisible = !isVisible;
            }
        }
    });

app.controller('ctrApp', ['$scope', '$location', 'navigationItems', 'currentViewInfo', 'menu', function($scope, $location, navigationItems, currentViewInfo, menu) {

     //$scope.$location = $location;
     $scope.aaa = "estge é o ctrApp";
     
	var that = this;
	
	that.navigationItems = navigationItems;
	
	that.itemSelected = function(e) {
		$location.path(e.addedItems[0].uri);
	};
	
	that.itemClick = function() {
		menu.setVisibility(false);
	};
	
	$scope.$watch(currentViewInfo.getSelectedIndex, function(selectedIndex) {
		that.selectedIndex = selectedIndex;
	});
	
	$scope.$watch(menu.getVisibility, function(menuVisible) {
		that.menuVisible = menuVisible;
	});
	$scope.$watch(function() {
		return that.menuVisible;
	}, function(menuVisible) {
		menu.setVisibility(menuVisible);
	});
    
    
    var showText = function (e) {
        //DevExpress.ui.notify("Back button clicked", "success", 5000);
    };
    var menuItemClicked = function (e) {
        //DevExpress.ui.notify(e.model.text + " item clicked", "success", 2000);
    };
        
    
    $scope.toolbarItems = [
        { location: 'before', widget: 'button', options: { type: 'back', text: 'Back', onClick: showText }},
        { location: 'menu', text: "Add", onClick: menuItemClicked },
        { location: 'menu', text: "Change", onClick: menuItemClicked },
        { location: 'menu', text: "Remove", onClick: menuItemClicked },
        { location: 'center', text: 'Products' }
    ];
	 
	 
}]);


app.factory('dx', function(){
	return dx;//window.DevExpress;
});



app.controller('ToolbarCtrl', ['$scope', 'currentViewInfo', 'menu', function($scope, currentViewInfo, menu) {
    var that = this;

    that.title = currentViewInfo.getTitle();
    $scope.$watch(currentViewInfo.getTitle, function(title) {
        that.title = title;
    });

    that.toggleMenu = menu.toggle;
    
    
}]);





/*
angular.element(document).ready(function () {  
  angular.bootstrap(document, ['app'], {
    //strictDi: true
  });
});
*/

module.exports = app;