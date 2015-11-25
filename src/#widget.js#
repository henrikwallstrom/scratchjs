import htmlBuilder  from './htmlbuilder';

const idGenerator = (() => {
  var id = 0;

  return () => {
    id += 1;
    return id.toString();
  };
})();

const widget = ({id, content, mixin}) => {
  id = id || 'widget' + idGenerator();
  content = content || (() => {});
  mixin = mixin || [];

  let that = {};

  //
  // Public
  //

  that.id = () => id;

  that.rootElement = () => document.querySelector('#' + that.id());

  that.root = () => htmlBuilder(that.rootElement()).root();

  that.isAttached = () => that.rootElement() !== null;

  that.appendTo = (element) => that.renderOn(htmlBuilder(element));

  that.appendToTag = (tag) => that.renderOn(htmlBuilder(tag));

  that.replace = (element) => {
    var html = htmlBuilder(element);
    html.root.empty();
    that.renderOn(html);
  };

  that.renderRootOn = (html) => html.tag('widget').attr({id: id});

  that.renderContentOn = content;

  that.renderOn = (html) => that.renderRootOn(html).append(that.renderContentOn);

  that.update = () => {
    if (!that.isAttached()) {
      return;
    }

    // Re-render
    var html = htmlBuilder();
    that.renderOn(html);

    // Replace our self
    that.root().replaceWith(html.root().element());
  };

  return Object.assign(that, ...mixin);
};

export default widget;
