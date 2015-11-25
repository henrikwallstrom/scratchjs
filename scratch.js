(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.widget = exports.html = undefined;

	var _htmlbuilder = __webpack_require__(1);

	var _htmlbuilder2 = _interopRequireDefault(_htmlbuilder);

	var _widget = __webpack_require__(3);

	var _widget2 = _interopRequireDefault(_widget);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.html = _htmlbuilder2.default;
	exports.widget = _widget2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _element = __webpack_require__(2);

	var el = _interopRequireWildcard(_element);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	var curry = function curry(fn) {
	  for (var _len = arguments.length, first = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	    first[_key - 1] = arguments[_key];
	  }

	  return function () {
	    for (var _len2 = arguments.length, second = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	      second[_key2] = arguments[_key2];
	    }

	    return fn.apply(undefined, first.concat(second));
	  };
	};

	function htmlTag(element) {
	  var that = {};

	  //
	  // Private
	  //

	  var appendString = function appendString(str) {
	    return element.appendChild(document.createTextNode(str));
	  };

	  var appendToElement = function appendToElement(childElement) {
	    if (element.canHaveChildren !== false) {
	      element.appendChild(childElement);
	    } else {
	      element.text = element.text + childElement.innerHTML;
	    }
	  };

	  var appendFunction = function appendFunction(fn) {
	    return fn(htmlBuilder(that));
	  };

	  var append = function append(object) {
	    if (typeof object === 'undefined' || object === null) {
	      throw new Error('Can not append null or undefined to tag');
	    }

	    if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object.constructor === Array) {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = object[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var obj = _step.value;

	          append(obj);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    } else if (typeof object === 'string') {
	      appendString(object);
	    } else if (typeof object === 'function') {
	      appendFunction(object);
	    } else if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object.appendToTag /* eg. widget and tags implement appendToTag */) {
	        object.appendToTag(that); // double dispatch
	      } else if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object') {
	        that.attr(object); // assume attributes if none of above
	      } else {
	          appendToElement(object);
	        }
	  };

	  //
	  // Public
	  //

	  that.element = function () {
	    return element;
	  };

	  that.appendTag = function (aTag) {
	    appendToElement(aTag.element());
	    return that;
	  };

	  that.appendToTag = function (aTag) {
	    return aTag.appendTag(that);
	  };

	  that.append = function () {
	    for (var _len3 = arguments.length, children = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	      children[_key3] = arguments[_key3];
	    }

	    var _iteratorNormalCompletion2 = true;
	    var _didIteratorError2 = false;
	    var _iteratorError2 = undefined;

	    try {
	      for (var _iterator2 = children[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	        var obj = _step2.value;

	        append(obj);
	      }
	    } catch (err) {
	      _didIteratorError2 = true;
	      _iteratorError2 = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion2 && _iterator2.return) {
	          _iterator2.return();
	        }
	      } finally {
	        if (_didIteratorError2) {
	          throw _iteratorError2;
	        }
	      }
	    }

	    return that;
	  };

	  that.on = function (eventType, callback) {
	    element.addEventListener(eventType, callback);
	    return that;
	  };

	  that.off = function (eventType, callback) {
	    element.removeEventListener(eventType, callback);
	    return that;
	  };

	  that.attr = function (object) {
	    Object.keys(object).forEach(function (key) {
	      return that.setAttribute(key, object[key]);
	    });
	    return that;
	  };

	  that.addClass = function (element, className) {
	    if (element.classList) {
	      element.classList.add(className);
	    } else {
	      element.className += ' ' + className;
	    }

	    return that;
	  };

	  // Add element functions to tag
	  Object.keys(el).forEach(function (name) {
	    that[name] = curry(el[name], element);
	  });

	  that.find = function (element, selector) {
	    return Array.prototype.map.call(element.querySelectorAll(selector), function (el) {
	      return htmlTag(el);
	    });
	  };

	  that.setAttribute = function (key, value) {
	    if (typeof value === 'function') {
	      that.on(key, value);
	    } else if (key === 'klass') {
	      that.addClass(value);
	    } else {
	      element.setAttribute(key, value);
	    }

	    return that;
	  };

	  return Object.freeze(that);
	}

	var tags = ('a abbr acronym address area article aside audio b bdi bdo big ' + 'blockquote body br button canvas caption cite code col colgroup command ' + 'datalist dd del details dfn div dl dt em embed fieldset figcaption figure ' + 'footer form frame frameset h1 h2 h3 h4 h5 h6 hr head header hgroup html i ' + 'iframe img input ins kbd keygen label legend li link map mark meta meter ' + 'nav noscript object ol optgroup option output p param pre progress q rp rt' + 'ruby samp script section select small source span strong style sub summary' + 'sup table tbody td textarea tfoot th thead time title tr track tt ul var' + 'video wbr').split(' ');

	function htmlBuilder(rootElement) {
	  var root = htmlTag(getElement(rootElement));

	  var that = {};

	  that.root = function () {
	    return root;
	  };

	  that.tag = function (tagName) {
	    for (var _len4 = arguments.length, children = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	      children[_key4 - 1] = arguments[_key4];
	    }

	    var tag = htmlTag(document.createElement(tagName));
	    tag.append(children);
	    root.append(tag);
	    return tag;
	  };

	  tags.forEach(function (tagName) {
	    that[tagName] = function () {
	      for (var _len5 = arguments.length, children = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	        children[_key5] = arguments[_key5];
	      }

	      return that.tag(tagName, children);
	    };
	  });

	  that.append = function () {
	    for (var _len6 = arguments.length, children = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	      children[_key6] = arguments[_key6];
	    }

	    root.append(children);
	    return that;
	  };

	  function getElement(object) {
	    // Create a fragment if no object
	    if (typeof object === 'undefined' || object === null) {
	      return document.createDocumentFragment();
	    }

	    // If it's a tag
	    if (object.element) {
	      return object.element();
	    }

	    // a selector
	    if (typeof object === 'string') {
	      return document.querySelectorAll(object).item(0);
	    }

	    // a Node List
	    if (object.item) {
	      return object.item(0);
	    }

	    // a jQuery
	    if (object.get) {
	      return object.get(0);
	    }

	    return object; // assume it's an element
	  }

	  return Object.freeze(that);
	}

	exports.default = htmlBuilder;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var getAttribute = exports.getAttribute = function getAttribute(element, key) {
	  return element.getAttribute(key);
	};

	var css = exports.css = function css(element, key, value) {
	  return value === undefined ? getComputedStyle(element)[key] : element.style[key] = value;
	};

	var addClass = exports.addClass = function addClass(element, className) {
	  if (element.classList) {
	    element.classList.add(className);
	  } else {
	    element.className += ' ' + className;
	  }
	};

	var removeClass = exports.removeClass = function removeClass(element, className) {
	  if (element.classList) {
	    element.classList.remove(className);
	  } else {
	    element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
	  }
	};

	var hasClass = exports.hasClass = function hasClass(element, className) {
	  if (element.classList) {
	    element.classList.contains(className);
	  } else {
	    new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
	  }
	};

	var show = exports.show = function show(element) {
	  return element.style.display = '';
	};

	var hide = exports.hide = function hide(element) {
	  return element.style.display = 'none';
	};

	var offset = exports.offset = function offset(element) {
	  var rect = element.getBoundingClientRect();

	  return {
	    top: rect.top + document.body.scrollTop,
	    left: rect.left + document.body.scrollLeft
	  };
	};

	var offsetParent = exports.offsetParent = function offsetParent(element) {
	  return element.offsetParent || element;
	};

	var outerHeight = exports.outerHeight = function outerHeight(element, includeMargin) {
	  var height = element.offsetHeight;
	  if (!includeMargin) {
	    return;
	  }

	  var style = getComputedStyle(element);
	  height += parseInt(style.marginTop) + parseInt(style.marginBottom);
	  return height;
	};

	var outerWidth = exports.outerWidth = function outerWidth(element, includeMargin) {
	  var width = element.offsetWidth;
	  if (!includeMargin) {
	    return width;
	  }

	  var style = getComputedStyle(element);
	  width += parseInt(style.marginLeft) + parseInt(style.marginRight);
	  return width;
	};

	var position = exports.position = function position(element) {
	  return { left: element.offsetLeft, top: element.offsetTop };
	};

	var empty = exports.empty = function empty(element) {
	  return element.innerHTML = '';
	};

	var remove = exports.remove = function remove(element) {
	  return element.parentNode.removeChild(element);
	};

	var replaceWith = exports.replaceWith = function replaceWith(element, el) {
	  var parent = element.parentNode;
	  parent.removeChild(element);
	  parent.appendChild(el);
	};

	var contains = exports.contains = function contains(element, child) {
	  return element.contains(child);
	};

	var html = exports.html = function html(element, value) {
	  return value === undefined ? element.innerHTML : element.innerHTML = value;
	};

	var text = exports.text = function text(element, value) {
	  return value === undefined ? element.textContent : element.textContent = value;
	};

	var matches = exports.matches = function matches(element, selector) {
	  var el = element;
	  return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _htmlbuilder = __webpack_require__(1);

	var _htmlbuilder2 = _interopRequireDefault(_htmlbuilder);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var idGenerator = (function () {
	  var id = 0;

	  return function () {
	    id += 1;
	    return id.toString();
	  };
	})();

	var widget = function widget(_ref) {
	  var _Object;

	  var id = _ref.id;
	  var content = _ref.content;
	  var mixin = _ref.mixin;

	  id = id || 'widget' + idGenerator();
	  content = content || function () {};
	  mixin = mixin || [];

	  var that = {};

	  //
	  // Public
	  //

	  that.id = function () {
	    return id;
	  };

	  that.rootElement = function () {
	    return document.querySelector('#' + that.id());
	  };

	  that.root = function () {
	    return (0, _htmlbuilder2.default)(that.rootElement()).root();
	  };

	  that.isAttached = function () {
	    return that.rootElement() !== null;
	  };

	  that.appendTo = function (element) {
	    return that.renderOn((0, _htmlbuilder2.default)(element));
	  };

	  that.appendToTag = function (tag) {
	    return that.renderOn((0, _htmlbuilder2.default)(tag));
	  };

	  that.replace = function (element) {
	    var html = (0, _htmlbuilder2.default)(element);
	    html.root.empty();
	    that.renderOn(html);
	  };

	  that.renderRootOn = function (html) {
	    return html.tag('widget').attr({ id: id });
	  };

	  that.renderContentOn = content;

	  that.renderOn = function (html) {
	    return that.renderRootOn(html).append(that.renderContentOn);
	  };

	  that.update = function () {
	    if (!that.isAttached()) {
	      return;
	    }

	    // Re-render
	    var html = (0, _htmlbuilder2.default)();
	    that.renderOn(html);

	    // Replace our self
	    that.root().replaceWith(html.root().element());
	  };

	  return (_Object = Object).assign.apply(_Object, [that].concat(_toConsumableArray(mixin)));
	};

	exports.default = widget;

/***/ }
/******/ ])
});
;