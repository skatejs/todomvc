// node_modules/todomvc-common/base.js
(typeof window === 'undefined' ? global : window).__4e217bba0bafac4ed0c1159f936c9a72 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  /* global _ */
  (function () {
  
  	/* jshint ignore:start */
  	// Underscore's Template Module
  	// Courtesy of underscorejs.org
  	var _ = (function (_) {
  		_.defaults = function (object) {
  			if (!object) {
  				return object;
  			}
  			for (var argsIndex = 1, argsLength = arguments.length; argsIndex < argsLength; argsIndex++) {
  				var iterable = arguments[argsIndex];
  				if (iterable) {
  					for (var key in iterable) {
  						if (object[key] == null) {
  							object[key] = iterable[key];
  						}
  					}
  				}
  			}
  			return object;
  		}
  
  		// By default, Underscore uses ERB-style template delimiters, change the
  		// following template settings to use alternative delimiters.
  		_.templateSettings = {
  			evaluate    : /<%([\s\S]+?)%>/g,
  			interpolate : /<%=([\s\S]+?)%>/g,
  			escape      : /<%-([\s\S]+?)%>/g
  		};
  
  		// When customizing `templateSettings`, if you don't want to define an
  		// interpolation, evaluation or escaping regex, we need one that is
  		// guaranteed not to match.
  		var noMatch = /(.)^/;
  
  		// Certain characters need to be escaped so that they can be put into a
  		// string literal.
  		var escapes = {
  			"'":      "'",
  			'\\':     '\\',
  			'\r':     'r',
  			'\n':     'n',
  			'\t':     't',
  			'\u2028': 'u2028',
  			'\u2029': 'u2029'
  		};
  
  		var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
  
  		// JavaScript micro-templating, similar to John Resig's implementation.
  		// Underscore templating handles arbitrary delimiters, preserves whitespace,
  		// and correctly escapes quotes within interpolated code.
  		_.template = function(text, data, settings) {
  			var render;
  			settings = _.defaults({}, settings, _.templateSettings);
  
  			// Combine delimiters into one regular expression via alternation.
  			var matcher = new RegExp([
  				(settings.escape || noMatch).source,
  				(settings.interpolate || noMatch).source,
  				(settings.evaluate || noMatch).source
  			].join('|') + '|$', 'g');
  
  			// Compile the template source, escaping string literals appropriately.
  			var index = 0;
  			var source = "__p+='";
  			text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
  				source += text.slice(index, offset)
  					.replace(escaper, function(match) { return '\\' + escapes[match]; });
  
  				if (escape) {
  					source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
  				}
  				if (interpolate) {
  					source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
  				}
  				if (evaluate) {
  					source += "';\n" + evaluate + "\n__p+='";
  				}
  				index = offset + match.length;
  				return match;
  			});
  			source += "';\n";
  
  			// If a variable is not specified, place data values in local scope.
  			if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';
  
  			source = "var __t,__p='',__j=Array.prototype.join," +
  				"print=function(){__p+=__j.call(arguments,'');};\n" +
  				source + "return __p;\n";
  
  			try {
  				render = new Function(settings.variable || 'obj', '_', source);
  			} catch (e) {
  				e.source = source;
  				throw e;
  			}
  
  			if (data) return render(data, _);
  			var template = function(data) {
  				return render.call(this, data, _);
  			};
  
  			// Provide the compiled function source as a convenience for precompilation.
  			template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';
  
  			return template;
  		};
  
  		return _;
  	})({});
  
  	if (location.hostname === 'todomvc.com') {
  		(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  		(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  		m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  		})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  		ga('create', 'UA-31081062-1', 'auto');
  		ga('send', 'pageview');
  	}
  	/* jshint ignore:end */
  
  	function redirect() {
  		if (location.hostname === 'tastejs.github.io') {
  			location.href = location.href.replace('tastejs.github.io/todomvc', 'todomvc.com');
  		}
  	}
  
  	function findRoot() {
  		var base = location.href.indexOf('examples/');
  		return location.href.substr(0, base);
  	}
  
  	function getFile(file, callback) {
  		if (!location.host) {
  			return console.info('Miss the info bar? Run TodoMVC from a server to avoid a cross-origin error.');
  		}
  
  		var xhr = new XMLHttpRequest();
  
  		xhr.open('GET', findRoot() + file, true);
  		xhr.send();
  
  		xhr.onload = function () {
  			if (xhr.status === 200 && callback) {
  				callback(xhr.responseText);
  			}
  		};
  	}
  
  	function Learn(learnJSON, config) {
  		if (!(this instanceof Learn)) {
  			return new Learn(learnJSON, config);
  		}
  
  		var template, framework;
  
  		if (typeof learnJSON !== 'object') {
  			try {
  				learnJSON = JSON.parse(learnJSON);
  			} catch (e) {
  				return;
  			}
  		}
  
  		if (config) {
  			template = config.template;
  			framework = config.framework;
  		}
  
  		if (!template && learnJSON.templates) {
  			template = learnJSON.templates.todomvc;
  		}
  
  		if (!framework && document.querySelector('[data-framework]')) {
  			framework = document.querySelector('[data-framework]').dataset.framework;
  		}
  
  		this.template = template;
  
  		if (learnJSON.backend) {
  			this.frameworkJSON = learnJSON.backend;
  			this.frameworkJSON.issueLabel = framework;
  			this.append({
  				backend: true
  			});
  		} else if (learnJSON[framework]) {
  			this.frameworkJSON = learnJSON[framework];
  			this.frameworkJSON.issueLabel = framework;
  			this.append();
  		}
  
  		this.fetchIssueCount();
  	}
  
  	Learn.prototype.append = function (opts) {
  		var aside = document.createElement('aside');
  		aside.innerHTML = _.template(this.template, this.frameworkJSON);
  		aside.className = 'learn';
  
  		if (opts && opts.backend) {
  			// Remove demo link
  			var sourceLinks = aside.querySelector('.source-links');
  			var heading = sourceLinks.firstElementChild;
  			var sourceLink = sourceLinks.lastElementChild;
  			// Correct link path
  			var href = sourceLink.getAttribute('href');
  			sourceLink.setAttribute('href', href.substr(href.lastIndexOf('http')));
  			sourceLinks.innerHTML = heading.outerHTML + sourceLink.outerHTML;
  		} else {
  			// Localize demo links
  			var demoLinks = aside.querySelectorAll('.demo-link');
  			Array.prototype.forEach.call(demoLinks, function (demoLink) {
  				if (demoLink.getAttribute('href').substr(0, 4) !== 'http') {
  					demoLink.setAttribute('href', findRoot() + demoLink.getAttribute('href'));
  				}
  			});
  		}
  
  		document.body.className = (document.body.className + ' learn-bar').trim();
  		document.body.insertAdjacentHTML('afterBegin', aside.outerHTML);
  	};
  
  	Learn.prototype.fetchIssueCount = function () {
  		var issueLink = document.getElementById('issue-count-link');
  		if (issueLink) {
  			var url = issueLink.href.replace('https://github.com', 'https://api.github.com/repos');
  			var xhr = new XMLHttpRequest();
  			xhr.open('GET', url, true);
  			xhr.onload = function (e) {
  				var parsedResponse = JSON.parse(e.target.responseText);
  				if (parsedResponse instanceof Array) {
  					var count = parsedResponse.length;
  					if (count !== 0) {
  						issueLink.innerHTML = 'This app has ' + count + ' open issues';
  						document.getElementById('issue-count').style.display = 'inline';
  					}
  				}
  			};
  			xhr.send();
  		}
  	};
  
  	redirect();
  	getFile('learn.json', Learn);
  })();
  
  
  return module.exports;
}).call(this);
// node_modules/skatejs-dom-diff/node_modules/weakmap/weakmap.js
(typeof window === 'undefined' ? global : window).__49b0938828243a68d941763eab6fd05f = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__49b0938828243a68d941763eab6fd05f");
  define.amd = true;
  
  /* (The MIT License)
   *
   * Copyright (c) 2012 Brandon Benvie <http://bbenvie.com>
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
   * associated documentation files (the 'Software'), to deal in the Software without restriction,
   * including without limitation the rights to use, copy, modify, merge, publish, distribute,
   * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included with all copies or
   * substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
   * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
   * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY  CLAIM,
   * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   */
  
  // Original WeakMap implementation by Gozala @ https://gist.github.com/1269991
  // Updated and bugfixed by Raynos @ https://gist.github.com/1638059
  // Expanded by Benvie @ https://github.com/Benvie/harmony-collections
  
  void function(global, undefined_, undefined){
    var getProps = Object.getOwnPropertyNames,
        defProp  = Object.defineProperty,
        toSource = Function.prototype.toString,
        create   = Object.create,
        hasOwn   = Object.prototype.hasOwnProperty,
        funcName = /^\n?function\s?(\w*)?_?\(/;
  
  
    function define(object, key, value){
      if (typeof key === 'function') {
        value = key;
        key = nameOf(value).replace(/_$/, '');
      }
      return defProp(object, key, { configurable: true, writable: true, value: value });
    }
  
    function nameOf(func){
      return typeof func !== 'function'
            ? '' : 'name' in func
            ? func.name : toSource.call(func).match(funcName)[1];
    }
  
    // ############
    // ### Data ###
    // ############
  
    var Data = (function(){
      var dataDesc = { value: { writable: true, value: undefined } },
          datalock = 'return function(k){if(k===s)return l}',
          uids     = create(null),
  
          createUID = function(){
            var key = Math.random().toString(36).slice(2);
            return key in uids ? createUID() : uids[key] = key;
          },
  
          globalID = createUID(),
  
          storage = function(obj){
            if (hasOwn.call(obj, globalID))
              return obj[globalID];
  
            if (!Object.isExtensible(obj))
              throw new TypeError("Object must be extensible");
  
            var store = create(null);
            defProp(obj, globalID, { value: store });
            return store;
          };
  
      // common per-object storage area made visible by patching getOwnPropertyNames'
      define(Object, function getOwnPropertyNames(obj){
        var props = getProps(obj);
        if (hasOwn.call(obj, globalID))
          props.splice(props.indexOf(globalID), 1);
        return props;
      });
  
      function Data(){
        var puid = createUID(),
            secret = {};
  
        this.unlock = function(obj){
          var store = storage(obj);
          if (hasOwn.call(store, puid))
            return store[puid](secret);
  
          var data = create(null, dataDesc);
          defProp(store, puid, {
            value: new Function('s', 'l', datalock)(secret, data)
          });
          return data;
        }
      }
  
      define(Data.prototype, function get(o){ return this.unlock(o).value });
      define(Data.prototype, function set(o, v){ this.unlock(o).value = v });
  
      return Data;
    }());
  
  
    var WM = (function(data){
      var validate = function(key){
        if (key == null || typeof key !== 'object' && typeof key !== 'function')
          throw new TypeError("Invalid WeakMap key");
      }
  
      var wrap = function(collection, value){
        var store = data.unlock(collection);
        if (store.value)
          throw new TypeError("Object is already a WeakMap");
        store.value = value;
      }
  
      var unwrap = function(collection){
        var storage = data.unlock(collection).value;
        if (!storage)
          throw new TypeError("WeakMap is not generic");
        return storage;
      }
  
      var initialize = function(weakmap, iterable){
        if (iterable !== null && typeof iterable === 'object' && typeof iterable.forEach === 'function') {
          iterable.forEach(function(item, i){
            if (item instanceof Array && item.length === 2)
              set.call(weakmap, iterable[i][0], iterable[i][1]);
          });
        }
      }
  
  
      function WeakMap(iterable){
        if (this === global || this == null || this === WeakMap.prototype)
          return new WeakMap(iterable);
  
        wrap(this, new Data);
        initialize(this, iterable);
      }
  
      function get(key){
        validate(key);
        var value = unwrap(this).get(key);
        return value === undefined_ ? undefined : value;
      }
  
      function set(key, value){
        validate(key);
        // store a token for explicit undefined so that "has" works correctly
        unwrap(this).set(key, value === undefined ? undefined_ : value);
      }
  
      function has(key){
        validate(key);
        return unwrap(this).get(key) !== undefined;
      }
  
      function delete_(key){
        validate(key);
        var data = unwrap(this),
            had = data.get(key) !== undefined;
        data.set(key, undefined);
        return had;
      }
  
      function toString(){
        unwrap(this);
        return '[object WeakMap]';
      }
  
      try {
        var src = ('return '+delete_).replace('e_', '\\u0065'),
            del = new Function('unwrap', 'validate', src)(unwrap, validate);
      } catch (e) {
        var del = delete_;
      }
  
      var src = (''+Object).split('Object');
      var stringifier = function toString(){
        return src[0] + nameOf(this) + src[1];
      };
  
      define(stringifier, stringifier);
  
      var prep = { __proto__: [] } instanceof Array
        ? function(f){ f.__proto__ = stringifier }
        : function(f){ define(f, stringifier) };
  
      prep(WeakMap);
  
      [toString, get, set, has, del].forEach(function(method){
        define(WeakMap.prototype, method);
        prep(method);
      });
  
      return WeakMap;
    }(new Data));
  
    var defaultCreator = Object.create
      ? function(){ return Object.create(null) }
      : function(){ return {} };
  
    function createStorage(creator){
      var weakmap = new WM;
      creator || (creator = defaultCreator);
  
      function storage(object, value){
        if (value || arguments.length === 2) {
          weakmap.set(object, value);
        } else {
          value = weakmap.get(object);
          if (value === undefined) {
            value = creator(object);
            weakmap.set(object, value);
          }
        }
        return value;
      }
  
      return storage;
    }
  
  
    if (typeof module !== 'undefined') {
      module.exports = WM;
    } else if (typeof exports !== 'undefined') {
      exports.WeakMap = WM;
    } else if (!('WeakMap' in global)) {
      global.WeakMap = WM;
    }
  
    WM.createStorage = createStorage;
    if (global.WeakMap)
      global.WeakMap.createStorage = createStorage;
  }((0, eval)('this'));
  
  
  return module.exports;
}).call(this);
// node_modules/skatejs-dom-diff/src/util/accessor.js
(typeof window === 'undefined' ? global : window).__b86ad4b8fb354cab9a20014b48d275fb = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.getAccessor = getAccessor;
  exports.mapAccessor = mapAccessor;
  exports.removeAccessor = removeAccessor;
  exports.setAccessor = setAccessor;
  
  function getAccessor(node, name) {
    if (name === 'class') {
      return node.className;
    } else if (name === 'style') {
      return node.style.cssText;
    } else if (name !== 'type' && name in node) {
      return node[name];
    } else if (node.getAttribute) {
      return node.getAttribute(name);
    } else if (node.attributes && node.attributes[name]) {
      return node.attributes[name].value;
    }
  }
  
  function mapAccessor(node, name, value) {
    if (name === 'class') {
      node.className = value;
    } else if (name === 'style') {
      node.style = { cssText: value };
    }
  }
  
  function removeAccessor(node, name) {
    if (name === 'class') {
      node.className = '';
    } else if (name === 'style') {
      node.style.cssText = '';
    } else if (name !== 'type' && name in node) {
      node[name] = '';
    } else if (node.removeAttribute) {
      node.removeAttribute(name);
    } else if (node.attributes) {
      delete node.attributes[name];
    }
  }
  
  function setAccessor(node, name, value) {
    if (name === 'class') {
      node.className = value;
    } else if (name === 'style') {
      node.style.cssText = value;
    } else if (name !== 'type' && name in node) {
      node[name] = value;
    } else if (node.setAttribute) {
      node.setAttribute(name, value);
    } else if (node.attributes) {
      node.attributes[node.attributes.length] = node.attributes[name] = { name: name, value: value };
    }
  }
  
  return module.exports;
}).call(this);
// node_modules/skatejs-dom-diff/src/vdom/text.js
(typeof window === 'undefined' ? global : window).__bda6929c930adc39ea57e9d09377a13d = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = createTextNode;
  
  function createTextNode(item) {
    return {
      nodeType: 3,
      textContent: item
    };
  }
  
  module.exports = exports["default"];
  
  return module.exports;
}).call(this);
// node_modules/skatejs-dom-diff/src/vdom/element.js
(typeof window === 'undefined' ? global : window).__602d7417d4e09c5c189e16eb3e55eb08 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilAccessor = __b86ad4b8fb354cab9a20014b48d275fb;
  
  var _text = __bda6929c930adc39ea57e9d09377a13d;
  
  var _text2 = _interopRequireDefault(_text);
  
  function separateData(obj) {
    var attrs = {};
    var events = {};
    var node = {};
    var attrIdx = 0;
  
    for (var _name in obj) {
      var value = obj[_name];
  
      if (_name.indexOf('on') === 0) {
        events[_name.substring(2)] = value;
      } else {
        attrs[attrIdx++] = attrs[_name] = { name: _name, value: value };
        (0, _utilAccessor.mapAccessor)(node, _name, value);
      }
    }
  
    attrs.length = attrIdx;
    return { attrs: attrs, events: events, node: node };
  }
  
  function ensureNodes(arr) {
    var out = [];
    arr.filter(Boolean).forEach(function (item) {
      if (Array.isArray(item)) {
        out = out.concat(ensureNodes(item));
      } else if (typeof item === 'object') {
        out.push(item);
      } else {
        out.push((0, _text2['default'])(item));
      }
    });
    return out;
  }
  
  function ensureTagName(name) {
    return (typeof name === 'function' ? name.id || name.name : name).toUpperCase();
  }
  
  exports['default'] = function (name) {
    var attrs = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  
    var data = separateData(attrs);
    var node = data.node;
    node.nodeType = 1;
    node.tagName = ensureTagName(name);
    node.attributes = data.attrs;
    node.events = data.events;
  
    for (var _len = arguments.length, chren = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      chren[_key - 2] = arguments[_key];
    }
  
    node.childNodes = ensureNodes(chren);
    return node;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// node_modules/skatejs-dom-diff/src/types.js
(typeof window === 'undefined' ? global : window).__613e9d611f12ca908b7368a65ec61c39 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var APPEND_CHILD = 1;
  exports.APPEND_CHILD = APPEND_CHILD;
  var REMOVE_CHILD = 2;
  exports.REMOVE_CHILD = REMOVE_CHILD;
  var REMOVE_ATTRIBUTE = 3;
  exports.REMOVE_ATTRIBUTE = REMOVE_ATTRIBUTE;
  var REPLACE_CHILD = 4;
  exports.REPLACE_CHILD = REPLACE_CHILD;
  var SET_ATTRIBUTE = 5;
  exports.SET_ATTRIBUTE = SET_ATTRIBUTE;
  var SET_EVENT = 6;
  exports.SET_EVENT = SET_EVENT;
  var SET_PROPERTY = 7;
  exports.SET_PROPERTY = SET_PROPERTY;
  var TEXT_CONTENT = 8;
  exports.TEXT_CONTENT = TEXT_CONTENT;
  
  return module.exports;
}).call(this);
// node_modules/skatejs-dom-diff/src/compare/attributes.js
(typeof window === 'undefined' ? global : window).__61bb91c6e020f34ed829a192d99d2c27 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  var _types = __613e9d611f12ca908b7368a65ec61c39;
  
  var types = _interopRequireWildcard(_types);
  
  var _utilAccessor = __b86ad4b8fb354cab9a20014b48d275fb;
  
  exports['default'] = function (src, dst) {
    var srcAttrs = src.attributes;
    var dstAttrs = dst.attributes;
    var srcAttrsLen = (srcAttrs || 0) && srcAttrs.length;
    var dstAttrsLen = (dstAttrs || 0) && dstAttrs.length;
    var instructions = [];
  
    // Bail early if possible.
    if (!srcAttrsLen && !dstAttrsLen) {
      return instructions;
    }
  
    // Merge attributes that exist in source with destination's.
    for (var a = 0; a < srcAttrsLen; a++) {
      var srcAttr = srcAttrs[a];
      var srcAttrName = srcAttr.name;
      var srcAttrValue = (0, _utilAccessor.getAccessor)(src, srcAttrName);
      var dstAttr = dstAttrs[srcAttrName];
      var dstAttrValue = (0, _utilAccessor.getAccessor)(dst, srcAttrName);
  
      if (!dstAttr) {
        instructions.push({
          data: { name: srcAttrName },
          destination: dst,
          source: src,
          type: types.REMOVE_ATTRIBUTE
        });
      } else if (srcAttrValue !== dstAttrValue) {
        instructions.push({
          data: { name: srcAttrName, value: dstAttrValue },
          destination: dst,
          source: src,
          type: types.SET_ATTRIBUTE
        });
      }
    }
  
    // We only need to worry about setting attributes that don't already exist
    // in the source.
    for (var a = 0; a < dstAttrsLen; a++) {
      var dstAttr = dstAttrs[a];
      var dstAttrName = dstAttr.name;
      var dstAttrValue = (0, _utilAccessor.getAccessor)(dst, dstAttrName);
      var srcAttr = srcAttrs[dstAttrName];
  
      if (!srcAttr) {
        instructions.push({
          data: { name: dstAttrName, value: dstAttrValue },
          destination: dst,
          source: src,
          type: types.SET_ATTRIBUTE
        });
      }
    }
  
    return instructions;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// node_modules/skatejs-dom-diff/src/util/event-map.js
(typeof window === 'undefined' ? global : window).__fee4ace635cf8f97f366b4ebde70afce = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  __49b0938828243a68d941763eab6fd05f;
  
  var WeakMap = window.WeakMap;
  
  var map = new WeakMap();
  
  exports['default'] = function (elem) {
    var events = map.get(elem);
    events || map.set(elem, events = {});
    return events;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// node_modules/skatejs-dom-diff/src/compare/events.js
(typeof window === 'undefined' ? global : window).__3f80e829020f821358f3bd482dea8d71 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  var _types = __613e9d611f12ca908b7368a65ec61c39;
  
  var types = _interopRequireWildcard(_types);
  
  var _utilEventMap = __fee4ace635cf8f97f366b4ebde70afce;
  
  var _utilEventMap2 = _interopRequireDefault(_utilEventMap);
  
  exports['default'] = function (src, dst) {
    var eventHandlers = (0, _utilEventMap2['default'])(src);
    var dstEvents = dst.events;
    var instructions = [];
  
    // Remove all handlers not being set.
    for (var _name in eventHandlers) {
      if (!(_name in dstEvents)) {
        var value = null;
        instructions.push({
          data: { name: _name, value: value },
          destination: dst,
          source: src,
          type: types.SET_EVENT
        });
      }
    }
  
    // Add new handlers, not changing existing ones.
    if (dstEvents) {
      for (var _name2 in dstEvents) {
        var value = dstEvents[_name2];
        if (eventHandlers[_name2] !== value) {
          instructions.push({
            data: { name: _name2, value: value },
            destination: dst,
            source: src,
            type: types.SET_EVENT
          });
        }
      }
    }
  
    return instructions;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// node_modules/skatejs-dom-diff/src/compare/element.js
(typeof window === 'undefined' ? global : window).__e3dc883232b46f587174ca4d91117253 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _attributes = __61bb91c6e020f34ed829a192d99d2c27;
  
  var _attributes2 = _interopRequireDefault(_attributes);
  
  var _events = __3f80e829020f821358f3bd482dea8d71;
  
  var _events2 = _interopRequireDefault(_events);
  
  exports['default'] = function (src, dst) {
    if (src.tagName === dst.tagName) {
      return (0, _attributes2['default'])(src, dst).concat((0, _events2['default'])(src, dst));
    }
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// node_modules/skatejs-dom-diff/src/compare/text.js
(typeof window === 'undefined' ? global : window).__88c23668cfc3ec836207ee9b7bdff54c = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  var _types = __613e9d611f12ca908b7368a65ec61c39;
  
  var types = _interopRequireWildcard(_types);
  
  exports['default'] = function (src, dst) {
    if (src.textContent === dst.textContent) {
      return [];
    }
  
    return [{
      destination: dst,
      source: src,
      type: types.TEXT_CONTENT
    }];
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// node_modules/skatejs-dom-diff/src/compare/comment.js
(typeof window === 'undefined' ? global : window).__a31f08b9966914ca25d1af0dacbd2362 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _text = __88c23668cfc3ec836207ee9b7bdff54c;
  
  var _text2 = _interopRequireDefault(_text);
  
  exports['default'] = _text2['default'];
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// node_modules/skatejs-dom-diff/src/compare/node.js
(typeof window === 'undefined' ? global : window).__fe81529cc14b42317ebdfcb00d4632c9 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _element = __e3dc883232b46f587174ca4d91117253;
  
  var _element2 = _interopRequireDefault(_element);
  
  var _text = __88c23668cfc3ec836207ee9b7bdff54c;
  
  var _text2 = _interopRequireDefault(_text);
  
  var _comment = __a31f08b9966914ca25d1af0dacbd2362;
  
  var _comment2 = _interopRequireDefault(_comment);
  
  var NODE_COMMENT = 8;
  var NODE_ELEMENT = 1;
  var NODE_TEXT = 3;
  
  exports['default'] = function (src, dst) {
    var dstType = undefined,
        srcType = undefined;
  
    if (!dst || !src) {
      return;
    }
  
    dstType = dst.nodeType;
    srcType = src.nodeType;
  
    if (dstType !== srcType) {
      return;
    } else if (dstType === NODE_ELEMENT) {
      return (0, _element2['default'])(src, dst);
    } else if (dstType === NODE_TEXT) {
      return (0, _text2['default'])(src, dst);
    } else if (dstType === NODE_COMMENT) {
      return (0, _comment2['default'])(src, dst);
    }
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// node_modules/skatejs-dom-diff/src/util/real-node-map.js
(typeof window === 'undefined' ? global : window).__5caa9b248c4484a17e6a232bac6e4b8b = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  __49b0938828243a68d941763eab6fd05f;
  
  var WeakMap = window.WeakMap;
  exports['default'] = new WeakMap();
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// node_modules/skatejs-dom-diff/src/util/real-node.js
(typeof window === 'undefined' ? global : window).__5850cfd1a1665c1f1aff3386886685a9 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _realNodeMap = __5caa9b248c4484a17e6a232bac6e4b8b;
  
  var _realNodeMap2 = _interopRequireDefault(_realNodeMap);
  
  var Node = window.Node;
  
  exports['default'] = function (node) {
    return node instanceof Node ? node : _realNodeMap2['default'].get(node);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// node_modules/skatejs-dom-diff/src/diff.js
(typeof window === 'undefined' ? global : window).__03be74d19b8d4233376e0725537558b8 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports['default'] = diff;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  var _types = __613e9d611f12ca908b7368a65ec61c39;
  
  var types = _interopRequireWildcard(_types);
  
  var _compareNode = __fe81529cc14b42317ebdfcb00d4632c9;
  
  var _compareNode2 = _interopRequireDefault(_compareNode);
  
  var _utilRealNode = __5850cfd1a1665c1f1aff3386886685a9;
  
  var _utilRealNode2 = _interopRequireDefault(_utilRealNode);
  
  var _utilRealNodeMap = __5caa9b248c4484a17e6a232bac6e4b8b;
  
  var _utilRealNodeMap2 = _interopRequireDefault(_utilRealNodeMap);
  
  function diff() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  
    var src = opts.source;
    var dst = opts.destination;
    var instructions = [];
  
    if (!src || !dst) {
      return [];
    }
  
    var srcChs = src.childNodes;
    var dstChs = dst.childNodes;
    var srcChsLen = srcChs ? srcChs.length : 0;
    var dstChsLen = dstChs ? dstChs.length : 0;
  
    for (var a = 0; a < dstChsLen; a++) {
      var curSrc = srcChs[a];
      var curDst = dstChs[a];
  
      // If there is no matching destination node it means we need to remove the
      // current source node from the source.
      if (!curSrc) {
        instructions.push({
          destination: dstChs[a],
          source: src,
          type: types.APPEND_CHILD
        });
        continue;
      } else {
        // Ensure the real node is carried over even if the destination isn't used.
        // This is used in the render() function to keep track of the real node
        // that corresponds to a virtual node if a virtual tree is being used.
        if (!(curDst instanceof Node)) {
          _utilRealNodeMap2['default'].set(curDst, (0, _utilRealNode2['default'])(curSrc));
        }
      }
  
      var nodeInstructions = (0, _compareNode2['default'])(curSrc, curDst);
  
      // If there are instructions (even an empty array) it means the node can be
      // diffed and doesn't have to be replaced. If the instructions are falsy
      // it means that the nodes are not similar (cannot be changed) and must be
      // replaced instead.
      if (nodeInstructions) {
        var newOpts = opts;
        newOpts.destination = curDst;
        newOpts.source = curSrc;
        instructions = instructions.concat(nodeInstructions, diff(newOpts));
      } else {
        instructions.push({
          destination: curDst,
          source: curSrc,
          type: types.REPLACE_CHILD
        });
      }
    }
  
    if (dstChsLen < srcChsLen) {
      for (var a = dstChsLen; a < srcChsLen; a++) {
        instructions.push({
          destination: srcChs[a],
          source: src,
          type: types.REMOVE_CHILD
        });
      }
    }
  
    return instructions;
  }
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// node_modules/skatejs-dom-diff/src/util/content-node.js
(typeof window === 'undefined' ? global : window).__f780a6c6e3166cea6387365bdd3717a7 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _realNode = __5850cfd1a1665c1f1aff3386886685a9;
  
  var _realNode2 = _interopRequireDefault(_realNode);
  
  var Node = window.Node;
  
  exports['default'] = function (node) {
    var tmp = (0, _realNode2['default'])(node);
    var contentNode = tmp.content;
    return contentNode instanceof Node ? contentNode : tmp;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// node_modules/skatejs-dom-diff/src/vdom/dom.js
(typeof window === 'undefined' ? global : window).__23087f4c6274c7e9c8e8ad1c398ff8a3 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports['default'] = render;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilAccessor = __b86ad4b8fb354cab9a20014b48d275fb;
  
  var _utilEventMap = __fee4ace635cf8f97f366b4ebde70afce;
  
  var _utilEventMap2 = _interopRequireDefault(_utilEventMap);
  
  var _utilRealNodeMap = __5caa9b248c4484a17e6a232bac6e4b8b;
  
  var _utilRealNodeMap2 = _interopRequireDefault(_utilRealNodeMap);
  
  function createElement(el) {
    var realNode = document.createElement(el.tagName);
    var attributes = el.attributes;
    var events = el.events;
    var eventHandlers = (0, _utilEventMap2['default'])(realNode);
    var children = el.childNodes;
  
    if (attributes) {
      var attributesLen = attributes.length;
      for (var a = 0; a < attributesLen; a++) {
        var attr = attributes[a];
        (0, _utilAccessor.setAccessor)(realNode, attr.name, attr.value);
      }
    }
  
    if (events) {
      for (var _name in events) {
        realNode.addEventListener(_name, eventHandlers[_name] = events[_name]);
      }
    }
  
    if (children) {
      var content = realNode.content || realNode;
      var docfrag = document.createDocumentFragment();
      var childrenLen = children.length;
  
      for (var a = 0; a < childrenLen; a++) {
        var ch = children[a];
        ch && docfrag.appendChild(render(ch));
      }
  
      if (content.appendChild) {
        content.appendChild(docfrag);
      }
    }
  
    return realNode;
  }
  
  function createText(el) {
    return document.createTextNode(el.textContent);
  }
  
  function render(el) {
    if (el instanceof Node) {
      return el;
    }
    var realNode = el.tagName ? createElement(el) : createText(el);
    _utilRealNodeMap2['default'].set(el, realNode);
    return realNode;
  }
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// node_modules/skatejs-dom-diff/src/patch/append-child.js
(typeof window === 'undefined' ? global : window).__a434f1e59aa141773a57e8a959bbd0ea = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilContentNode = __f780a6c6e3166cea6387365bdd3717a7;
  
  var _utilContentNode2 = _interopRequireDefault(_utilContentNode);
  
  var _vdomDom = __23087f4c6274c7e9c8e8ad1c398ff8a3;
  
  var _vdomDom2 = _interopRequireDefault(_vdomDom);
  
  exports['default'] = function (src, dst) {
    (0, _utilContentNode2['default'])(src).appendChild((0, _vdomDom2['default'])(dst));
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// node_modules/skatejs-dom-diff/src/patch/remove-attribute.js
(typeof window === 'undefined' ? global : window).__6629144ec276bb92cfb85a56edf08043 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilAccessor = __b86ad4b8fb354cab9a20014b48d275fb;
  
  var _utilRealNode = __5850cfd1a1665c1f1aff3386886685a9;
  
  var _utilRealNode2 = _interopRequireDefault(_utilRealNode);
  
  exports['default'] = function (src, dst, data) {
    (0, _utilAccessor.removeAccessor)((0, _utilRealNode2['default'])(src), data.name);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// node_modules/skatejs-dom-diff/src/patch/remove-child.js
(typeof window === 'undefined' ? global : window).__8e25e6234727532d8db4c72fe36d2022 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilRealNode = __5850cfd1a1665c1f1aff3386886685a9;
  
  var _utilRealNode2 = _interopRequireDefault(_utilRealNode);
  
  exports['default'] = function (src, dst) {
    var realDst = (0, _utilRealNode2['default'])(dst);
    realDst.parentNode.removeChild(realDst);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// node_modules/skatejs-dom-diff/src/patch/replace-child.js
(typeof window === 'undefined' ? global : window).__d434f994f07ed447de1c6fffa6d3d94a = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _vdomDom = __23087f4c6274c7e9c8e8ad1c398ff8a3;
  
  var _vdomDom2 = _interopRequireDefault(_vdomDom);
  
  var _utilRealNode = __5850cfd1a1665c1f1aff3386886685a9;
  
  var _utilRealNode2 = _interopRequireDefault(_utilRealNode);
  
  exports['default'] = function (src, dst) {
    var realSrc = (0, _utilRealNode2['default'])(src);
    realSrc && realSrc.parentNode && realSrc.parentNode.replaceChild((0, _vdomDom2['default'])(dst), realSrc);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// node_modules/skatejs-dom-diff/src/patch/set-attribute.js
(typeof window === 'undefined' ? global : window).__df1da3b6affa28b58e5b460786ba00fd = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilAccessor = __b86ad4b8fb354cab9a20014b48d275fb;
  
  var _utilRealNode = __5850cfd1a1665c1f1aff3386886685a9;
  
  var _utilRealNode2 = _interopRequireDefault(_utilRealNode);
  
  exports['default'] = function (src, dst, data) {
    (0, _utilAccessor.setAccessor)((0, _utilRealNode2['default'])(src), data.name, data.value);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// node_modules/skatejs-dom-diff/src/patch/set-event.js
(typeof window === 'undefined' ? global : window).__cdf079d22aab9e39f59b674c51c97933 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilEventMap = __fee4ace635cf8f97f366b4ebde70afce;
  
  var _utilEventMap2 = _interopRequireDefault(_utilEventMap);
  
  var _utilRealNode = __5850cfd1a1665c1f1aff3386886685a9;
  
  var _utilRealNode2 = _interopRequireDefault(_utilRealNode);
  
  exports['default'] = function (src, dst, data) {
    var realSrc = (0, _utilRealNode2['default'])(src);
    var eventHandlers = (0, _utilEventMap2['default'])(realSrc);
    var name = data.name;
    var prevHandler = eventHandlers[name];
    var nextHandler = data.value;
  
    if (typeof prevHandler === 'function') {
      realSrc.removeEventListener(name, prevHandler);
    }
  
    if (typeof nextHandler === 'function') {
      eventHandlers[name] = nextHandler;
      realSrc.addEventListener(name, nextHandler);
    }
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// node_modules/skatejs-dom-diff/src/patch/text-content.js
(typeof window === 'undefined' ? global : window).__296274040d64a1b9ebd1e4a91028b6f9 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilContentNode = __f780a6c6e3166cea6387365bdd3717a7;
  
  var _utilContentNode2 = _interopRequireDefault(_utilContentNode);
  
  exports['default'] = function (src, dst) {
    (0, _utilContentNode2['default'])(src).textContent = dst.textContent;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// node_modules/skatejs-dom-diff/src/patch.js
(typeof window === 'undefined' ? global : window).__7ee75870558022e0c77f4c882735f2bf = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  var _types = __613e9d611f12ca908b7368a65ec61c39;
  
  var types = _interopRequireWildcard(_types);
  
  var _patchAppendChild = __a434f1e59aa141773a57e8a959bbd0ea;
  
  var _patchAppendChild2 = _interopRequireDefault(_patchAppendChild);
  
  var _patchRemoveAttribute = __6629144ec276bb92cfb85a56edf08043;
  
  var _patchRemoveAttribute2 = _interopRequireDefault(_patchRemoveAttribute);
  
  var _patchRemoveChild = __8e25e6234727532d8db4c72fe36d2022;
  
  var _patchRemoveChild2 = _interopRequireDefault(_patchRemoveChild);
  
  var _patchReplaceChild = __d434f994f07ed447de1c6fffa6d3d94a;
  
  var _patchReplaceChild2 = _interopRequireDefault(_patchReplaceChild);
  
  var _patchSetAttribute = __df1da3b6affa28b58e5b460786ba00fd;
  
  var _patchSetAttribute2 = _interopRequireDefault(_patchSetAttribute);
  
  var _patchSetEvent = __cdf079d22aab9e39f59b674c51c97933;
  
  var _patchSetEvent2 = _interopRequireDefault(_patchSetEvent);
  
  var _patchTextContent = __296274040d64a1b9ebd1e4a91028b6f9;
  
  var _patchTextContent2 = _interopRequireDefault(_patchTextContent);
  
  var patchers = {};
  patchers[types.APPEND_CHILD] = _patchAppendChild2['default'];
  patchers[types.REMOVE_ATTRIBUTE] = _patchRemoveAttribute2['default'];
  patchers[types.REMOVE_CHILD] = _patchRemoveChild2['default'];
  patchers[types.REPLACE_CHILD] = _patchReplaceChild2['default'];
  patchers[types.SET_ATTRIBUTE] = _patchSetAttribute2['default'];
  patchers[types.SET_EVENT] = _patchSetEvent2['default'];
  patchers[types.TEXT_CONTENT] = _patchTextContent2['default'];
  
  function patch(instruction) {
    patchers[instruction.type](instruction.source, instruction.destination, instruction.data);
  }
  
  exports['default'] = function (instructions) {
    instructions.forEach(patch);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// node_modules/skatejs-dom-diff/src/merge.js
(typeof window === 'undefined' ? global : window).__25449da8673d4bf38e448e23660ecf83 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _diff = __03be74d19b8d4233376e0725537558b8;
  
  var _diff2 = _interopRequireDefault(_diff);
  
  var _patch = __7ee75870558022e0c77f4c882735f2bf;
  
  var _patch2 = _interopRequireDefault(_patch);
  
  exports['default'] = function (opts) {
    var inst = (0, _diff2['default'])(opts);
    (0, _patch2['default'])(inst);
    return inst;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// node_modules/skatejs-dom-diff/src/vdom/mount.js
(typeof window === 'undefined' ? global : window).__6be827bde52c775ccb344511c7b3d3b3 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilContentNode = __f780a6c6e3166cea6387365bdd3717a7;
  
  var _utilContentNode2 = _interopRequireDefault(_utilContentNode);
  
  var _dom = __23087f4c6274c7e9c8e8ad1c398ff8a3;
  
  var _dom2 = _interopRequireDefault(_dom);
  
  exports['default'] = function (elem, tree) {
    var content = (0, _utilContentNode2['default'])(elem) || elem;
    while (content.firstChild) {
      content.firstChild.remove();
    }
    content.appendChild((0, _dom2['default'])(tree));
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// node_modules/skatejs-dom-diff/src/render.js
(typeof window === 'undefined' ? global : window).__d36f391906505aed5d8eb87afd13fa45 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  __49b0938828243a68d941763eab6fd05f;
  
  var _vdomElement = __602d7417d4e09c5c189e16eb3e55eb08;
  
  var _vdomElement2 = _interopRequireDefault(_vdomElement);
  
  var _merge = __25449da8673d4bf38e448e23660ecf83;
  
  var _merge2 = _interopRequireDefault(_merge);
  
  var _vdomMount = __6be827bde52c775ccb344511c7b3d3b3;
  
  var _vdomMount2 = _interopRequireDefault(_vdomMount);
  
  var Node = window.Node;
  var WeakMap = window.WeakMap;
  
  var oldTreeMap = new WeakMap();
  
  exports['default'] = function (render) {
    return function (elem) {
      elem = elem instanceof Node ? elem : this;
  
      if (!elem instanceof Node) {
        throw new Error('No node provided to diff renderer as either the first argument or the context.');
      }
  
      // Create a new element to house the new tree since we diff fragments.
      var newTree = (0, _vdomElement2['default'])('div', null, render(elem, { createElement: _vdomElement2['default'] }));
      var oldTree = oldTreeMap.get(elem);
  
      if (oldTree) {
        (0, _merge2['default'])({
          destination: newTree,
          source: oldTree
        });
      } else {
        (0, _vdomMount2['default'])(elem, newTree.childNodes[0]);
      }
  
      oldTreeMap.set(elem, newTree);
    };
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// node_modules/skatejs/node_modules/object-assign/index.js
(typeof window === 'undefined' ? global : window).__4523f0e885099697c6f7fc461bcd2ec3 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  /* eslint-disable no-unused-vars */
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;
  
  function toObject(val) {
  	if (val === null || val === undefined) {
  		throw new TypeError('Object.assign cannot be called with null or undefined');
  	}
  
  	return Object(val);
  }
  
  module.exports = Object.assign || function (target, source) {
  	var from;
  	var to = toObject(target);
  	var symbols;
  
  	for (var s = 1; s < arguments.length; s++) {
  		from = Object(arguments[s]);
  
  		for (var key in from) {
  			if (hasOwnProperty.call(from, key)) {
  				to[key] = from[key];
  			}
  		}
  
  		if (Object.getOwnPropertySymbols) {
  			symbols = Object.getOwnPropertySymbols(from);
  			for (var i = 0; i < symbols.length; i++) {
  				if (propIsEnumerable.call(from, symbols[i])) {
  					to[symbols[i]] = from[symbols[i]];
  				}
  			}
  		}
  	}
  
  	return to;
  };
  
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/global/vars.js
(typeof window === 'undefined' ? global : window).__73ae33dcdfcb43fe166f8989b789f480 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__73ae33dcdfcb43fe166f8989b789f480");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod);
      global.vars = mod.exports;
    }
  })(this, function (exports, module) {
  
    var VERSION = '__skate_0_14_0';
  
    if (!window[VERSION]) {
      window[VERSION] = {
        registerIfNotExists: function registerIfNotExists(name, value) {
          return this[name] || (this[name] = value);
        }
      };
    }
  
    module.exports = window[VERSION];
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/util/has-own.js
(typeof window === 'undefined' ? global : window).__656538987284a3c85e8374f4e6b0b24a = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__656538987284a3c85e8374f4e6b0b24a");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(["exports", "module"], factory);
    } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
      factory(exports, module);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod);
      global.hasOwn = mod.exports;
    }
  })(this, function (exports, module) {
  
    module.exports = function (obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/type/element.js
(typeof window === 'undefined' ? global : window).__fd630abc4490eb9be70d1e585487527b = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__fd630abc4490eb9be70d1e585487527b");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod);
      global.element = mod.exports;
    }
  })(this, function (exports, module) {
  
    module.exports = {
      create: function create(opts) {
        var elem = document.createElement(opts['extends'] || opts.id);
        opts['extends'] && elem.setAttribute('is', opts.id);
        return elem;
      },
      filter: function filter(elem, defs) {
        var attrs = elem.attributes;
        var isAttr = attrs.is;
        var isAttrValue = isAttr && (isAttr.value || isAttr.nodeValue);
        var tagName = (elem.tagName || elem.localName).toLowerCase();
        var definition = defs[isAttrValue || tagName];
  
        if (!definition) {
          return;
        }
  
        var tagToExtend = definition['extends'];
        if (isAttrValue) {
          if (tagName === tagToExtend) {
            return [definition];
          }
        } else if (!tagToExtend) {
          return [definition];
        }
      }
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/global/registry.js
(typeof window === 'undefined' ? global : window).__a9e650e83f339871227a9137a14f1172 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "./vars": __73ae33dcdfcb43fe166f8989b789f480,
    "../util/has-own": __656538987284a3c85e8374f4e6b0b24a,
    "../type/element": __fd630abc4490eb9be70d1e585487527b,
    "./vars": __73ae33dcdfcb43fe166f8989b789f480,
    "../util/has-own": __656538987284a3c85e8374f4e6b0b24a,
    "../type/element": __fd630abc4490eb9be70d1e585487527b
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__a9e650e83f339871227a9137a14f1172");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module', './vars', '../util/has-own', '../type/element'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module, __73ae33dcdfcb43fe166f8989b789f480, __656538987284a3c85e8374f4e6b0b24a, __fd630abc4490eb9be70d1e585487527b);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod, global.globals, global.hasOwn, global.typeElement);
      global.registry = mod.exports;
    }
  })(this, function (exports, module, _vars, _utilHasOwn, _typeElement) {
  
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
    var _globals = _interopRequireDefault(_vars);
  
    var _hasOwn = _interopRequireDefault(_utilHasOwn);
  
    var _typeElement2 = _interopRequireDefault(_typeElement);
  
    var definitions = {};
    var map = [];
    var types = [];
  
    module.exports = _globals['default'].registerIfNotExists('registry', {
      get: function get(id) {
        return (0, _hasOwn['default'])(definitions, id) && definitions[id];
      },
      set: function set(id, opts) {
        if (this.get(id)) {
          throw new Error('A Skate component with the name of "' + id + '" already exists.');
        }
  
        var type = opts.type || _typeElement2['default'];
        var typeIndex = types.indexOf(type);
  
        if (typeIndex === -1) {
          typeIndex = types.length;
          types.push(type);
          map[typeIndex] = {};
        }
  
        definitions[id] = opts;
        map[typeIndex][id] = opts;
  
        return this;
      },
      find: function find(elem) {
        var filtered = [];
        var typesLength = types.length;
  
        for (var a = 0; a < typesLength; a++) {
          filtered = filtered.concat(types[a].filter(elem, map[a]) || []);
        }
  
        return filtered;
      }
    });
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/api/create.js
(typeof window === 'undefined' ? global : window).__6d38ff9f8c6c6754c9427abd5af26582 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "object-assign": __4523f0e885099697c6f7fc461bcd2ec3,
    "../global/registry": __a9e650e83f339871227a9137a14f1172,
    "object-assign": __4523f0e885099697c6f7fc461bcd2ec3,
    "../global/registry": __a9e650e83f339871227a9137a14f1172
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__6d38ff9f8c6c6754c9427abd5af26582");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module', 'object-assign', '../global/registry'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module, __4523f0e885099697c6f7fc461bcd2ec3, __a9e650e83f339871227a9137a14f1172);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod, global.assign, global.registry);
      global.create = mod.exports;
    }
  })(this, function (exports, module, _objectAssign, _globalRegistry) {
  
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
    var _assign = _interopRequireDefault(_objectAssign);
  
    var _registry = _interopRequireDefault(_globalRegistry);
  
    module.exports = function (name, properties) {
      var trimmedName = name.trim();
      var constructor = _registry['default'].get(trimmedName);
      return constructor ? constructor(properties) : (0, _assign['default'])(document.createElement(trimmedName), properties);
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/util/element-contains.js
(typeof window === 'undefined' ? global : window).__cf9f6488d6fe2b659ae379835e53f099 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__cf9f6488d6fe2b659ae379835e53f099");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(["exports", "module"], factory);
    } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
      factory(exports, module);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod);
      global.elementContains = mod.exports;
    }
  })(this, function (exports, module) {
  
    var elementPrototype = window.HTMLElement.prototype;
    var elementPrototypeContains = elementPrototype.contains;
  
    module.exports = function (source, target) {
      // The document element does not have the contains method in IE.
      if (source === document && !source.contains) {
        return document.head.contains(target) || document.body.contains(target);
      }
  
      return source.contains ? source.contains(target) : elementPrototypeContains.call(source, target);
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/api/emit.js
(typeof window === 'undefined' ? global : window).__26395b468bf1726b9a48962eebcbfe91 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "../util/element-contains": __cf9f6488d6fe2b659ae379835e53f099,
    "../util/element-contains": __cf9f6488d6fe2b659ae379835e53f099
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__26395b468bf1726b9a48962eebcbfe91");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module', '../util/element-contains'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module, __cf9f6488d6fe2b659ae379835e53f099);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod, global.utilElementContains);
      global.emit = mod.exports;
    }
  })(this, function (exports, module, _utilElementContains) {
  
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
    var _utilElementContains2 = _interopRequireDefault(_utilElementContains);
  
    var CustomEvent = (function (CustomEvent) {
      if (CustomEvent) {
        try {
          new CustomEvent();
        } catch (e) {
          return undefined;
        }
      }
      return CustomEvent;
    })(window.CustomEvent);
  
    var hasBubbleOnDetachedElements = (function () {
      var parent = document.createElement('div');
      var child = document.createElement('div');
      var hasBubbleOnDetachedElements = false;
      parent.appendChild(child);
      parent.addEventListener('test', function () {
        return hasBubbleOnDetachedElements = true;
      });
      child.dispatchEvent(createCustomEvent('test', { bubbles: true }));
      return hasBubbleOnDetachedElements;
    })();
  
    function createCustomEvent(name) {
      var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  
      if (CustomEvent) {
        return new CustomEvent(name, opts);
      }
  
      var e = document.createEvent('CustomEvent');
      e.initCustomEvent(name, opts.bubbles, opts.cancelable, opts.detail);
      return e;
    }
  
    function createReadableStopPropagation(oldStopPropagation) {
      return function () {
        this.isPropagationStopped = true;
        oldStopPropagation.call(this);
      };
    }
  
    function simulateBubbling(elem, cEvent) {
      var didPreventDefault = undefined;
      var currentElem = elem;
      cEvent.stopPropagation = createReadableStopPropagation(cEvent.stopPropagation);
      Object.defineProperty(cEvent, 'target', { get: function get() {
          return elem;
        } });
      while (currentElem && !cEvent.isPropagationStopped) {
        cEvent.currentTarget = currentElem;
        if (currentElem.dispatchEvent(cEvent) === false) {
          didPreventDefault = false;
        }
        currentElem = currentElem.parentNode;
      }
      return didPreventDefault;
    }
  
    function emitOne(elem, name, opts) {
      var cEvent, shouldSimulateBubbling;
  
      /* jshint expr: true */
      opts.bubbles === undefined && (opts.bubbles = true);
      opts.cancelable === undefined && (opts.cancelable = true);
      cEvent = createCustomEvent(name, opts);
      shouldSimulateBubbling = opts.bubbles && !hasBubbleOnDetachedElements && !(0, _utilElementContains2['default'])(document, elem);
  
      return shouldSimulateBubbling ? simulateBubbling(elem, cEvent) : elem.dispatchEvent(cEvent);
    }
  
    module.exports = function (elem, name) {
      var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
  
      var names = typeof name === 'string' ? name.split(' ') : name;
      return names.reduce(function (prev, curr) {
        if (emitOne(elem, curr, opts) === false) {
          prev.push(curr);
        }
        return prev;
      }, []);
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/util/ignored.js
(typeof window === 'undefined' ? global : window).__105049eb7ce38f4607cc9e35f8d7118e = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__105049eb7ce38f4607cc9e35f8d7118e");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod);
      global.ignored = mod.exports;
    }
  })(this, function (exports, module) {
  
    module.exports = function (element) {
      var attrs = element.attributes;
      return attrs && !!attrs['data-skate-ignore'];
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/util/walk-tree.js
(typeof window === 'undefined' ? global : window).__f77a0a79d3de64b41b8111822a02ac8c = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "./ignored": __105049eb7ce38f4607cc9e35f8d7118e,
    "./ignored": __105049eb7ce38f4607cc9e35f8d7118e
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__f77a0a79d3de64b41b8111822a02ac8c");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module', './ignored'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module, __105049eb7ce38f4607cc9e35f8d7118e);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod, global.ignored);
      global.walkTree = mod.exports;
    }
  })(this, function (exports, module, _ignored) {
  
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
    var _ignored2 = _interopRequireDefault(_ignored);
  
    var Node = window.Node;
  
    function walk(elem, fn) {
      if (elem.nodeType !== Node.ELEMENT_NODE || (0, _ignored2['default'])(elem)) {
        return;
      }
  
      var chren = elem.childNodes;
      var child = chren && chren[0];
  
      fn(elem);
      while (child) {
        walk(child, fn);
        child = child.nextSibling;
      }
    }
  
    module.exports = function (elems, fn) {
      if (!elems) {
        return;
      }
  
      if (elems instanceof Node) {
        elems = [elems];
      }
  
      for (var a = 0; a < elems.length; a++) {
        walk(elems[a], fn);
      }
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/api/init.js
(typeof window === 'undefined' ? global : window).__12a6504516555e4a49247e030b9cc17f = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "../util/element-contains": __cf9f6488d6fe2b659ae379835e53f099,
    "../global/registry": __a9e650e83f339871227a9137a14f1172,
    "../util/walk-tree": __f77a0a79d3de64b41b8111822a02ac8c,
    "../util/element-contains": __cf9f6488d6fe2b659ae379835e53f099,
    "../global/registry": __a9e650e83f339871227a9137a14f1172,
    "../util/walk-tree": __f77a0a79d3de64b41b8111822a02ac8c
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__12a6504516555e4a49247e030b9cc17f");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module', '../util/element-contains', '../global/registry', '../util/walk-tree'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module, __cf9f6488d6fe2b659ae379835e53f099, __a9e650e83f339871227a9137a14f1172, __f77a0a79d3de64b41b8111822a02ac8c);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod, global.elementContains, global.registry, global.walkTree);
      global.init = mod.exports;
    }
  })(this, function (exports, module, _utilElementContains, _globalRegistry, _utilWalkTree) {
  
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
    var _elementContains = _interopRequireDefault(_utilElementContains);
  
    var _registry = _interopRequireDefault(_globalRegistry);
  
    var _walkTree = _interopRequireDefault(_utilWalkTree);
  
    module.exports = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
  
      args.forEach(function (arg) {
        var isInDom = (0, _elementContains['default'])(document, arg);
        (0, _walkTree['default'])(arg, function (descendant) {
          var components = _registry['default'].find(descendant);
          var componentsLength = components.length;
  
          for (var a = 0; a < componentsLength; a++) {
            components[a].prototype.createdCallback.call(descendant);
          }
  
          for (var a = 0; a < componentsLength; a++) {
            if (isInDom) {
              components[a].prototype.attachedCallback.call(descendant);
            }
          }
        });
      });
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/api/fragment.js
(typeof window === 'undefined' ? global : window).__b80a5b0c8def940440cf1003a51e0896 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "./init": __12a6504516555e4a49247e030b9cc17f,
    "./init": __12a6504516555e4a49247e030b9cc17f
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__b80a5b0c8def940440cf1003a51e0896");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module', './init'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module, __12a6504516555e4a49247e030b9cc17f);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod, global.init);
      global.fragment = mod.exports;
    }
  })(this, function (exports, module, _init) {
  
    module.exports = fragment;
  
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
    var _init2 = _interopRequireDefault(_init);
  
    var Node = window.Node;
    var NodeList = window.NodeList;
  
    var slice = Array.prototype.slice;
    var specialMap = {
      caption: 'table',
      dd: 'dl',
      dt: 'dl',
      li: 'ul',
      tbody: 'table',
      td: 'tr',
      thead: 'table',
      tr: 'tbody'
    };
  
    function resolveParent(tag, html) {
      var container = document.createElement('div');
      var levels = 0;
      var parentTag = specialMap[tag];
  
      while (parentTag) {
        html = '<' + parentTag + '>' + html + '</' + parentTag + '>';
        ++levels;
        parentTag = specialMap[parentTag];
      }
  
      container.innerHTML = html;
  
      var parent = container;
      for (var a = 0; a < levels; a++) {
        parent = parent.firstElementChild;
      }
      return parent;
    }
  
    function resolveTag(html) {
      var tag = html.match(/^<([^\s>]+)/);
      return tag && tag[1];
    }
  
    function resolveHtml(html) {
      return resolveParent(resolveTag(html), html);
    }
  
    function fragment() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
  
      return args.reduce(function (frag, node) {
        if (typeof node === 'string') {
          node = fragment.apply(null, slice.call(resolveHtml(node).childNodes));
        } else if (node instanceof NodeList || Array.isArray(node)) {
          node = fragment.apply(null, slice.call(node));
        } else if (node instanceof Node) {
          (0, _init2['default'])(node);
        }
  
        if (node) {
          frag.appendChild(node);
        }
  
        return frag;
      }, document.createDocumentFragment());
    }
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/api/properties/boolean.js
(typeof window === 'undefined' ? global : window).__52e99c8621ea6d8ce7f9ae8a541de22f = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__52e99c8621ea6d8ce7f9ae8a541de22f");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod);
      global.boolean = mod.exports;
    }
  })(this, function (exports, module) {
  
    module.exports = {
      coerce: function coerce(value) {
        return !!value;
      },
      'default': false,
      deserialize: function deserialize(value) {
        return !(value === null);
      },
      serialize: function serialize(value) {
        return value ? '' : undefined;
      }
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/util/data.js
(typeof window === 'undefined' ? global : window).__51b0d085f49d51d53774d7f5b0c57ff9 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__51b0d085f49d51d53774d7f5b0c57ff9");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod);
      global.data = mod.exports;
    }
  })(this, function (exports, module) {
  
    module.exports = function (element) {
      var namespace = arguments.length <= 1 || arguments[1] === undefined ? '' : arguments[1];
  
      var data = element.__SKATE_DATA || (element.__SKATE_DATA = {});
      return namespace && (data[namespace] || (data[namespace] = {})) || data;
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/api/properties/content.js
(typeof window === 'undefined' ? global : window).__7ffb3e9e3a69b601d863b246feb95e64 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "object-assign": __4523f0e885099697c6f7fc461bcd2ec3,
    "../../util/data": __51b0d085f49d51d53774d7f5b0c57ff9,
    "object-assign": __4523f0e885099697c6f7fc461bcd2ec3,
    "../../util/data": __51b0d085f49d51d53774d7f5b0c57ff9
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__7ffb3e9e3a69b601d863b246feb95e64");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module', 'object-assign', '../../util/data'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module, __4523f0e885099697c6f7fc461bcd2ec3, __51b0d085f49d51d53774d7f5b0c57ff9);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod, global.assign, global.data);
      global.content = mod.exports;
    }
  })(this, function (exports, module, _objectAssign, _utilData) {
  
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
    function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  
    var _assign = _interopRequireDefault(_objectAssign);
  
    var _data = _interopRequireDefault(_utilData);
  
    var MutationObserver = window.MutationObserver;
  
    if (!MutationObserver) {
      throw new Error('Usage of the content property requires MutationObserver support.');
    }
  
    // Calls the `change` callback if it's defined.
    function change(el, cb) {
      cb = cb || function () {};
      return function (mo) {
        cb(el, mo.addedNodes || [], mo.removedNodes || []);
      };
    }
  
    // Creates a fake node for usage before the element is rendered so that the way
    // of accessing the value of the content node does not change at any point
    // during the rendering process. This is basically syntanctic sugar for not
    // having to do something like:
    //
    //     elem.content && elem.content.value
    //
    // In your `render` function. Instead, you can just do:
    //
    //     elem.content.value
    //
    // This is to get around having to know about the implementation details which
    // vary depending on if we're in native or polyfilled custom element land.
    function createFakeNode(name) {
      return Object.defineProperties({}, _defineProperty({}, name, {
        get: function get() {
          return null;
        },
        configurable: true,
        enumerable: true
      }));
    }
  
    // Creates a real node so that the renering process can attach nodes to it. A
    // property is added
    function createRealNode(elem, name, selector) {
      var node = selector ? elem.querySelector(selector) : document.createElement('div');
      Object.defineProperty(node, name, {
        get: function get() {
          var ch = this.childNodes;
          return ch && ch.length ? [].slice.call(ch) : null;
        }
      });
      return node;
    }
  
    // Sets initial content for the specified node.
    function init(node, nodes) {
      for (var a = 0; a < nodes.length; a++) {
        node.appendChild(nodes[a]);
      }
    }
  
    module.exports = function () {
      var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  
      opts = (0, _assign['default'])({
        accessor: 'nodes',
        change: function change() {},
        selector: ''
      }, opts);
      return {
        created: function created(el) {
          var info = (0, _data['default'])(el);
          info.contentNode = createFakeNode(opts.accessor);
          info.initialState = [].slice.call(el.childNodes);
        },
        get: function get(el) {
          return (0, _data['default'])(el).contentNode;
        },
        ready: function ready(elem) {
          var info = (0, _data['default'])(elem);
          var observer = new MutationObserver(change(elem, opts.change));
          info.contentNode = createRealNode(elem, opts.accessor, opts.selector);
          init(info.contentNode, info.initialState);
          observer.observe(info.contentNode, { childList: true });
        }
      };
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/api/properties/number.js
(typeof window === 'undefined' ? global : window).__4b267449aa9fd10e83fd7950c8ece7e4 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__4b267449aa9fd10e83fd7950c8ece7e4");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod);
      global.number = mod.exports;
    }
  })(this, function (exports, module) {
  
    module.exports = {
      coerce: function coerce(value) {
        return typeof value === 'undefined' ? value : Number(value);
      },
      deserialize: function deserialize(value) {
        return value === null ? undefined : value;
      },
      serialize: function serialize(value) {
        return typeof value === 'undefined' ? value : Number(value);
      }
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/api/properties/string.js
(typeof window === 'undefined' ? global : window).__da6046283709e8c66ec32141278ddf2d = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__da6046283709e8c66ec32141278ddf2d");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod);
      global.string = mod.exports;
    }
  })(this, function (exports, module) {
  
    module.exports = {
      coerce: function coerce(value) {
        return typeof value === 'undefined' ? value : String(value);
      },
      deserialize: function deserialize(value) {
        return value === null ? undefined : value;
      },
      serialize: function serialize(value) {
        return typeof value === 'undefined' ? value : String(value);
      }
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/api/properties/index.js
(typeof window === 'undefined' ? global : window).__86f0af88f61c890284128013613c8df0 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "object-assign": __4523f0e885099697c6f7fc461bcd2ec3,
    "./boolean": __52e99c8621ea6d8ce7f9ae8a541de22f,
    "./content": __7ffb3e9e3a69b601d863b246feb95e64,
    "./number": __4b267449aa9fd10e83fd7950c8ece7e4,
    "./string": __da6046283709e8c66ec32141278ddf2d,
    "object-assign": __4523f0e885099697c6f7fc461bcd2ec3,
    "./boolean": __52e99c8621ea6d8ce7f9ae8a541de22f,
    "./content": __7ffb3e9e3a69b601d863b246feb95e64,
    "./number": __4b267449aa9fd10e83fd7950c8ece7e4,
    "./string": __da6046283709e8c66ec32141278ddf2d
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__86f0af88f61c890284128013613c8df0");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module', 'object-assign', './boolean', './content', './number', './string'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module, __4523f0e885099697c6f7fc461bcd2ec3, __52e99c8621ea6d8ce7f9ae8a541de22f, __7ffb3e9e3a69b601d863b246feb95e64, __4b267449aa9fd10e83fd7950c8ece7e4, __da6046283709e8c66ec32141278ddf2d);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod, global.assign, global.boolean, global.content, global.number, global.string);
      global.index = mod.exports;
    }
  })(this, function (exports, module, _objectAssign, _boolean, _content, _number, _string) {
  
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
    var _assign = _interopRequireDefault(_objectAssign);
  
    var _boolean2 = _interopRequireDefault(_boolean);
  
    var _content2 = _interopRequireDefault(_content);
  
    var _number2 = _interopRequireDefault(_number);
  
    var _string2 = _interopRequireDefault(_string);
  
    function prop(def) {
      return function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
  
        args.unshift({}, def);
        return _assign['default'].apply(null, args);
      };
    }
  
    module.exports = {
      boolean: prop(_boolean2['default']),
      content: _content2['default'],
      number: prop(_number2['default']),
      string: prop(_string2['default'])
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/api/ready.js
(typeof window === 'undefined' ? global : window).__bd2dcde1dd4414627080bac1e935ada6 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "../util/data": __51b0d085f49d51d53774d7f5b0c57ff9,
    "../global/registry": __a9e650e83f339871227a9137a14f1172,
    "../util/data": __51b0d085f49d51d53774d7f5b0c57ff9,
    "../global/registry": __a9e650e83f339871227a9137a14f1172
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__bd2dcde1dd4414627080bac1e935ada6");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module', '../util/data', '../global/registry'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module, __51b0d085f49d51d53774d7f5b0c57ff9, __a9e650e83f339871227a9137a14f1172);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod, global.data, global.registry);
      global.ready = mod.exports;
    }
  })(this, function (exports, module, _utilData, _globalRegistry) {
  
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
    var _data = _interopRequireDefault(_utilData);
  
    var _registry = _interopRequireDefault(_globalRegistry);
  
    function ready(element) {
      var components = _registry['default'].find(element);
      var componentsLength = components.length;
      for (var a = 0; a < componentsLength; a++) {
        if (!(0, _data['default'])(element, 'lifecycle/' + components[a].id).created) {
          return false;
        }
      }
      return true;
    }
  
    module.exports = function (elements, callback) {
      var collection = elements.length === undefined ? [elements] : elements;
      var collectionLength = collection.length;
      var readyCount = 0;
  
      function callbackIfReady() {
        if (readyCount === collectionLength) {
          callback(elements);
        }
      }
  
      for (var a = 0; a < collectionLength; a++) {
        var elem = collection[a];
  
        if (ready(elem)) {
          ++readyCount;
        } else {
          // skate.ready is only fired if the element has not been initialised yet.
          elem.addEventListener('skate.ready', function () {
            ++readyCount;
            callbackIfReady();
          });
        }
      }
  
      // If the elements are all ready by this time that means nothing was ever
      // bound to skate.ready above.
      callbackIfReady();
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/api/render/html.js
(typeof window === 'undefined' ? global : window).__0994223835379dce87b98ddd4edbda53 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "../fragment": __b80a5b0c8def940440cf1003a51e0896,
    "../fragment": __b80a5b0c8def940440cf1003a51e0896
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__0994223835379dce87b98ddd4edbda53");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module', '../fragment'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module, __b80a5b0c8def940440cf1003a51e0896);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod, global.fragment);
      global.html = mod.exports;
    }
  })(this, function (exports, module, _fragment) {
  
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
    var _fragment2 = _interopRequireDefault(_fragment);
  
    module.exports = function (render) {
      return function (elem) {
        while (elem.childNodes.length) {
          elem.removeChild(elem.childNodes[0]);
        }
        elem.appendChild((0, _fragment2['default'])(render(elem)));
      };
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/api/render/index.js
(typeof window === 'undefined' ? global : window).__2518147fe196c24e2c846a7743052198 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "./html": __0994223835379dce87b98ddd4edbda53,
    "../../global/registry": __a9e650e83f339871227a9137a14f1172,
    "./html": __0994223835379dce87b98ddd4edbda53,
    "../../global/registry": __a9e650e83f339871227a9137a14f1172
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__2518147fe196c24e2c846a7743052198");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module', './html', '../../global/registry'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module, __0994223835379dce87b98ddd4edbda53, __a9e650e83f339871227a9137a14f1172);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod, global.html, global.registry);
      global.index = mod.exports;
    }
  })(this, function (exports, module, _html, _globalRegistry) {
  
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
    var _html2 = _interopRequireDefault(_html);
  
    var _registry = _interopRequireDefault(_globalRegistry);
  
    function render(elem) {
      _registry['default'].find(elem).forEach(function (component) {
        return component.render && component.render(elem);
      });
    }
  
    render.html = _html2['default'];
  
    module.exports = render;
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/api/version.js
(typeof window === 'undefined' ? global : window).__143b1d8d935e14ca96681df2478c7fcc = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__143b1d8d935e14ca96681df2478c7fcc");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod);
      global.version = mod.exports;
    }
  })(this, function (exports, module) {
  
    module.exports = '0.15.0';
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/util/assign-safe.js
(typeof window === 'undefined' ? global : window).__b6301b610391f66c7a5ef87772fad9fd = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__b6301b610391f66c7a5ef87772fad9fd");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(["exports", "module"], factory);
    } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
      factory(exports, module);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod);
      global.assignSafe = mod.exports;
    }
  })(this, function (exports, module) {
  
    module.exports = function (child) {
      for (var _len = arguments.length, parents = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        parents[_key - 1] = arguments[_key];
      }
  
      parents.forEach(function (parent) {
        Object.getOwnPropertyNames(parent || {}).forEach(function (name) {
          var childDesc = Object.getOwnPropertyDescriptor(child, name);
          if (!childDesc || childDesc.configurable) {
            Object.defineProperty(child, name, Object.getOwnPropertyDescriptor(parent, name));
          }
        });
      });
      return child;
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/lifecycle/attached.js
(typeof window === 'undefined' ? global : window).__0576f6be609d9fa8bbbe97fc557c3bc0 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "../util/data": __51b0d085f49d51d53774d7f5b0c57ff9,
    "../util/data": __51b0d085f49d51d53774d7f5b0c57ff9
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__0576f6be609d9fa8bbbe97fc557c3bc0");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module', '../util/data'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module, __51b0d085f49d51d53774d7f5b0c57ff9);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod, global.data);
      global.attached = mod.exports;
    }
  })(this, function (exports, module, _utilData) {
  
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
    var _data = _interopRequireDefault(_utilData);
  
    module.exports = function (opts) {
      return function () {
        var info = (0, _data['default'])(this, 'lifecycle/' + opts.id);
        if (info.attached) return;
        info.attached = true;
        info.detached = false;
        opts.attached(this);
      };
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/lifecycle/attribute.js
(typeof window === 'undefined' ? global : window).__28c85582862433b07e8ef5c02865ff93 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__28c85582862433b07e8ef5c02865ff93");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod);
      global.attribute = mod.exports;
    }
  })(this, function (exports, module) {
  
    var noop = function noop() {};
  
    module.exports = function (opts) {
      var callback = opts.attribute;
  
      if (typeof callback !== 'function') {
        return noop;
      }
  
      return function (name, oldValue, newValue) {
        callback(this, {
          name: name,
          newValue: newValue === null ? undefined : newValue,
          oldValue: oldValue === null ? undefined : oldValue
        });
      };
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/util/matches-selector.js
(typeof window === 'undefined' ? global : window).__b51ae7515ca47accfae9c47f63f7cbc2 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__b51ae7515ca47accfae9c47f63f7cbc2");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod);
      global.matchesSelector = mod.exports;
    }
  })(this, function (exports, module) {
  
    var elProto = window.HTMLElement.prototype;
    var nativeMatchesSelector = elProto.matches || elProto.msMatchesSelector || elProto.webkitMatchesSelector || elProto.mozMatchesSelector || elProto.oMatchesSelector;
  
    // Only IE9 has this msMatchesSelector bug, but best to detect it.
    var hasNativeMatchesSelectorDetattachedBug = !nativeMatchesSelector.call(document.createElement('div'), 'div');
  
    module.exports = function (element, selector) {
      if (hasNativeMatchesSelectorDetattachedBug) {
        var clone = element.cloneNode();
        document.createElement('div').appendChild(clone);
        return nativeMatchesSelector.call(clone, selector);
      }
      return nativeMatchesSelector.call(element, selector);
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/lifecycle/events.js
(typeof window === 'undefined' ? global : window).__b6f754af96feb1a394e8e2265ae53e94 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "../util/matches-selector": __b51ae7515ca47accfae9c47f63f7cbc2,
    "../util/matches-selector": __b51ae7515ca47accfae9c47f63f7cbc2
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__b6f754af96feb1a394e8e2265ae53e94");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module', '../util/matches-selector'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module, __b51ae7515ca47accfae9c47f63f7cbc2);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod, global.matches);
      global.events = mod.exports;
    }
  })(this, function (exports, module, _utilMatchesSelector) {
  
    module.exports = events;
  
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
    var _matches = _interopRequireDefault(_utilMatchesSelector);
  
    function readonly(obj, prop, val) {
      Object.defineProperty(obj, prop, {
        configurable: true,
        get: function get() {
          return val;
        }
      });
    }
  
    function parseEvent(e) {
      var parts = e.split(' ');
      var name = parts.shift();
      var selector = parts.join(' ').trim();
      return {
        name: name,
        selector: selector
      };
    }
  
    function makeDelegateHandler(elem, handler, parsed) {
      return function (e) {
        var current = e.target;
        var selector = parsed.selector;
        while (current && current !== elem.parentNode) {
          if ((0, _matches['default'])(current, selector)) {
            readonly(e, 'currentTarget', current);
            readonly(e, 'delegateTarget', elem);
            return handler(e);
          }
          current = current.parentNode;
        }
      };
    }
  
    function makeNormalHandler(elem, handler) {
      return function (e) {
        readonly(e, 'delegateTarget', elem);
        handler(e);
      };
    }
  
    function bindEvent(elem, event, handler) {
      var parsed = parseEvent(event);
      var name = parsed.name;
      var selector = parsed.selector;
  
      var capture = selector && (name === 'blur' || name === 'focus');
      handler = selector ? makeDelegateHandler(elem, handler, parsed) : makeNormalHandler(elem, handler);
      elem.addEventListener(name, handler, capture);
    }
  
    function events(opts) {
      var events = opts.events;
      return function (elem) {
        Object.keys(events).forEach(function (name) {
          bindEvent(elem, name, events[name].bind(elem));
        });
      };
    }
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/lifecycle/patch-attribute-methods.js
(typeof window === 'undefined' ? global : window).__039475e3cc60a840f011f44856237891 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__039475e3cc60a840f011f44856237891");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(["exports", "module"], factory);
    } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
      factory(exports, module);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod);
      global.patchAttributeMethods = mod.exports;
    }
  })(this, function (exports, module) {
  
    module.exports = patchAttributeMethods;
  
    function patchAttributeMethods(elem) {
      var removeAttribute = elem.removeAttribute;
      var setAttribute = elem.setAttribute;
  
      elem.removeAttribute = function (name) {
        var oldValue = this.getAttribute(name);
        removeAttribute.call(elem, name);
        elem.attributeChangedCallback(name, oldValue, null);
      };
  
      elem.setAttribute = function (name, newValue) {
        var oldValue = this.getAttribute(name);
        setAttribute.call(elem, name, newValue);
        elem.attributeChangedCallback(name, oldValue, String(newValue));
      };
    }
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/util/dash-case.js
(typeof window === 'undefined' ? global : window).__f763f9d07ddc3d8fea08a3791eabf921 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__f763f9d07ddc3d8fea08a3791eabf921");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod);
      global.dashCase = mod.exports;
    }
  })(this, function (exports, module) {
  
    module.exports = function (str) {
      return str.split(/([A-Z])/).reduce(function (one, two, idx) {
        var dash = !one || idx % 2 === 0 ? '' : '-';
        return '' + one + dash + two.toLowerCase();
      });
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/lifecycle/properties-init.js
(typeof window === 'undefined' ? global : window).__7674b9cc4e4c27b85d053c6a59d3b9c3 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "object-assign": __4523f0e885099697c6f7fc461bcd2ec3,
    "../util/dash-case": __f763f9d07ddc3d8fea08a3791eabf921,
    "../util/data": __51b0d085f49d51d53774d7f5b0c57ff9,
    "object-assign": __4523f0e885099697c6f7fc461bcd2ec3,
    "../util/dash-case": __f763f9d07ddc3d8fea08a3791eabf921,
    "../util/data": __51b0d085f49d51d53774d7f5b0c57ff9
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__7674b9cc4e4c27b85d053c6a59d3b9c3");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module', 'object-assign', '../util/dash-case', '../util/data'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module, __4523f0e885099697c6f7fc461bcd2ec3, __f763f9d07ddc3d8fea08a3791eabf921, __51b0d085f49d51d53774d7f5b0c57ff9);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod, global.assign, global.dashCase, global.data);
      global.propertiesInit = mod.exports;
    }
  })(this, function (exports, module, _objectAssign, _utilDashCase, _utilData) {
  
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
    var _assign = _interopRequireDefault(_objectAssign);
  
    var _dashCase = _interopRequireDefault(_utilDashCase);
  
    var _data = _interopRequireDefault(_utilData);
  
    // TODO Split apart createNativePropertyDefinition function.
  
    function getLinkedAttribute(name, attr) {
      return attr === true ? (0, _dashCase['default'])(name) : attr;
    }
  
    function createNativePropertyDefinition(name, opts) {
      var prop = {
        configurable: true,
        enumerable: true
      };
  
      // Custom accessor lifecycle functions.
  
      prop.created = function (elem, initialValue) {
        var info = (0, _data['default'])(elem, 'api/property/' + name);
        info.linkedAttribute = getLinkedAttribute(name, opts.attribute);
        info.removeAttribute = elem.removeAttribute;
        info.setAttribute = elem.setAttribute;
        info.updatingProperty = false;
  
        if (typeof opts['default'] === 'function') {
          info.defaultValue = opts['default'](elem);
        } else if (opts['default'] !== undefined) {
          info.defaultValue = opts['default'];
        }
  
        // TODO Refactor
        if (info.linkedAttribute) {
          if (!info.attributeMap) {
            info.attributeMap = {};
  
            elem.removeAttribute = function (attrName) {
              info.updatingAttribute = true;
              info.removeAttribute.call(this, attrName);
  
              if (attrName in info.attributeMap) {
                var propertyName = info.attributeMap[attrName];
                elem[propertyName] = undefined;
              }
  
              info.updatingAttribute = false;
            };
  
            elem.setAttribute = function (attrName, attrValue) {
              info.updatingAttribute = true;
              info.setAttribute.call(this, attrName, attrValue);
  
              if (attrName in info.attributeMap) {
                var propertyName = info.attributeMap[attrName];
                attrValue = String(attrValue);
                elem[propertyName] = opts.deserialize(attrValue);
              }
  
              info.updatingAttribute = false;
            };
          }
  
          info.attributeMap[info.linkedAttribute] = name;
        }
  
        if (initialValue === undefined) {
          if (info.linkedAttribute && elem.hasAttribute(info.linkedAttribute)) {
            var attributeValue = elem.getAttribute(info.linkedAttribute);
            initialValue = opts.deserialize(attributeValue);
          } else {
            initialValue = info.defaultValue;
          }
        }
  
        info.internalValue = initialValue;
  
        if (typeof opts.created === 'function') {
          opts.created(elem, {
            name: name,
            value: initialValue
          });
        }
      };
  
      prop.ready = function (elem, initialValue) {
        elem[name] = initialValue;
        if (typeof opts.ready === 'function') {
          opts.ready(elem, {
            name: name,
            value: initialValue
          });
        }
      };
  
      // Native accessor functions.
  
      prop.get = function () {
        var info = (0, _data['default'])(this, 'api/property/' + name);
  
        if (opts.get) {
          return opts.get(this);
        }
  
        return info.internalValue;
      };
  
      prop.set = function (newValue) {
        var info = (0, _data['default'])(this, 'api/property/' + name);
        var oldValue = undefined;
  
        if (info.updatingProperty) {
          return;
        }
  
        info.updatingProperty = true;
  
        if (info.hasBeenSetOnce) {
          oldValue = this[name];
        } else {
          oldValue = undefined;
          info.hasBeenSetOnce = true;
        }
  
        if (typeof opts.coerce === 'function') {
          newValue = opts.coerce(newValue);
        }
  
        if (!opts.get) {
          info.internalValue = typeof newValue === 'undefined' ? info.defaultValue : newValue;
        }
  
        if (info.linkedAttribute && !info.updatingAttribute) {
          var serializedValue = opts.serialize(newValue);
          if (serializedValue === undefined) {
            info.removeAttribute.call(this, info.linkedAttribute);
          } else {
            info.setAttribute.call(this, info.linkedAttribute, serializedValue);
          }
        }
  
        var changeData = {
          name: name,
          newValue: newValue,
          oldValue: oldValue
        };
  
        if (typeof opts.set === 'function') {
          opts.set(this, changeData);
        }
  
        info.updatingProperty = false;
      };
  
      return prop;
    }
  
    module.exports = function (opts) {
      opts = opts || {};
  
      if (typeof opts === 'function') {
        opts = { coerce: opts };
      }
  
      return function (name) {
        return createNativePropertyDefinition(name, (0, _assign['default'])({
          deserialize: function deserialize(value) {
            return value;
          },
          serialize: function serialize(value) {
            return value;
          }
        }, opts));
      };
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/lifecycle/properties-created.js
(typeof window === 'undefined' ? global : window).__079ada2a8a23ede8b9b0e453e37a3a9f = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__079ada2a8a23ede8b9b0e453e37a3a9f");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(["exports", "module"], factory);
    } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
      factory(exports, module);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod);
      global.propertiesCreated = mod.exports;
    }
  })(this, function (exports, module) {
  
    module.exports = propertiesApply;
  
    function propertiesApply(elem, properties) {
      Object.keys(properties).forEach(function (name) {
        var prop = properties[name];
  
        // https://bugs.webkit.org/show_bug.cgi?id=49739
        //
        // When Webkit fixes that bug so that native property we can move defining
        // the property to the prototype and away from having to do if for every
        // instance since all other browsers support accessing native property
        // getters / setters.
        Object.defineProperty(elem, name, prop);
  
        // This will still be needed to do any setup for the property if it needs
        // any information from the element.
        //
        // Once that bug is fixed, the initial value being passed as the second
        // argument to prop.created() can use the overridden property definition to
        // get the initial value.
        if (prop.created) {
          prop.created(elem, elem[name]);
        }
      });
    }
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/lifecycle/properties-ready.js
(typeof window === 'undefined' ? global : window).__ef6ca76482dc32831cd5045c095300bb = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__ef6ca76482dc32831cd5045c095300bb");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod);
      global.propertiesReady = mod.exports;
    }
  })(this, function (exports, module) {
  
    module.exports = propertiesApply;
  
    function propertiesApply(elem, properties) {
      Object.keys(properties).forEach(function (name) {
        var prop = properties[name];
        if (typeof prop.ready === 'function') {
          prop.ready(elem, elem[name]);
        }
      });
    }
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/util/protos.js
(typeof window === 'undefined' ? global : window).__120c8685b04a048802338807ba772d12 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__120c8685b04a048802338807ba772d12");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(["exports", "module"], factory);
    } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
      factory(exports, module);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod);
      global.protos = mod.exports;
    }
  })(this, function (exports, module) {
  
    module.exports = function (proto) {
      var chains = [proto];
      /* jshint boss: true */
      while (proto = Object.getPrototypeOf(proto)) {
        chains.push(proto);
      }
      chains.reverse();
      return chains;
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/lifecycle/prototype.js
(typeof window === 'undefined' ? global : window).__b3bd29a634ca3d39cd090d33a531c5fa = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "../util/assign-safe": __b6301b610391f66c7a5ef87772fad9fd,
    "../util/protos": __120c8685b04a048802338807ba772d12,
    "../util/assign-safe": __b6301b610391f66c7a5ef87772fad9fd,
    "../util/protos": __120c8685b04a048802338807ba772d12
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__b3bd29a634ca3d39cd090d33a531c5fa");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module', '../util/assign-safe', '../util/protos'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module, __b6301b610391f66c7a5ef87772fad9fd, __120c8685b04a048802338807ba772d12);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod, global.assignSafe, global.protos);
      global.prototype = mod.exports;
    }
  })(this, function (exports, module, _utilAssignSafe, _utilProtos) {
  
    module.exports = prototype;
  
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
    var _assignSafe = _interopRequireDefault(_utilAssignSafe);
  
    var _protos = _interopRequireDefault(_utilProtos);
  
    function prototype(opts) {
      var prototypes = (0, _protos['default'])(opts.prototype);
      return function (elem) {
        prototypes.forEach(function (proto) {
          if (!proto.isPrototypeOf(elem)) {
            (0, _assignSafe['default'])(elem, proto);
          }
        });
      };
    }
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/lifecycle/resolve.js
(typeof window === 'undefined' ? global : window).__7187798afda3f3afb7e6b7a393e55257 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__7187798afda3f3afb7e6b7a393e55257");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod);
      global.resolve = mod.exports;
    }
  })(this, function (exports, module) {
  
    module.exports = resolve;
  
    function resolve(elem, opts) {
      elem.removeAttribute(opts.unresolvedAttribute);
      elem.setAttribute(opts.resolvedAttribute, '');
    }
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/lifecycle/created.js
(typeof window === 'undefined' ? global : window).__7953aa19b8c05536a1438c4ec1867c3a = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "../util/data": __51b0d085f49d51d53774d7f5b0c57ff9,
    "../api/emit": __26395b468bf1726b9a48962eebcbfe91,
    "./events": __b6f754af96feb1a394e8e2265ae53e94,
    "./patch-attribute-methods": __039475e3cc60a840f011f44856237891,
    "./properties-init": __7674b9cc4e4c27b85d053c6a59d3b9c3,
    "./properties-created": __079ada2a8a23ede8b9b0e453e37a3a9f,
    "./properties-ready": __ef6ca76482dc32831cd5045c095300bb,
    "./prototype": __b3bd29a634ca3d39cd090d33a531c5fa,
    "./resolve": __7187798afda3f3afb7e6b7a393e55257,
    "../util/data": __51b0d085f49d51d53774d7f5b0c57ff9,
    "../api/emit": __26395b468bf1726b9a48962eebcbfe91,
    "./events": __b6f754af96feb1a394e8e2265ae53e94,
    "./patch-attribute-methods": __039475e3cc60a840f011f44856237891,
    "./properties-init": __7674b9cc4e4c27b85d053c6a59d3b9c3,
    "./properties-created": __079ada2a8a23ede8b9b0e453e37a3a9f,
    "./properties-ready": __ef6ca76482dc32831cd5045c095300bb,
    "./prototype": __b3bd29a634ca3d39cd090d33a531c5fa,
    "./resolve": __7187798afda3f3afb7e6b7a393e55257
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__7953aa19b8c05536a1438c4ec1867c3a");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module', '../util/data', '../api/emit', './events', './patch-attribute-methods', './properties-init', './properties-created', './properties-ready', './prototype', './resolve'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module, __51b0d085f49d51d53774d7f5b0c57ff9, __26395b468bf1726b9a48962eebcbfe91, __b6f754af96feb1a394e8e2265ae53e94, __039475e3cc60a840f011f44856237891, __7674b9cc4e4c27b85d053c6a59d3b9c3, __079ada2a8a23ede8b9b0e453e37a3a9f, __ef6ca76482dc32831cd5045c095300bb, __b3bd29a634ca3d39cd090d33a531c5fa, __7187798afda3f3afb7e6b7a393e55257);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod, global.data, global.emit, global.events, global.patchAttributeMethods, global.propertiesInit, global.propertiesCreated, global.propertiesReady, global.prototype, global.resolve);
      global.created = mod.exports;
    }
  })(this, function (exports, module, _utilData, _apiEmit, _events, _patchAttributeMethods, _propertiesInit, _propertiesCreated, _propertiesReady, _prototype, _resolve) {
  
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
    var _data = _interopRequireDefault(_utilData);
  
    var _emit = _interopRequireDefault(_apiEmit);
  
    var _events2 = _interopRequireDefault(_events);
  
    var _patchAttributeMethods2 = _interopRequireDefault(_patchAttributeMethods);
  
    var _propertiesInit2 = _interopRequireDefault(_propertiesInit);
  
    var _propertiesCreated2 = _interopRequireDefault(_propertiesCreated);
  
    var _propertiesReady2 = _interopRequireDefault(_propertiesReady);
  
    var _prototype2 = _interopRequireDefault(_prototype);
  
    var _resolve2 = _interopRequireDefault(_resolve);
  
    var readyEventName = 'skate.ready';
    var readyEventOptions = { bubbles: false, cancelable: false };
  
    // TODO Remove this when we no longer support the legacy definitions and only
    // support a superset of a native property definition.
    function ensurePropertyFunctions(opts) {
      var properties = opts.properties;
      var names = Object.keys(properties || {});
      return names.reduce(function (descriptors, descriptorName) {
        descriptors[descriptorName] = opts.properties[descriptorName];
        if (typeof descriptors[descriptorName] !== 'function') {
          descriptors[descriptorName] = (0, _propertiesInit2['default'])(descriptors[descriptorName]);
        }
        return descriptors;
      }, {});
    }
  
    function ensurePropertyDefinitions(elem, propertyFunctions) {
      return Object.keys(propertyFunctions || {}).reduce(function (descriptors, descriptorName) {
        descriptors[descriptorName] = propertyFunctions[descriptorName](descriptorName);
        return descriptors;
      }, {});
    }
  
    module.exports = function (opts) {
      var applyEvents = (0, _events2['default'])(opts);
      var applyPrototype = (0, _prototype2['default'])(opts);
      var propertyFunctions = ensurePropertyFunctions(opts);
  
      return function () {
        var info = (0, _data['default'])(this, 'lifecycle/' + opts.id);
        var native = opts.isNative;
        var resolved = this.hasAttribute('resolved');
  
        if (info.created) return;
        info.created = true;
        var propertyDefinitions = ensurePropertyDefinitions(this, propertyFunctions);
  
        native || opts.attribute && (0, _patchAttributeMethods2['default'])(this);
        native || opts.prototype && applyPrototype(this);
        opts.properties && (0, _propertiesCreated2['default'])(this, propertyDefinitions);
        opts.events && applyEvents(this);
        opts.created && opts.created(this);
        resolved || opts.render && opts.render(this);
        opts.properties && (0, _propertiesReady2['default'])(this, propertyDefinitions);
        opts.ready && opts.ready(this);
        (0, _emit['default'])(this, readyEventName, readyEventOptions);
        resolved || (0, _resolve2['default'])(this, opts);
      };
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/util/debounce.js
(typeof window === 'undefined' ? global : window).__33b51de21ccf6d17e780f79c8edee0a8 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__33b51de21ccf6d17e780f79c8edee0a8");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(["exports", "module"], factory);
    } else if (typeof exports !== "undefined" && typeof module !== "undefined") {
      factory(exports, module);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod);
      global.debounce = mod.exports;
    }
  })(this, function (exports, module) {
  
    module.exports = function (fn) {
      var called = false;
  
      return function () {
        var _this = this;
  
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
  
        if (!called) {
          called = true;
          setTimeout(function () {
            called = false;
            fn.apply(_this, args);
          }, 1);
        }
      };
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/defaults.js
(typeof window === 'undefined' ? global : window).__3f8af6030fc29927ad3a6275a637b1be = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "./type/element": __fd630abc4490eb9be70d1e585487527b,
    "./type/element": __fd630abc4490eb9be70d1e585487527b
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__3f8af6030fc29927ad3a6275a637b1be");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module', './type/element'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module, __fd630abc4490eb9be70d1e585487527b);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod, global.typeElement);
      global.defaults = mod.exports;
    }
  })(this, function (exports, module, _typeElement) {
  
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
    var _typeElement2 = _interopRequireDefault(_typeElement);
  
    module.exports = {
      // Called when the element is attached to the document.
      attached: function attached() {},
  
      // Attribute lifecycle callback or callbacks.
      attribute: function attribute() {},
  
      // Called when the element is created after all descendants have had it
      // called on them.
      created: function created() {},
  
      // Responsible for rendering stuff to the host element. This can do anything
      // you like.
      render: function render() {},
  
      // Called when the element is detached from the document.
      detached: function detached() {},
  
      // The events to manage the binding and unbinding of during the definition's
      // lifecycle.
      events: {},
  
      // Restricts a particular definition to binding explicitly to an element with
      // a tag name that matches the specified value.
      'extends': '',
  
      // The ID of the definition. This is automatically set in the `skate()`
      // function.
      id: '',
  
      // The special Skate properties to define.
      properties: {},
  
      // Properties and methods to add to each element.
      prototype: {},
  
      // The attribute name to add after calling the created() callback.
      resolvedAttribute: 'resolved',
  
      // Called after all lifecycle callbacks have been called.
      ready: function ready() {},
  
      // The type of bindings to allow.
      type: _typeElement2['default'],
  
      // The attribute name to remove after calling the created() callback.
      unresolvedAttribute: 'unresolved'
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/lifecycle/detached.js
(typeof window === 'undefined' ? global : window).__a67671e1bf4110211f48cdbefe03760e = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "../util/data": __51b0d085f49d51d53774d7f5b0c57ff9,
    "../util/data": __51b0d085f49d51d53774d7f5b0c57ff9
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__a67671e1bf4110211f48cdbefe03760e");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module', '../util/data'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module, __51b0d085f49d51d53774d7f5b0c57ff9);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod, global.data);
      global.detached = mod.exports;
    }
  })(this, function (exports, module, _utilData) {
  
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
    var _data = _interopRequireDefault(_utilData);
  
    module.exports = function (opts) {
      return function () {
        var info = (0, _data['default'])(this, 'lifecycle/' + opts.id);
        if (info.detached) return;
        info.detached = true;
        info.attached = false;
        opts.detached(this);
      };
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/util/get-closest-ignored-element.js
(typeof window === 'undefined' ? global : window).__25120d84471edb7132564fcfd02b88f4 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "./ignored": __105049eb7ce38f4607cc9e35f8d7118e,
    "./ignored": __105049eb7ce38f4607cc9e35f8d7118e
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__25120d84471edb7132564fcfd02b88f4");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module', './ignored'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module, __105049eb7ce38f4607cc9e35f8d7118e);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod, global.ignored);
      global.getClosestIgnoredElement = mod.exports;
    }
  })(this, function (exports, module, _ignored) {
  
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
    var _ignored2 = _interopRequireDefault(_ignored);
  
    var Element = window.Element;
  
    module.exports = function (element) {
      var parent = element;
      while (parent instanceof Element) {
        if ((0, _ignored2['default'])(parent)) {
          return parent;
        }
        parent = parent.parentNode;
      }
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/fix/ie/innerhtml.js
(typeof window === 'undefined' ? global : window).__f3db83fd58636bce89e20994c2d7c21c = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__f3db83fd58636bce89e20994c2d7c21c");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports'], factory);
    } else if (typeof exports !== 'undefined') {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports);
      global.innerhtml = mod.exports;
    }
  })(this, function (exports) {
  
    var isIeUntil10 = /MSIE/.test(navigator.userAgent);
    var isIe11 = /Trident/.test(navigator.userAgent);
    var isIe = isIeUntil10 || isIe11;
    var elementPrototype = window.HTMLElement.prototype;
  
    // ! This walkTree method differs from the implementation in ../../utils/walk-tree
    // It invokes the callback only for the children, not the passed node and the second parameter to the callback is the parent node
    function walkTree(node, cb) {
      var childNodes = node.childNodes;
  
      if (!childNodes) {
        return;
      }
  
      var childNodesLen = childNodes.length;
  
      for (var a = 0; a < childNodesLen; a++) {
        var childNode = childNodes[a];
        cb(childNode, node);
        walkTree(childNode, cb);
      }
    }
  
    function fixInnerHTML() {
      var originalInnerHTML = Object.getOwnPropertyDescriptor(elementPrototype, 'innerHTML');
  
      var get = function get() {
        return originalInnerHTML.get.call(this);
      };
      get._hasBeenEnhanced = true;
  
      // This redefines the innerHTML property so that we can ensure that events
      // are properly triggered.
      Object.defineProperty(elementPrototype, 'innerHTML', {
        get: get,
        set: function set(html) {
          walkTree(this, function (node, parentNode) {
            var mutationEvent = document.createEvent('MutationEvent');
            mutationEvent.initMutationEvent('DOMNodeRemoved', true, false, parentNode, null, null, null, null);
            node.dispatchEvent(mutationEvent);
          });
          originalInnerHTML.set.call(this, html);
        }
      });
    }
  
    if (isIe) {
      // IE 9-11
      var propertyDescriptor = Object.getOwnPropertyDescriptor(elementPrototype, 'innerHTML');
      var hasBeenEnhanced = !!propertyDescriptor && propertyDescriptor.get._hasBeenEnhanced;
  
      if (!hasBeenEnhanced) {
        if (isIe11) {
          // IE11's native MutationObserver needs some help as well :()
          window.MutationObserver = window.JsMutationObserver || window.MutationObserver;
        }
  
        fixInnerHTML();
      }
    }
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/global/document-observer.js
(typeof window === 'undefined' ? global : window).__aed4ceb562472f9d7972b27c0288556d = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "./vars": __73ae33dcdfcb43fe166f8989b789f480,
    "../util/get-closest-ignored-element": __25120d84471edb7132564fcfd02b88f4,
    "./registry": __a9e650e83f339871227a9137a14f1172,
    "../util/walk-tree": __f77a0a79d3de64b41b8111822a02ac8c,
    "../fix/ie/innerhtml": __f3db83fd58636bce89e20994c2d7c21c,
    "./vars": __73ae33dcdfcb43fe166f8989b789f480,
    "../util/get-closest-ignored-element": __25120d84471edb7132564fcfd02b88f4,
    "./registry": __a9e650e83f339871227a9137a14f1172,
    "../util/walk-tree": __f77a0a79d3de64b41b8111822a02ac8c,
    "../fix/ie/innerhtml": __f3db83fd58636bce89e20994c2d7c21c
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__aed4ceb562472f9d7972b27c0288556d");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module', './vars', '../util/get-closest-ignored-element', './registry', '../util/walk-tree', '../fix/ie/innerhtml'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module, __73ae33dcdfcb43fe166f8989b789f480, __25120d84471edb7132564fcfd02b88f4, __a9e650e83f339871227a9137a14f1172, __f77a0a79d3de64b41b8111822a02ac8c, __f3db83fd58636bce89e20994c2d7c21c);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod, global.globals, global.getClosestIgnoredElement, global.registry, global.walkTree, global.innerhtml);
      global.documentObserver = mod.exports;
    }
  })(this, function (exports, module, _vars, _utilGetClosestIgnoredElement, _registry, _utilWalkTree, _fixIeInnerhtml) {
  
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
    var _globals = _interopRequireDefault(_vars);
  
    var _getClosestIgnoredElement = _interopRequireDefault(_utilGetClosestIgnoredElement);
  
    var _registry2 = _interopRequireDefault(_registry);
  
    var _walkTree = _interopRequireDefault(_utilWalkTree);
  
    function triggerAddedNodes(addedNodes) {
      (0, _walkTree['default'])(addedNodes, function (element) {
        var components = _registry2['default'].find(element);
        var componentsLength = components.length;
  
        for (var a = 0; a < componentsLength; a++) {
          components[a].prototype.createdCallback.call(element);
        }
  
        for (var a = 0; a < componentsLength; a++) {
          components[a].prototype.attachedCallback.call(element);
        }
      });
    }
  
    function triggerRemovedNodes(removedNodes) {
      (0, _walkTree['default'])(removedNodes, function (element) {
        var components = _registry2['default'].find(element);
        var componentsLength = components.length;
  
        for (var a = 0; a < componentsLength; a++) {
          components[a].prototype.detachedCallback.call(element);
        }
      });
    }
  
    function documentObserverHandler(mutations) {
      var mutationsLength = mutations.length;
  
      for (var a = 0; a < mutationsLength; a++) {
        var addedNodes = mutations[a].addedNodes;
        var removedNodes = mutations[a].removedNodes;
  
        // Since siblings are batched together, we check the first node's parent
        // node to see if it is ignored. If it is then we don't process any added
        // nodes. This prevents having to check every node.
        if (addedNodes && addedNodes.length && !(0, _getClosestIgnoredElement['default'])(addedNodes[0].parentNode)) {
          triggerAddedNodes(addedNodes);
        }
  
        // We can't check batched nodes here because they won't have a parent node.
        if (removedNodes && removedNodes.length) {
          triggerRemovedNodes(removedNodes);
        }
      }
    }
  
    function createMutationObserver() {
      var MutationObserver = window.MutationObserver;
  
      if (!MutationObserver) {
        throw new Error('Mutation Observers are not supported by this browser. Skate requires them in order to polyfill the behaviour of Custom Elements. If you want to support this browser you should include a Mutation Observer polyfill before Skate.');
      }
      return new MutationObserver(documentObserverHandler);
    }
  
    function createDocumentObserver() {
      var observer = createMutationObserver();
      observer.observe(document, {
        childList: true,
        subtree: true
      });
      return observer;
    }
  
    module.exports = _globals['default'].registerIfNotExists('observer', {
      observer: undefined,
      register: function register() {
        if (!this.observer) {
          this.observer = createDocumentObserver();
        }
        return this;
      },
      unregister: function unregister() {
        if (this.observer) {
          this.observer.disconnect();
          this.observer = undefined;
        }
        return this;
      }
    });
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/support/custom-elements.js
(typeof window === 'undefined' ? global : window).__4b0cb9918ae5f06ecbfd46ccfe494339 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__4b0cb9918ae5f06ecbfd46ccfe494339");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod);
      global.customElements = mod.exports;
    }
  })(this, function (exports, module) {
  
    module.exports = function () {
      return typeof document.registerElement === 'function';
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/support/valid-custom-element.js
(typeof window === 'undefined' ? global : window).__8e56848e1efdf60558ed180689abec8b = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__8e56848e1efdf60558ed180689abec8b");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod);
      global.validCustomElement = mod.exports;
    }
  })(this, function (exports, module) {
  
    module.exports = function (name) {
      var reservedNames = ['annotation-xml', 'color-profile', 'font-face', 'font-face-src', 'font-face-uri', 'font-face-format', 'font-face-name', 'missing-glyph'];
  
      return name.indexOf('-') > 0 && name.toLowerCase() === name && reservedNames.indexOf(name) < 0;
    };
  });
  
  return module.exports;
}).call(this);
// node_modules/skatejs/lib/index.js
(typeof window === 'undefined' ? global : window).__512566ff9d94329bf45cdb337f7a82f7 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "./api/create": __6d38ff9f8c6c6754c9427abd5af26582,
    "./api/emit": __26395b468bf1726b9a48962eebcbfe91,
    "./api/fragment": __b80a5b0c8def940440cf1003a51e0896,
    "./api/init": __12a6504516555e4a49247e030b9cc17f,
    "./api/properties/index": __86f0af88f61c890284128013613c8df0,
    "./api/ready": __bd2dcde1dd4414627080bac1e935ada6,
    "./api/render/index": __2518147fe196c24e2c846a7743052198,
    "./api/version": __143b1d8d935e14ca96681df2478c7fcc,
    "object-assign": __4523f0e885099697c6f7fc461bcd2ec3,
    "./util/assign-safe": __b6301b610391f66c7a5ef87772fad9fd,
    "./lifecycle/attached": __0576f6be609d9fa8bbbe97fc557c3bc0,
    "./lifecycle/attribute": __28c85582862433b07e8ef5c02865ff93,
    "./lifecycle/created": __7953aa19b8c05536a1438c4ec1867c3a,
    "./util/debounce": __33b51de21ccf6d17e780f79c8edee0a8,
    "./defaults": __3f8af6030fc29927ad3a6275a637b1be,
    "./lifecycle/detached": __a67671e1bf4110211f48cdbefe03760e,
    "./global/document-observer": __aed4ceb562472f9d7972b27c0288556d,
    "./global/registry": __a9e650e83f339871227a9137a14f1172,
    "./support/custom-elements": __4b0cb9918ae5f06ecbfd46ccfe494339,
    "./type/element": __fd630abc4490eb9be70d1e585487527b,
    "./util/walk-tree": __f77a0a79d3de64b41b8111822a02ac8c,
    "./support/valid-custom-element": __8e56848e1efdf60558ed180689abec8b,
    "./api/create": __6d38ff9f8c6c6754c9427abd5af26582,
    "./api/emit": __26395b468bf1726b9a48962eebcbfe91,
    "./api/fragment": __b80a5b0c8def940440cf1003a51e0896,
    "./api/init": __12a6504516555e4a49247e030b9cc17f,
    "./api/properties/index": __86f0af88f61c890284128013613c8df0,
    "./api/ready": __bd2dcde1dd4414627080bac1e935ada6,
    "./api/render/index": __2518147fe196c24e2c846a7743052198,
    "./api/version": __143b1d8d935e14ca96681df2478c7fcc,
    "object-assign": __4523f0e885099697c6f7fc461bcd2ec3,
    "./util/assign-safe": __b6301b610391f66c7a5ef87772fad9fd,
    "./lifecycle/attached": __0576f6be609d9fa8bbbe97fc557c3bc0,
    "./lifecycle/attribute": __28c85582862433b07e8ef5c02865ff93,
    "./lifecycle/created": __7953aa19b8c05536a1438c4ec1867c3a,
    "./util/debounce": __33b51de21ccf6d17e780f79c8edee0a8,
    "./defaults": __3f8af6030fc29927ad3a6275a637b1be,
    "./lifecycle/detached": __a67671e1bf4110211f48cdbefe03760e,
    "./global/document-observer": __aed4ceb562472f9d7972b27c0288556d,
    "./global/registry": __a9e650e83f339871227a9137a14f1172,
    "./support/custom-elements": __4b0cb9918ae5f06ecbfd46ccfe494339,
    "./type/element": __fd630abc4490eb9be70d1e585487527b,
    "./util/walk-tree": __f77a0a79d3de64b41b8111822a02ac8c,
    "./support/valid-custom-element": __8e56848e1efdf60558ed180689abec8b
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__512566ff9d94329bf45cdb337f7a82f7");
  define.amd = true;
  
  (function (global, factory) {
    if (typeof define === 'function' && define.amd) {
      define(['exports', 'module', './api/create', './api/emit', './api/fragment', './api/init', './api/properties/index', './api/ready', './api/render/index', './api/version', 'object-assign', './util/assign-safe', './lifecycle/attached', './lifecycle/attribute', './lifecycle/created', './util/debounce', './defaults', './lifecycle/detached', './global/document-observer', './global/registry', './support/custom-elements', './type/element', './util/walk-tree', './support/valid-custom-element'], factory);
    } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
      factory(exports, module, __6d38ff9f8c6c6754c9427abd5af26582, __26395b468bf1726b9a48962eebcbfe91, __b80a5b0c8def940440cf1003a51e0896, __12a6504516555e4a49247e030b9cc17f, __86f0af88f61c890284128013613c8df0, __bd2dcde1dd4414627080bac1e935ada6, __2518147fe196c24e2c846a7743052198, __143b1d8d935e14ca96681df2478c7fcc, __4523f0e885099697c6f7fc461bcd2ec3, __b6301b610391f66c7a5ef87772fad9fd, __0576f6be609d9fa8bbbe97fc557c3bc0, __28c85582862433b07e8ef5c02865ff93, __7953aa19b8c05536a1438c4ec1867c3a, __33b51de21ccf6d17e780f79c8edee0a8, __3f8af6030fc29927ad3a6275a637b1be, __a67671e1bf4110211f48cdbefe03760e, __aed4ceb562472f9d7972b27c0288556d, __a9e650e83f339871227a9137a14f1172, __4b0cb9918ae5f06ecbfd46ccfe494339, __fd630abc4490eb9be70d1e585487527b, __f77a0a79d3de64b41b8111822a02ac8c, __8e56848e1efdf60558ed180689abec8b);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, mod, global.apiCreate, global.apiEmit, global.apiFragment, global.apiInit, global.apiProperties, global.apiReady, global.apiRender, global.apiVersion, global.assign, global.assignSafe, global.attached, global.attribute, global.created, global.debounce, global.defaults, global.detached, global.documentObserver, global.registry, global.supportsCustomElements, global.typeElement, global.utilWalkTree, global.validCustomElement);
      global.index = mod.exports;
    }
  })(this, function (exports, module, _apiCreate, _apiEmit, _apiFragment, _apiInit, _apiPropertiesIndex, _apiReady, _apiRenderIndex, _apiVersion, _objectAssign, _utilAssignSafe, _lifecycleAttached, _lifecycleAttribute, _lifecycleCreated, _utilDebounce, _defaults, _lifecycleDetached, _globalDocumentObserver, _globalRegistry, _supportCustomElements, _typeElement, _utilWalkTree, _supportValidCustomElement) {
  
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
    var _apiCreate2 = _interopRequireDefault(_apiCreate);
  
    var _apiEmit2 = _interopRequireDefault(_apiEmit);
  
    var _apiFragment2 = _interopRequireDefault(_apiFragment);
  
    var _apiInit2 = _interopRequireDefault(_apiInit);
  
    var _apiProperties = _interopRequireDefault(_apiPropertiesIndex);
  
    var _apiReady2 = _interopRequireDefault(_apiReady);
  
    var _apiRender = _interopRequireDefault(_apiRenderIndex);
  
    var _apiVersion2 = _interopRequireDefault(_apiVersion);
  
    var _assign = _interopRequireDefault(_objectAssign);
  
    var _assignSafe = _interopRequireDefault(_utilAssignSafe);
  
    var _attached = _interopRequireDefault(_lifecycleAttached);
  
    var _attribute = _interopRequireDefault(_lifecycleAttribute);
  
    var _created = _interopRequireDefault(_lifecycleCreated);
  
    var _debounce = _interopRequireDefault(_utilDebounce);
  
    var _defaults2 = _interopRequireDefault(_defaults);
  
    var _detached = _interopRequireDefault(_lifecycleDetached);
  
    var _documentObserver = _interopRequireDefault(_globalDocumentObserver);
  
    var _registry = _interopRequireDefault(_globalRegistry);
  
    var _supportsCustomElements = _interopRequireDefault(_supportCustomElements);
  
    var _typeElement2 = _interopRequireDefault(_typeElement);
  
    var _utilWalkTree2 = _interopRequireDefault(_utilWalkTree);
  
    var _validCustomElement = _interopRequireDefault(_supportValidCustomElement);
  
    function makeOptions(userOptions) {
      var options = (0, _assignSafe['default'])({}, _defaults2['default']);
  
      // Copy over all standard options if the user has defined them.
      for (var _name in _defaults2['default']) {
        if (userOptions[_name] !== undefined) {
          options[_name] = userOptions[_name];
        }
      }
  
      // Copy over non-standard options.
      for (var _name2 in userOptions) {
        options[_name2] = userOptions[_name2];
      }
  
      return options;
    }
  
    function makeNonNewableWrapper(Ctor, opts) {
      function CtorWrapper() {
        var properties = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  
        return (0, _assign['default'])(new Ctor(), properties);
      }
  
      // Copy prototype.
      CtorWrapper.prototype = Ctor.prototype;
  
      // Ensure a non-enumerable constructor property exists.
      Object.defineProperty(CtorWrapper.prototype, 'constructor', {
        configurable: true,
        enumerable: false,
        value: CtorWrapper,
        writable: false
      });
  
      // Make Function.prototype.name behave like native custom elements but only
      // if it's allowed (i.e. not Safari).
      var nameProp = Object.getOwnPropertyDescriptor(CtorWrapper, 'name');
      if (nameProp && nameProp.configurable) {
        Object.defineProperty(CtorWrapper, 'name', {
          configurable: true,
          enumerable: false,
          value: opts.id,
          writable: false
        });
      }
  
      return CtorWrapper;
    }
  
    function polyfillElementConstructor(opts) {
      var type = opts.type;
      function CustomElement() {
        var element = type.create(opts);
        opts.prototype.createdCallback.call(element);
        return element;
      }
      CustomElement.prototype = opts.prototype;
      return CustomElement;
    }
  
    var HTMLElement = window.HTMLElement;
    var initDocument = (0, _debounce['default'])(function () {
      (0, _utilWalkTree2['default'])(document.documentElement.childNodes, function (element) {
        var components = _registry['default'].find(element);
        var componentsLength = components.length;
  
        for (var a = 0; a < componentsLength; a++) {
          components[a].prototype.createdCallback.call(element);
        }
  
        for (var a = 0; a < componentsLength; a++) {
          components[a].prototype.attachedCallback.call(element);
        }
      });
    });
  
    function skate(name, userOptions) {
      var Ctor = undefined,
          parentProto = undefined;
      var opts = makeOptions(userOptions);
  
      opts.id = name;
      opts.isNative = opts.type === _typeElement2['default'] && (0, _supportsCustomElements['default'])() && (0, _validCustomElement['default'])(name);
      parentProto = (opts['extends'] ? document.createElement(opts['extends']).constructor : HTMLElement).prototype;
  
      // Inherit from parent prototype.
      if (!parentProto.isPrototypeOf(opts.prototype)) {
        opts.prototype = (0, _assignSafe['default'])(Object.create(parentProto), opts.prototype);
      }
  
      // Make custom definition conform to native.
      opts.prototype.createdCallback = (0, _created['default'])(opts);
      opts.prototype.attachedCallback = (0, _attached['default'])(opts);
      opts.prototype.detachedCallback = (0, _detached['default'])(opts);
      opts.prototype.attributeChangedCallback = (0, _attribute['default'])(opts);
  
      // Make a constructor for the definition.
      if (opts.isNative) {
        var nativeDefinition = {
          prototype: opts.prototype
        };
        if (opts['extends']) {
          nativeDefinition['extends'] = opts['extends'];
        }
        Ctor = document.registerElement(name, nativeDefinition);
      } else {
        Ctor = polyfillElementConstructor(opts);
        initDocument();
        _documentObserver['default'].register();
      }
  
      Ctor = makeNonNewableWrapper(Ctor, opts);
      (0, _assignSafe['default'])(Ctor, opts);
      _registry['default'].set(name, Ctor);
  
      return Ctor;
    }
  
    skate.create = _apiCreate2['default'];
    skate.emit = _apiEmit2['default'];
    skate.fragment = _apiFragment2['default'];
    skate.init = _apiInit2['default'];
    skate.properties = _apiProperties['default'];
    skate.ready = _apiReady2['default'];
    skate.render = _apiRender['default'];
    skate.version = _apiVersion2['default'];
  
    module.exports = skate;
  });
  
  return module.exports;
}).call(this);
// src/todo-person.js
(typeof window === 'undefined' ? global : window).__9c655655b0a0a1c838a11ff0aa8d6423 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
  	value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _skatejsDomDiffSrcRender = __d36f391906505aed5d8eb87afd13fa45;
  
  var _skatejsDomDiffSrcRender2 = _interopRequireDefault(_skatejsDomDiffSrcRender);
  
  var _skatejs = __512566ff9d94329bf45cdb337f7a82f7;
  
  var _skatejs2 = _interopRequireDefault(_skatejs);
  
  exports['default'] = (0, _skatejs2['default'])('todo-person', {
  	properties: {
  		content: _skatejs2['default'].properties.content({
  			change: _skatejs2['default'].render
  		}),
  		nick: _skatejs2['default'].properties.string({
  			attribute: true,
  			set: _skatejs2['default'].render
  		})
  	},
  	render: (0, _skatejsDomDiffSrcRender2['default'])(function (elem, React) {
  		return React.createElement(
  			'a',
  			{ href: 'http://twitter.com/' + elem.nick },
  			elem.content.nodes || elem.nick
  		);
  	})
  });
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/todo-app.js
(typeof window === 'undefined' ? global : window).__3de366384c4f5b872b4976a113a841b4 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
  	value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _skatejsDomDiffSrcRender = __d36f391906505aed5d8eb87afd13fa45;
  
  var _skatejsDomDiffSrcRender2 = _interopRequireDefault(_skatejsDomDiffSrcRender);
  
  var _skatejs = __512566ff9d94329bf45cdb337f7a82f7;
  
  var _skatejs2 = _interopRequireDefault(_skatejs);
  
  var _todoPerson = __9c655655b0a0a1c838a11ff0aa8d6423;
  
  var _todoPerson2 = _interopRequireDefault(_todoPerson);
  
  var KEYCODE_ENTER = 13;
  var KEYCODE_ESCAPE = 27;
  
  function filter(filter) {
  	return function (item) {
  		return filter === '' || item.completed && filter === 'completed' || !item.completed && filter === 'active';
  	};
  }
  
  function getStore(app) {
  	return document.getElementById(app.storeId);
  }
  
  exports['default'] = (0, _skatejs2['default'])('todo-app', {
  	events: {
  		create: function create(e) {
  			getStore(this).save(e.detail.data);
  			this.items = getStore(this).getAll();
  		},
  		edit: function edit(e) {
  			getStore(this).save(e.detail.data);
  			this.items = getStore(this).getAll();
  		},
  		destroy: function destroy(e) {
  			getStore(this).remove(e.target.data);
  			this.items = getStore(this).getAll();
  		},
  		'click .clear-completed': function clickClearCompleted() {
  			this.items.forEach((function (item) {
  				if (item.completed) {
  					getStore(this).remove(item);
  				}
  			}).bind(this));
  			this.items = [];
  		},
  		'click .filters a': function clickFiltersA(e) {
  			this.filter = e.currentTarget.href.split('#/')[1];
  		},
  		'change .toggle-all': function changeToggleAll(e) {
  			this.selectAll = e.currentTarget.checked;
  		},
  		'keyup .new-todo': function keyupNewTodo(e) {
  			if (e.keyCode !== KEYCODE_ENTER) {
  				return;
  			}
  
  			var input = e.currentTarget;
  			var store = getStore(this);
  			var value = (input.value || '').trim();
  
  			if (!value) {
  				return;
  			}
  
  			store.save({
  				id: new Date().getTime(),
  				content: value
  			});
  
  			this.items = store.getAll();
  			input.value = '';
  		}
  	},
  	properties: {
  		editing: _skatejs2['default'].properties.number({
  			set: function set(elem, data) {
  				_skatejs2['default'].render(elem);
  				if (data.newValue) {
  					var edit = document.getElementById('todo-item-' + data.newValue).querySelector('.edit');
  					edit.focus();
  					edit.select();
  				} else if (data.oldValue) {
  					document.getElementById('todo-item-' + data.oldValue).querySelector('.edit').blur();
  				}
  			}
  		}),
  		filter: _skatejs2['default'].properties.string({
  			'default': function _default() {
  				var filter = window.location.hash.split('#/');
  				return filter.length === 2 ? filter[1] : '';
  			},
  			set: _skatejs2['default'].render
  		}),
  		items: {
  			'default': function _default() {
  				return [];
  			},
  			set: _skatejs2['default'].render
  		},
  		storeId: _skatejs2['default'].properties.string({
  			attribute: true,
  			set: _skatejs2['default'].render
  		})
  	},
  	prototype: Object.defineProperties({}, {
  		active: {
  			get: function get() {
  				return this.items.filter(function (item) {
  					return !item.completed;
  				});
  			},
  			configurable: true,
  			enumerable: true
  		},
  		completed: {
  			get: function get() {
  				return this.items.filter(function (item) {
  					return item.completed;
  				});
  			},
  			configurable: true,
  			enumerable: true
  		}
  	}),
  	created: function created(elem) {
  		elem.items = getStore(elem).getAll();
  	},
  	render: (0, _skatejsDomDiffSrcRender2['default'])(function (elem, React) {
  		var store = getStore(elem);
  		return React.createElement(
  			'div',
  			null,
  			React.createElement(
  				'section',
  				{ 'class': 'todoapp' },
  				React.createElement(
  					'header',
  					{ 'class': 'header' },
  					React.createElement(
  						'h1',
  						null,
  						'todos'
  					),
  					React.createElement('input', { autofocus: true, 'class': 'new-todo', placeholder: 'What needs to be done?' })
  				),
  				React.createElement(
  					'section',
  					{ 'class': 'main' },
  					elem.items.length ? React.createElement('input', { 'class': 'toggle-all', type: 'checkbox', checked: elem.completed.length === elem.items.length, onchange: function (e) {
  							elem.items.forEach(function (item) {
  								store.save({
  									completed: e.target.checked,
  									content: item.content,
  									id: item.id
  								});
  							});
  							elem.items = store.getAll();
  						} }) : '',
  					React.createElement(
  						'label',
  						{ 'for': 'toggle-all' },
  						'Mark all as complete'
  					),
  					React.createElement(
  						'ul',
  						{ 'class': 'todo-list' },
  						elem.items.filter(filter(elem.filter)).map(function (item) {
  							return React.createElement(
  								'li',
  								{ id: 'todo-item-' + item.id, 'class': elem.editing === item.id ? 'editing' : '', ondblclick: function () {
  										return elem.editing = item.id;
  									} },
  								React.createElement(
  									'div',
  									{ 'class': 'view' },
  									React.createElement('input', { 'class': 'toggle', type: 'checkbox', checked: item.completed, onchange: function (e) {
  											store.save({
  												completed: e.target.checked,
  												content: item.content,
  												id: item.id
  											});
  											elem.items = store.getAll();
  										} }),
  									React.createElement(
  										'label',
  										null,
  										item.content
  									),
  									React.createElement('button', { 'class': 'destroy', onclick: function () {
  											store.remove(item);
  											elem.items = store.getAll();
  										} })
  								),
  								React.createElement('input', { 'class': 'edit', value: item.content, onblur: function () {
  										return elem.editing = false;
  									}, onkeyup: function (e) {
  										if (e.keyCode === KEYCODE_ENTER) {
  											elem.editing = false;
  											elem.items = store.getAll();
  										} else if (e.keyCode === KEYCODE_ESCAPE) {
  											e.target.value = item.content;
  											elem.editing = false;
  										}
  									}, onchange: function (e) {
  										store.save({
  											completed: item.completed,
  											content: e.target.value,
  											id: item.id
  										});
  										elem.items = store.getAll();
  									} })
  							);
  						})
  					)
  				),
  				elem.items.length ? React.createElement(
  					'footer',
  					{ 'class': 'footer' },
  					React.createElement(
  						'span',
  						{ 'class': 'todo-count' },
  						React.createElement(
  							'strong',
  							null,
  							elem.active.length.toString()
  						),
  						' ',
  						React.createElement(
  							'span',
  							null,
  							'item',
  							elem.active.length === 1 ? '' : 's',
  							' left'
  						)
  					),
  					React.createElement(
  						'ul',
  						{ 'class': 'filters' },
  						React.createElement(
  							'li',
  							null,
  							React.createElement(
  								'a',
  								{ href: '#/', 'class': elem.filter === '' ? 'selected' : '' },
  								'All'
  							)
  						),
  						React.createElement(
  							'li',
  							null,
  							React.createElement(
  								'a',
  								{ href: '#/active', 'class': elem.filter === 'active' ? 'selected' : '' },
  								'Active'
  							)
  						),
  						React.createElement(
  							'li',
  							null,
  							React.createElement(
  								'a',
  								{ href: '#/completed', 'class': elem.filter === 'completed' ? 'selected' : '' },
  								'Completed'
  							)
  						)
  					),
  					React.createElement(
  						'button',
  						{ 'class': 'clear-completed' },
  						'Clear completed'
  					)
  				) : ''
  			),
  			React.createElement(
  				'footer',
  				{ 'class': 'info' },
  				React.createElement(
  					'p',
  					null,
  					'Double-click to edit a todo'
  				),
  				React.createElement(
  					'p',
  					null,
  					'Created by ',
  					React.createElement(
  						_todoPerson2['default'],
  						{ nick: 'chrisdarroch' },
  						'Chris Darroch'
  					),
  					' and ',
  					React.createElement(
  						_todoPerson2['default'],
  						{ nick: 'treshugart' },
  						'Trey Shugart'
  					),
  					'.'
  				),
  				React.createElement(
  					'p',
  					null,
  					'Part of ',
  					React.createElement(
  						'a',
  						{ href: 'http://todomvc.com' },
  						'TodoMVC'
  					)
  				)
  			)
  		);
  	})
  });
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/todo-store.js
(typeof window === 'undefined' ? global : window).__92bfae87254aa83d3e5aab6e1d93b44c = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
  	value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _skatejs = __512566ff9d94329bf45cdb337f7a82f7;
  
  var _skatejs2 = _interopRequireDefault(_skatejs);
  
  var store = window.localStorage;
  
  exports['default'] = (0, _skatejs2['default'])('todo-store', {
  	properties: {
  		keyPrefix: _skatejs2['default'].properties.string({
  			attribute: true,
  			'default': 'todo-skatejs'
  		})
  	},
  	prototype: {
  		getKey: function getKey(id) {
  			return this.keyPrefix + '-' + id;
  		},
  		getItemFromKey: function getItemFromKey(key) {
  			return JSON.parse(store.getItem(key));
  		},
  		getItem: function getItem(id) {
  			return this.getItemFromKey(this.getKey(id));
  		},
  		getAll: function getAll() {
  			return Object.keys(store)
  			// only get keys that belong to this app
  			.filter((function (key) {
  				return key.indexOf(this.keyPrefix) === 0;
  			}).bind(this)).map((function (key) {
  				return this.getItemFromKey(key);
  			}).bind(this));
  		},
  		save: function save(data) {
  			store.setItem(this.getKey(data.id), JSON.stringify(data));
  		},
  		remove: function remove(data) {
  			store.removeItem(this.getKey(data.id));
  		}
  	}
  });
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/index.js
(typeof window === 'undefined' ? global : window).__fdef143e8295ff2f20559903e4e961ca = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
  	value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  __4e217bba0bafac4ed0c1159f936c9a72;
  
  var _todoApp = __3de366384c4f5b872b4976a113a841b4;
  
  var _todoApp2 = _interopRequireDefault(_todoApp);
  
  var _todoStore = __92bfae87254aa83d3e5aab6e1d93b44c;
  
  var _todoStore2 = _interopRequireDefault(_todoStore);
  
  exports['default'] = {
  	TodoApp: _todoApp2['default'],
  	TodoStore: _todoStore2['default']
  };
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/global.js
(typeof window === 'undefined' ? global : window).__34ddda46866fc23601c4773741c436eb = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _index = __fdef143e8295ff2f20559903e4e961ca;
  
  var _index2 = _interopRequireDefault(_index);
  
  window.app = _index2['default'];
  
  return module.exports;
}).call(this);