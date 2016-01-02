'use strict';

var nomeModulo = 'main';

module.exports = [nomeModulo, {
	url: '/week',
	templateProvider: function ($q) {
		return $q(function (resolve) {
			// lazy load the view
			require.ensure([], function () {
				resolve(require('./main.html'));
				//resolve(require('./' + nomeModulo + '.html'));
			});
		});
	},
	controller: 'ctrmain',//'ctr' + nomeModulo,
	resolve: {
		load: ['$q', '$ocLazyLoad', function ($q, $ocLazyLoad) {
			return $q(function (resolve) {
				require.ensure([], function () {
					// load whole module
					var modulo = require('./main.js');
					//var modulo = require('./' + nomeModulo + '.js');
					$ocLazyLoad.load({ name: modulo.name });
					resolve(modulo.controller);
				});
			});
		}]
	}
}];