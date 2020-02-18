var display = (function () {

  var element = undefined;

  function addLine(html, cls, args) {
    if (element === undefined) {
      element = document.createElement('ul');
      element.setAttribute('id', 'display');
      document.body.appendChild(element);
    }
    line = document.createElement('li');
    if (cls) {
      line.setAttribute('class', cls);
    }
    if (args) {
      line.setAttribute('data-args', JSON.stringify(args));
    }
    line.innerHTML = html;
    element.appendChild(line);
  }

  return {
    log: function (html) {
      addLine(html);
    },
    cmd: function (html) {
      addLine(html, 'cmd');
    },
    res: function (html, args) {
      addLine(html, 'res', args);
    }
  };
})();

var rnd = (function () {
  return {
    int: function (min, max) {
      return min + Math.floor(Math.random() * (max - min));
    },
    intArray: function (min, max, length) {
      var self = this;
      return Array.apply(null, Array(length)).map(function () {
        return self.int(min, max);
      });
    }
  };
})();
