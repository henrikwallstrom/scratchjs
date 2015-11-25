require('./style.css');
import todo from './todo.js';


function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function() {
  todo().appendTo(document.body);
});
