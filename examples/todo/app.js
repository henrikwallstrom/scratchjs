require('./style.css');
import todo from './todo.js';
import anotherTodo from './anotherCounter.js';

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function() {
  todo().appendTo(document.body);
  anotherTodo().appendTo(document.body);
});
