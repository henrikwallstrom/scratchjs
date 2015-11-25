import {widget} from 'scratchjs';

let counter = () => {
  let count = 0;

  let that = widget({});

  that.renderContentOn = (html) => {
    html.span('' + count);
    html.button({click: function() { count++; that.update();}}, '+');
    html.button({click: function() { count--; that.update();}}, '-');
  };

  return that;
};

export default counter;
