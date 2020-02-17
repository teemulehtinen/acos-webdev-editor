var display = (function () {

  var element = undefined;

  function addLine(cls, html) {
    if (element === undefined) {
      element = document.createElement('ul');
      element.setAttribute('class', 'display');
      document.body.appendChild(element);
    }
    line = document.createElement('li');
    line.setAttribute('class', cls);
    line.innerHTML = html;
    element.appendChild(line);
  }

  return {

    log: function (html) {
      addLine('log', html);
    },

    success: function (html) {
      addLine('success', html);
    },

    warning: function (html) {
      addLine('warning', html);
    },

    error: function (html) {
      addLine('error', html);
    }
  };
})();
