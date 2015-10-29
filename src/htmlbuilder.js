import * as el  from './element';

let curry = (fn, ...first) => function(...second) {
  return fn(...first, ...second);
};

function htmlTag (element) {
  let that = {};

  //
  // Private
  //

  let appendString = (str) => element.appendChild(document.createTextNode(str));

  let appendToElement = (childElement) => {
    if (element.canHaveChildren !== false) {
      element.appendChild(childElement);
    } else {
      element.text = element.text + childElement.innerHTML;
    }
  };

  let appendFunction = (fn) => fn(htmlBuilder(that));

  let append = (object) => {
    if (typeof(object) === 'undefined' || object === null) {
      throw new Error('Can not append null or undefined to tag');
    }

    if (typeof object === 'object' && object.constructor === Array) {
      for(var obj of object) {
        append(obj);
      }
    }
    else if (typeof object === 'string') {
      appendString(object);
    } else if (typeof object === 'function') {
      appendFunction(object);
    } else if (typeof object === 'object' &&
      object.appendToTag /* eg. widget and tags implement appendToTag */) {
      object.appendToTag(that); // double dispatch
    }
    else if (typeof object === 'object') {
      that.attr(object); // assume attributes if none of above
    } else {
      appendToElement(object);
    }
  };

  //
  // Public
  //

  that.element = () => element;

  that.appendTag = (aTag) => {
    appendToElement(aTag.element());
    return that;
  };

  that.appendToTag = (aTag) => aTag.appendTag(that);

  that.append = (...children) => {
    for(var obj of children) {
      append(obj);
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

  that.attr = (object) => {
    Object.keys(object).forEach(key => that.setAttribute(key, object[key]));
    return that;
  };

  that.addClass = (element, className) => {
    if (element.classList) {
      element.classList.add(className);
    } else {
      element.className += ' ' + className;
    }

    return that;
  };

  // Add element functions to tag
  Object.keys(el).forEach(function(name) {
    that[name] = curry(el[name], element);
  });

  that.find = (element, selector) => Array.prototype.map.call(element.querySelectorAll(selector), el => htmlTag(el));

  that.setAttribute = (key, value) => {
    if(typeof value === 'function') {
      that.on(key, value);
    }
    else if (key === 'klass') {
      that.addClass(value);
    } else {
      element.setAttribute(key, value);
    }

    return that;
  };

  return Object.freeze(that);
}

let tags = ('a abbr acronym address area article aside audio b bdi bdo big ' +
            'blockquote body br button canvas caption cite code col colgroup command ' +
            'datalist dd del details dfn div dl dt em embed fieldset figcaption figure ' +
            'footer form frame frameset h1 h2 h3 h4 h5 h6 hr head header hgroup html i ' +
            'iframe img input ins kbd keygen label legend li link map mark meta meter ' +
            'nav noscript object ol optgroup option output p param pre progress q rp rt' +
            'ruby samp script section select small source span strong style sub summary' +
            'sup table tbody td textarea tfoot th thead time title tr track tt ul var' +
            'video wbr').split(' ');

function htmlBuilder (rootElement) {
  var root = htmlTag(getElement(rootElement));

  let that = {};

  that.root = () => root;

  that.tag = (tagName, ...children) => {
    var tag = htmlTag(document.createElement(tagName));
    tag.append(children);
    root.append(tag);
    return tag;
  };

  tags.forEach(tagName => {
    that[tagName] = (...children) => that.tag(tagName, children);
  });

  that.append = (...children) => {
    root.append(children);
    return that;
  };

  function getElement (object) {
    // Create a fragment if no object
    if (typeof(object) === 'undefined' || object === null) {
      return  document.createDocumentFragment();
    }

    // If it's a tag
    if(object.element) {
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

export default htmlBuilder;
