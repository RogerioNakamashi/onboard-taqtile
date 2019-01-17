require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:8081/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _server = __webpack_require__(2);
	
	var _reactRouter = __webpack_require__(10);
	
	var _Document = __webpack_require__(20);
	
	var _Document2 = _interopRequireDefault(_Document);
	
	var _routes = __webpack_require__(22);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function getApp(req, res, requestCallback) {
	  // here is your chance to do things like get an auth token and generate
	  // your route config w/ request aware `onEnter` hooks, etc.
	  requestCallback(null, {
	    routes: _routes2.default,
	    render: function render(routerProps, renderCallback) {
	      // here is your chance to load up data before rendering and pass it to
	      // your top-level components
	      renderCallback(null, {
	        renderDocument: function renderDocument(props) {
	          return _react2.default.createElement(_Document2.default, props);
	        },
	        renderApp: function renderApp(props) {
	          return _react2.default.createElement(_reactRouter.RouterContext, props);
	        }
	      });
	    }
	  });
	}
	
	(0, _server.createServer)(getApp).start();

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(3);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.createServer = createServer;
	
	var _fs = __webpack_require__(4);
	
	var _fs2 = _interopRequireDefault(_fs);
	
	var _express = __webpack_require__(5);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _bodyParser = __webpack_require__(6);
	
	var _bodyParser2 = _interopRequireDefault(_bodyParser);
	
	var _morgan = __webpack_require__(7);
	
	var _morgan2 = _interopRequireDefault(_morgan);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _server = __webpack_require__(8);
	
	var _path = __webpack_require__(9);
	
	var _path2 = _interopRequireDefault(_path);
	
	var _reactRouter = __webpack_require__(10);
	
	var _reactTitleComponent = __webpack_require__(11);
	
	var _compression = __webpack_require__(12);
	
	var _compression2 = _interopRequireDefault(_compression);
	
	var _hpp = __webpack_require__(13);
	
	var _hpp2 = _interopRequireDefault(_hpp);
	
	var _helmet = __webpack_require__(14);
	
	var _helmet2 = _interopRequireDefault(_helmet);
	
	var _LogUtils = __webpack_require__(15);
	
	var _Constants = __webpack_require__(18);
	
	var _ErrorMessage = __webpack_require__(19);
	
	var _ErrorMessage2 = _interopRequireDefault(_ErrorMessage);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	function createServer(getApp) {
	  var server = (0, _express2.default)();
	  var webpackStats = getWebpackStats();
	  server.disable('x-powered-by');
	  server._listen = server.listen;
	  server.listen = function () {
	    throw new Error('[react-project]', 'Do not call `server.listen()`, use `server.start()`');
	  };
	
	  server.start = function () {
	    addMiddleware(server);
	    server.all('*', function (req, res) {
	      getApp(req, res, function (err, _ref) {
	        var render = _ref.render;
	        var routes = _ref.routes;
	
	        if (err) {
	          onError(err, req, res);
	        } else {
	          (0, _reactRouter.match)({ routes: routes, location: req.url }, function (err, redirect, routerProps) {
	            if (err) {
	              onError(err, req, res);
	            } else if (redirect) {
	              // TODO: need a way to specify 301, 302, 307 etc. in the route config.
	              // will need to make changes in React Router or history probably
	              res.redirect(redirect.pathname + redirect.search);
	            } else if (routerProps) {
	              sendWithReactRouter({ req: req, res: res, render: render, webpackStats: webpackStats, routerProps: routerProps });
	            } else {
	              sendNoRoutesMatched(res);
	            }
	          });
	        }
	      });
	    });
	
	    server._listen(_Constants.PORT, function () {
	      (0, _LogUtils.log)();
	      (0, _LogUtils.log)('NODE_ENV=' + process.env.NODE_ENV);
	      (0, _LogUtils.log)('Express server listening on port', _Constants.PORT);
	    });
	  };
	
	  return server;
	} // You have to be careful about which files this thing brings in because
	// it gets bundled into a single file and then required, so process.pwd()
	// and friends are going to be different, not sure how to keep it sane
	// yet. Only problem I've run into is trying to read the app's package.json
	// in a module this imports, like Constants, but then it doesn't work when
	// the bundled server runs. So ... don't try to read the app's package.json,
	// and ... be careful.
	//
	// Also note that any dependencies in here need to in the `peerDependencies`
	// entry in package.json. We don't package up any node_modules into the
	// server build for two reasons 1) that file would be ginourmous and take
	// a long time to bundle and 2) it's pretty cool that the app gets to
	// decide which version of express, or react it wants to use, so that
	// our release cycle doesn't get in the way of theirs.
	
	function addMiddleware(server) {
	  if (process.env.NODE_ENV === 'production') {
	    server.use((0, _morgan2.default)('combined'));
	    server.use((0, _compression2.default)());
	    server.use(_express2.default.static(_Constants.PUBLIC_DIR, { maxAge: 31536000000 }));
	  } else {
	    server.use((0, _morgan2.default)('dev'));
	  }
	
	  server.use(_express2.default.static(_path2.default.join(_Constants.APP_PATH, 'static')));
	  server.use(_bodyParser2.default.json());
	  server.use((0, _hpp2.default)());
	  server.use(_helmet2.default.contentSecurityPolicy({
	    defaultSrc: ["'self'"],
	    scriptSrc: ["'self'"],
	    styleSrc: ["'self'"],
	    imgSrc: ["'self'"],
	    connectSrc: ["'self'", 'ws:'],
	    fontSrc: ["'self'"],
	    objectSrc: ["'none'"],
	    mediaSrc: ["'none'"],
	    frameSrc: ["'none'"]
	  }));
	  server.use(_helmet2.default.xssFilter());
	  server.use(_helmet2.default.frameguard('deny'));
	  server.use(_helmet2.default.ieNoOpen());
	  server.use(_helmet2.default.noSniff());
	}
	
	function sendWithReactRouter(_ref2) {
	  var req = _ref2.req;
	  var res = _ref2.res;
	  var render = _ref2.render;
	  var webpackStats = _ref2.webpackStats;
	  var routerProps = _ref2.routerProps;
	  var routes = routerProps.routes;
	
	  var lastRoute = routes[routes.length - 1];
	  if (lastRoute.isServerRoute) {
	    handleServerRoute(req, res, lastRoute, {
	      params: routerProps.params,
	      location: routerProps.location,
	      routes: routerProps.routes,
	      route: lastRoute
	    });
	  } else if (req.method !== 'GET') {
	    sendNoRoutesMatched(res);
	  } else {
	    render(routerProps, function (err, _ref3) {
	      var renderDocument = _ref3.renderDocument;
	      var renderApp = _ref3.renderApp;
	
	      if (err) {
	        onError(err, req, res);
	      } else {
	        var status = err ? err.status : lastRoute.status || 200;
	        var appElement = renderApp(routerProps);
	        var content = getContent(req, appElement);
	        var documentElement = renderDocument({
	          title: (0, _reactTitleComponent.flushTitle)(),
	          content: content,
	          scripts: getJavaScriptTags(webpackStats),
	          styles: getStyleTags(webpackStats)
	        });
	        var markup = (0, _server.renderToStaticMarkup)(documentElement);
	        res.status(status).send('<!doctype html>\n' + markup);
	      }
	    });
	  }
	}
	
	function handleServerRoute(req, res, route, props) {
	  var handler = route[req.method.toLowerCase()];
	  if (!handler) {
	    res.status(500).send((0, _server.renderToStaticMarkup)(_react2.default.createElement(_ErrorMessage2.default, null, _react2.default.createElement('p', null, 'Route has no handler. Add "get", "post" etc.'), _react2.default.createElement('pre', null, '<Route get={handler}/>'), _react2.default.createElement('p', null, 'Route Props:'), _react2.default.createElement('pre', null, Object.keys(route).join(' ')))));
	  } else {
	    handler(req, res, route, props);
	  }
	}
	
	function onError(err, req, res) {
	  res.status(500).send((0, _server.renderToStaticMarkup)(_react2.default.createElement(_ErrorMessage2.default, null, _react2.default.createElement('p', null, 'Unknown error occured:'), _react2.default.createElement('pre', null, err.message))));
	}
	
	function getWebpackStats() {
	  var file = _path2.default.resolve(_Constants.APP_PATH, '.build', 'stats.json');
	  return JSON.parse(_fs2.default.readFileSync(file, 'utf8'));
	}
	
	function getContent(req, appElement) {
	  return _Constants.SERVER_RENDERING ? (0, _server.renderToString)(appElement) : '';
	}
	
	function getAssetPaths(stats, regex) {
	  return Object.keys(stats.assetsByChunkName).reduce(function (assets, key) {
	    var chunk = stats.assetsByChunkName[key];
	    var chunkArray = Array.isArray(chunk) ? chunk : [chunk];
	    return assets.concat(chunkArray.filter(function (asset) {
	      return regex.test(asset);
	    }).map(function (asset) {
	      return stats.publicPath + asset;
	    }));
	  }, []);
	}
	
	function getStyleTags(stats) {
	  return getAssetPaths(stats, /\.css$/).map(function (href) {
	    return _react2.default.createElement('link', { key: href, rel: 'stylesheet', href: href });
	  });
	}
	
	function getJavaScriptTags(stats) {
	  return getAssetPaths(stats, /\.js$/).map(function (src) {
	    return _react2.default.createElement('script', { key: src, src: src });
	  });
	}
	
	function sendNoRoutesMatched(res) {
	  res.status(404).send((0, _server.renderToStaticMarkup)(_react2.default.createElement(_ErrorMessage2.default, null, _react2.default.createElement('p', null, 'No routes matched, you should add'), _react2.default.createElement('pre', null, '<Route path="*" component={NoMatch}/>'), _react2.default.createElement('p', null, 'to the end of your route config so your visitors don\'t see this message ', ':)'))));
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("react-title-component");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("compression");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("hpp");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("helmet");

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.log = log;
	exports.logError = logError;
	exports.logPrompt = logPrompt;
	exports.logTask = logTask;
	exports.promptApproval = promptApproval;
	
	var _prompt = __webpack_require__(16);
	
	var _prompt2 = _interopRequireDefault(_prompt);
	
	var _cliColor = __webpack_require__(17);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	function _toConsumableArray(arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }return arr2;
	  } else {
	    return Array.from(arr);
	  }
	} /*eslint no-console: 0*/
	
	function logWithColor(color, msgs) {
	  var _console;
	
	  (_console = console).log.apply(_console, _toConsumableArray([color('[react-project]')].concat(msgs)));
	}
	
	function log() {
	  var _console2;
	
	  for (var _len = arguments.length, msgs = Array(_len), _key = 0; _key < _len; _key++) {
	    msgs[_key] = arguments[_key];
	  }
	
	  (_console2 = console).log.apply(_console2, _toConsumableArray(['[react-project]'].concat(msgs)));
	}
	
	function logError() {
	  for (var _len2 = arguments.length, msgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	    msgs[_key2] = arguments[_key2];
	  }
	
	  logWithColor(_cliColor.red, msgs);
	}
	
	function logPrompt() {
	  for (var _len3 = arguments.length, msgs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	    msgs[_key3] = arguments[_key3];
	  }
	
	  logWithColor(_cliColor.yellow, msgs);
	}
	
	function logTask() {
	  for (var _len4 = arguments.length, msgs = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	    msgs[_key4] = arguments[_key4];
	  }
	
	  logWithColor(_cliColor.green, msgs);
	}
	
	function promptApproval(msg, cb) {
	  if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'production') {
	    logError('Wanted to prompt approval but skipping because we are in production or test');
	    log('Prompt message was: ', msg);
	    cb();
	  } else {
	    _prompt2.default.start();
	    var property = {
	      name: 'yesno',
	      message: msg + ' (y|n)',
	      validator: /y|n/,
	      warning: 'Must respond "y" for yes or "n" for no',
	      default: 'n'
	    };
	    _prompt2.default.get(property, function (err, result) {
	      if (result.yesno === 'y') {
	        cb && cb();
	      } else {
	        logError('FINE!');
	        process.exit();
	      }
	    });
	  }
	}

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = require("prompt");

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("cli-color");

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.AUTO_RELOAD = exports.SERVER_RENDERING = exports.PUBLIC_DIR = exports.PUBLIC_PATH = exports.DEV_PORT = exports.DEV_HOST = exports.PORT = exports.APP_PATH = undefined;
	
	var _path = __webpack_require__(9);
	
	var _path2 = _interopRequireDefault(_path);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	var APP_PATH = exports.APP_PATH = process.cwd();
	var PORT = exports.PORT = process.env.PORT || 8080;
	var DEV_HOST = exports.DEV_HOST = process.env.DEV_HOST || 'localhost';
	var DEV_PORT = exports.DEV_PORT = process.env.DEV_PORT || 8081;
	var PUBLIC_PATH = exports.PUBLIC_PATH = process.env.PUBLIC_PATH || '/';
	var PUBLIC_DIR = exports.PUBLIC_DIR = _path2.default.join(APP_PATH, '.build');
	var SERVER_RENDERING = exports.SERVER_RENDERING = process.env.SERVER_RENDERING === 'on';
	var AUTO_RELOAD = exports.AUTO_RELOAD = process.env.AUTO_RELOAD;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = ErrorMessage;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	var style = {
	  fontFamily: 'sans-serif',
	  width: 300,
	  padding: '10px 50px 50px 50px',
	  background: '#f0f0f0',
	  color: '#333',
	  margin: '100px auto 0 auto'
	};
	
	function ErrorMessage(props) {
	  return _react2.default.createElement('div', { style: style }, _react2.default.createElement('h1', null, 'React Project Error'), props.children);
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _favicon = __webpack_require__(21);
	
	var _favicon2 = _interopRequireDefault(_favicon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _React$PropTypes = _react2.default.PropTypes;
	var arrayOf = _React$PropTypes.arrayOf;
	var string = _React$PropTypes.string;
	var node = _React$PropTypes.node;
	var object = _React$PropTypes.object;
	
	
	var shims = '\n  (String.prototype.trim && Function.prototype.bind) || document.write(\'<script src="/es5-shim.js"><\\/script>\');\n  window.Promise || document.write(\'<script src="/Promise.js"><\\/script>\');\n  window.fetch || document.write(\'<script src="/fetch.js"><\\/script>\');\n';
	
	var Document = _react2.default.createClass({
	  displayName: 'Document',
	
	
	  propTypes: {
	    styles: arrayOf(node),
	    scripts: arrayOf(node),
	    content: string,
	    title: string,
	    initialState: object
	  },
	
	  render: function render() {
	    var _props = this.props;
	    var styles = _props.styles;
	    var scripts = _props.scripts;
	    var content = _props.content;
	    var title = _props.title;
	
	
	    return _react2.default.createElement(
	      'html',
	      null,
	      _react2.default.createElement(
	        'head',
	        null,
	        _react2.default.createElement('meta', { charSet: 'utf-8' }),
	        _react2.default.createElement('link', { rel: 'shortcut icon', href: _favicon2.default }),
	        _react2.default.createElement(
	          'title',
	          null,
	          title
	        ),
	        styles
	      ),
	      _react2.default.createElement(
	        'body',
	        null,
	        _react2.default.createElement('div', { id: 'app', dangerouslySetInnerHTML: { __html: content } }),
	        _react2.default.createElement('script', { dangerouslySetInnerHTML: { __html: shims } }),
	        scripts
	      )
	    );
	  }
	});
	
	exports.default = Document;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fd73a6eb26a08ee46e7fd3cc34e7f6bf.ico";

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	__webpack_require__(23);
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(10);
	
	var _reactProject = __webpack_require__(24);
	
	var _hello = __webpack_require__(26);
	
	var _hello2 = _interopRequireDefault(_hello);
	
	var _App = __webpack_require__(27);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _Home = __webpack_require__(28);
	
	var _Home2 = _interopRequireDefault(_Home);
	
	var _NoMatch = __webpack_require__(29);
	
	var _NoMatch2 = _interopRequireDefault(_NoMatch);
	
	var _Dragon = __webpack_require__(30);
	
	var _Dragon2 = _interopRequireDefault(_Dragon);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _react2.default.createElement(
	  _reactRouter.Route,
	  null,
	  _react2.default.createElement(
	    _reactRouter.Route,
	    { path: '/', component: _App2.default },
	    _react2.default.createElement(_reactRouter.IndexRoute, { component: _Home2.default }),
	    _react2.default.createElement(_reactRouter.Route, { path: 'dragon', component: _Dragon2.default })
	  ),
	  _react2.default.createElement(
	    _reactProject.ServerRoute,
	    { path: '/api' },
	    _react2.default.createElement(_reactProject.ServerRoute, { path: ':hello', get: _hello2.default })
	  ),
	  _react2.default.createElement(_reactRouter.Redirect, { from: '/not-dragon', to: '/dragon' }),
	  _react2.default.createElement(_reactRouter.Route, { path: '*', status: 404, component: _NoMatch2.default })
	);

/***/ },
/* 23 */
/***/ function(module, exports) {



/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(25);

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ServerRoute = undefined;
	exports.lazy = lazy;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) {
	  return obj && obj.__esModule ? obj : { default: obj };
	}
	
	var _React$PropTypes = _react2.default.PropTypes;
	var func = _React$PropTypes.func;
	var string = _React$PropTypes.string;
	var object = _React$PropTypes.object;
	var oneOfType = _React$PropTypes.oneOfType;
	function lazy(loader) {
	  return function (location, cb) {
	    loader(function (Mod) {
	      cb(null, Mod.default);
	    });
	  };
	}
	
	var handler = oneOfType([func, object]);
	
	var ServerRoute = exports.ServerRoute = _react2.default.createClass({
	  displayName: 'ServerRoute',
	
	  propTypes: {
	    path: string.isRequired,
	    get: handler,
	    post: handler,
	    patch: handler,
	    put: handler,
	    delete: handler
	  },
	  getDefaultProps: function getDefaultProps() {
	    return {
	      isServerRoute: true
	    };
	  },
	  render: function render() {
	    return null;
	  }
	});

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (req, res, _ref) {
	  var params = _ref.params;
	  var location = _ref.location;
	  var route = _ref.route;
	
	  params, location, route;
	  res.send('I only run on the server!');
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactRouter = __webpack_require__(10);
	
	var _reactTitleComponent = __webpack_require__(11);
	
	var _reactTitleComponent2 = _interopRequireDefault(_reactTitleComponent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _react2.default.createClass({
	  displayName: 'App',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(_reactTitleComponent2.default, { render: 'Awesome App' }),
	      _react2.default.createElement(
	        'h1',
	        null,
	        'Welcome to your app.'
	      ),
	      _react2.default.createElement(
	        'ul',
	        null,
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            _reactRouter.IndexLink,
	            { to: '/' },
	            'Home'
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: '/dragon' },
	            'A DRAGON!'
	          )
	        ),
	        _react2.default.createElement(
	          'li',
	          null,
	          _react2.default.createElement(
	            _reactRouter.Link,
	            { to: '/not-dragon' },
	            'An old URL to a DRAGON!'
	          )
	        )
	      ),
	      this.props.children
	    );
	  }
	});

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactTitleComponent = __webpack_require__(11);
	
	var _reactTitleComponent2 = _interopRequireDefault(_reactTitleComponent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _react2.default.createClass({
	  displayName: 'Home',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(_reactTitleComponent2.default, { render: function render(prev) {
	          return prev + ' | Home';
	        } }),
	      _react2.default.createElement(
	        'p',
	        null,
	        'Home!'
	      )
	    );
	  }
	});

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _react2.default.createClass({
	  displayName: 'NoMatch',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      '404'
	    );
	  }
	});

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _dragon = __webpack_require__(31);
	
	var _dragon2 = _interopRequireDefault(_dragon);
	
	var _styles = __webpack_require__(32);
	
	var _reactTitleComponent = __webpack_require__(11);
	
	var _reactTitleComponent2 = _interopRequireDefault(_reactTitleComponent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = _react2.default.createClass({
	  displayName: 'Dragon',
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(_reactTitleComponent2.default, { render: function render(prev) {
	          return prev + ' | Dragon!';
	        } }),
	      _react2.default.createElement(
	        'h2',
	        { className: _styles.header },
	        'RAR!'
	      ),
	      _react2.default.createElement('img', { src: _dragon2.default, height: '400' })
	    );
	  }
	});

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "1d6600c436721252b8048b7bc6bfb806.jpg";

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = {
		"header": "styles__header___P9w1l"
	};

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map