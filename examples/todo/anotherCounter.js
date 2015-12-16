import {widget} from 'scratchjs';

let anotherCounter = () => {
  let count = 0;

  let that = widget({});

  that.renderContentOn = (html) => {
    html.h1('Another');
    html.span('' + count);
    html.button({click: function() { count++; that.update();}}, '+');
    html.button({click: function() { count--; that.update();}}, '-');
  };

  return that;
};

export default anotherCounter;
