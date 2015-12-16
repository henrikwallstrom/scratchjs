export const getAttribute = (element, key) => element.getAttribute(key);

export const css = (element, key, value) => value === undefined ?
  getComputedStyle(element)[key] :
  element.style[key] = value;

export const addClass = (element, className) => {
  if (element.classList) {
    element.classList.add(className);
  } else {
    element.className += ' ' + className;
  }
};

export const removeClass = (element, className) => {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  }
};

export const hasClass = (element, className) => {
  if (element.classList) {
    element.classList.contains(className);
  } else {
    new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
  }
};

export const show = (element) => element.style.display = '';

export const hide = (element) => element.style.display = 'none';

export const offset = (element) => {
  var rect = element.getBoundingClientRect();

  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft
  };
};

export const offsetParent = (element) => element.offsetParent || element;

export const outerHeight = (element, includeMargin) => {
   var height = element.offsetHeight;
   if(!includeMargin) {
     return;
   }

  var style = getComputedStyle(element);
  height += parseInt(style.marginTop) + parseInt(style.marginBottom);
  return height;
};

export const outerWidth = (element, includeMargin) => {
   var width = element.offsetWidth;
   if(!includeMargin) {
     return width;
   }

  var style = getComputedStyle(element);
  width += parseInt(style.marginLeft) + parseInt(style.marginRight);
  return width;
};

export const position = (element) => ({left: element.offsetLeft, top: element.offsetTop});

export const empty = (element) => element.innerHTML = '';

export const remove = (element) => element.parentNode.removeChild(element);

export const replaceWith = (element, el) => {
  let parent = element.parentNode;
  parent.replaceChild(el, element);
};

export const contains = (element, child) => element.contains(child);

export const html = (element, value) => value === undefined ?
  element.innerHTML :
  element.innerHTML = value;

export const text = (element, value) => value === undefined ?
  element.textContent :
  element.textContent = value;

export const matches = (element, selector) => {
  var el = element;
  return (el.matches || el.matchesSelector || el.msMatchesSelector || el.mozMatchesSelector || el.webkitMatchesSelector || el.oMatchesSelector).call(el, selector);
};
