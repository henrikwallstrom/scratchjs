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

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var htmlBuilder = _interopRequire(__webpack_require__(1));

	var widget = _interopRequire(__webpack_require__(3));

	exports.html = htmlBuilder;
	exports.widget = widget;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

	var el = _interopRequireWildcard(__webpack_require__(2));

	var curry = function (fn) {
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

	  var appendString = function (str) {
	    return element.appendChild(document.createTextNode(str));
	  };

	  var appendToElement = function (childElement) {
	    if (element.canHaveChildren !== false) {
	      element.appendChild(childElement);
	    } else {
	      element.text = element.text + childElement.innerHTML;
	    }
	  };

	  var appendFunction = function (fn) {
	    return fn(htmlBuilder(that));
	  };

	  var append = function (object) {
	    if (typeof object === "undefined" || object === null) {
	      throw new Error("Can not append null or undefined to tag");
	    }

	    if (typeof object === "object" && object.constructor === Array) {
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
	          if (!_iteratorNormalCompletion && _iterator["return"]) {
	            _iterator["return"]();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	    } else if (typeof object === "string") {
	      appendString(object);
	    } else if (typeof object === "function") {
	      appendFunction(object);
	    } else if (typeof object === "object" && object.appendToTag /* eg. widget and tags implement appendToTag */) {
	      object.appendToTag(that); // double dispatch
	    } else if (typeof object === "object") {
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
	    for (var _len = arguments.length, children = Array(_len), _key = 0; _key < _len; _key++) {
	      children[_key] = arguments[_key];
	    }

	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;

	    try {
	      for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var obj = _step.value;

	        append(obj);
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator["return"]) {
	          _iterator["return"]();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
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
	      element.className += " " + className;
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
	    if (typeof value === "function") {
	      that.on(key, value);
	    } else if (key === "klass") {
	      that.addClass(value);
	    } else {
	      element.setAttribute(key, value);
	    }

	    return that;
	  };

	  return Object.freeze(that);
	}

	var tags = ("a abbr acronym address area article aside audio b bdi bdo big " + "blockquote body br button canvas caption cite code col colgroup command " + "datalist dd del details dfn div dl dt em embed fieldset figcaption figure " + "footer form frame frameset h1 h2 h3 h4 h5 h6 hr head header hgroup html i " + "iframe img input ins kbd keygen label legend li link map mark meta meter " + "nav noscript object ol optgroup option output p param pre progress q rp rt" + "ruby samp script section select small source span strong style sub summary" + "sup table tbody td textarea tfoot th thead time title tr track tt ul var" + "video wbr").split(" ");

	function htmlBuilder(rootElement) {
	  var root = htmlTag(getElement(rootElement));

	  var that = {};

	  that.root = function () {
	    return root;
	  };

	  that.tag = function (tagName) {
	    for (var _len = arguments.length, children = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      children[_key - 1] = arguments[_key];
	    }

	    var tag = htmlTag(document.createElement(tagName));
	    tag.append(children);
	    root.append(tag);
	    return tag;
	  };

	  tags.forEach(function (tagName) {
	    that[tagName] = function () {
	      for (var _len = arguments.length, children = Array(_len), _key = 0; _key < _len; _key++) {
	        children[_key] = arguments[_key];
	      }

	      return that.tag(tagName, children);
	    };
	  });

	  that.append = function () {
	    for (var _len = arguments.length, children = Array(_len), _key = 0; _key < _len; _key++) {
	      children[_key] = arguments[_key];
	    }

	    root.append(children);
	    return that;
	  };

	  function getElement(object) {
	    // Create a fragment if no object
	    if (typeof object === "undefined" || object === null) {
	      return document.createDocumentFragment();
	    }

	    // If it's a tag
	    if (object.element) {
	      return object.element();
	    }

	    // a selector
	    if (typeof object === "string") {
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

	module.exports = htmlBuilder;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var getAttribute = function (element, key) {
	  return element.getAttribute(key);
	};

	exports.getAttribute = getAttribute;
	var css = function (element, key, value) {
	  return value === undefined ? getComputedStyle(element)[key] : element.style[key] = value;
	};

	exports.css = css;
	var addClass = function (element, className) {
	  if (element.classList) {
	    element.classList.add(className);
	  } else {
	    element.className += " " + className;
	  }
	};

	exports.addClass = addClass;
	var removeClass = function (element, className) {
	  if (element.classList) {
	    element.classList.remove(className);
	  } else {
	    element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
	  }
	};

	exports.removeClass = removeClass;
	var hasClass = function (element, className) {
	  if (element.classList) {
	    element.classList.contains(className);
	  } else {
	    new RegExp("(^| )" + className + "( |$)", "gi").test(element.className);
	  }
	};

	exports.hasClass = hasClass;
	var show = function (element) {
	  return element.style.display = "";
	};

	exports.show = show;
	var hide = function (element) {
	  return element.style.display = "none";
	};

	exports.hide = hide;
	var offset = function (element) {
	  var rect = element.getBoundingClientRect();

	  return {
	    top: rect.top + document.body.scrollTop,
	    left: rect.left + document.body.scrollLeft
	  };
	};

	exports.offset = offset;
	var offsetParent = function (element) {
	  return element.offsetParent || element;
	};

	exports.offsetParent = offsetParent;
	var outerHeight = function (element, includeMargin) {
	  var height = element.offsetHeight;
	  if (!includeMargin) {
	    return;
	  }

	  var style = getComputedStyle(element);
	  height += parseInt(style.marginTop) + parseInt(style.marginBottom);
	  return height;
	};

	exports.outerHeight = outerHeight;
	var outerWidth = function (element, includeMargin) {
	  var width = element.offsetWidth;
	  if (!includeMargin) {
	    return width;
	  }

	  var style = getComputedStyle(element);
	  width += parseInt(style.marginLeft) + parseInt(style.marginRight);
	  return width;
	};

	exports.outerWidth = outerWidth;
	var position = function (element) {
	  return { left: element.offsetLeft, top: element.offsetTop };
	};

	exports.position = position;
	var empty = function (element) {
	  return element.innerHTML = "";
	};

	exports.empty = empty;
	var remove = function (element) {
	  return element.parentNode.removeChild(element);
	};

	exports.remove = remove;
	var replaceWith = function (element, el) {
	  var parent = element.parentNode;
	  parent.removeChild(element);
	  parent.appendChild(el);
	};

	exports.replaceWith = replaceWith;
	var contains = function (element, child) {
	  return element.contains(child);
	};

	exports.contains = contains;
	var html = function (element, value) {
	  return value === undefined ? element.innerHTML : element.innerHTML = value;
	};

	exports.html = html;
	var text = function (element, value) {
	  return value === undefined ? element.textContent : element.textContent = value;
	};

	exports.text = text;
	var matches = function (element, selector) {
	  var el = element;
	  return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
	};
	exports.matches = matches;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

	var htmlBuilder = _interopRequire(__webpack_require__(1));

	var idGenerator = (function () {
	  var id = 0;

	  return function () {
	    id += 1;
	    return id.toString();
	  };
	})();

	var widget = function (_ref) {
	  var id = _ref.id;
	  var content = _ref.content;
	  var mixin = _ref.mixin;

	  id = id || "widget" + idGenerator();
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
	    return document.querySelector("#" + that.id());
	  };

	  that.root = function () {
	    return htmlBuilder(that.rootElement()).root();
	  };

	  that.isAttached = function () {
	    return that.rootElement() !== null;
	  };

	  that.appendTo = function (element) {
	    return that.renderOn(htmlBuilder(element));
	  };

	  that.appendToTag = function (tag) {
	    return that.renderOn(htmlBuilder(tag));
	  };

	  that.replace = function (element) {
	    var html = htmlBuilder(element);
	    html.root.empty();
	    that.renderOn(html);
	  };

	  that.renderRootOn = function (html) {
	    return html.tag("widget").attr({ id: id });
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
	    var html = htmlBuilder();
	    that.renderOn(html);

	    // Replace our self
	    that.root().replaceWith(html.root().element());
	  };

	  return Object.assign.apply(Object, [that].concat(_toConsumableArray(mixin)));
	};

	module.exports = widget;

/***/ }
/******/ ])
});
;