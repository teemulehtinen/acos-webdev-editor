/* jshint globalstrict: true */

"use strict";

ACOSWebdev.prototype.extendReset = function () {
  var self = this;
  this.editor = ace.edit(this.$element.find('.exercise .editor').get(0));
  this.editor.setOptions({
    theme: 'ace/theme/tomorrow_night_bright'
  });
  this.editor.commands.addCommand({
    name: 'Execute',
    bindKey: { win: 'Ctrl-Enter', mac: 'Command-Enter' },
    exec: function () {
      self.log.push({
        type: 'editor-ctrl-enter',
        time: new Date().getTime()
      });
      self.grade();
    }
  });

  var js = ace.createEditSession(this.config.initialJs || '');
  js.setMode('ace/mode/javascript');
  js.on('change', function (delta) {
    self.log.push({
      type: 'editor-change',
      start: delta.start,
      end: delta.end,
      lines: delta.lines,
      action: delta.action,
      time: new Date().getTime()
    });
  });
  this.editor.setSession(js);

  this.$editorOutput = this.$element.find('.exercise .output');

  if (this.config.executeAtStart) {
    this.extendGrade(undefined, function (r) {});
  }
};

ACOSWebdev.prototype.extendGrade = function (eventOrMutations, cb) {
  var self = this;
  var accessor = {
    code: function () {
      return self.editor.getValue();
    },
    doc: function () {
      return self.$editorOutput.find('iframe').get(0).contentWindow.document;
    },
    display: function () {
      return this.doc().getElementById('display');
    },
    $res: function () {
      return $(this.display()).find('li.res');
    },
    results: function () {
      return this.$res().map(function () {
        var $li = $(this);
        var res = $li.find('pre.args').remove().text();
        return { $li: $li, result: $li.html(), args: res ? JSON.parse(res) : undefined };
      }).get();
    },
    testResults: function (max_points, test) {
      return this.results().reduce(function (points, item, index) {
        var p = test(index, item.args, item.result);
        item.$li.addClass(p >= max_points ? 'success text-success' : 'error text-danger');
        return points + p;
      }, 0);
    }
  };
  this.editorExecute(function () {
    cb(self.config.points(self.$element, self.config, accessor));
  });
};

ACOSWebdev.prototype.extendProtocolFeedback = function (feedback) {
  var $out = $(this.$editorOutput.find('iframe').get(0).contentWindow.document.body);
  $out.find('script').remove();
  return '<pre><code>' + this.esc(this.editor.getValue()) + '</code></pre><div>' + $out.html() + '</div>';
};

ACOSWebdev.prototype.postUpdate = function (points, maxPoints) {
  var qlcs = qlcjs.generate(this.editor.getValue(), [{ count: 3 }]);
  console.log(qlcs);
};

ACOSWebdev.prototype.esc = function (str) {
  if (str) {
    var rep = {'&': '&amp;', '<': '&lt;', '>': '&gt;'};
    return str.replace(/[&<>]/g, function (ch) {
      return rep[ch] || ch;
    });
  }
  return str;
}

ACOSWebdev.prototype.editorExecute = function (cb) {
  var $iframe = $('<iframe src="about:blank"></iframe>');
  this.$editorOutput.empty().append($iframe);
  $iframe.get(0).contentWindow.contents = '<!DOCTYPE html>\n'
    + '<html>\n<head>\n'
    + '<title>Executing editor code</title>\n'
    + '<link href="/static/webdev-editor/webdev-editor.css" rel="stylesheet">\n'
    + '<script src="/static/webdev-editor/webdev-execute.js"></script>\n'
    + '</head>\n<body class="execute">\n'
    + (this.config.preExecuteScript ? ('<script src="' + this.config.preExecuteScript + '"></script>\n') : '')
    + (this.config.preExecuteHtml || '')
    + '<script>'
    + 'try {\n'
    + (this.config.preExecuteJs || '')
    + this.editor.getValue()
    + (this.config.postExecuteJs || '')
    + '} catch (error) {\n'
    + '  display.err(error.message);\n'
    + '  throw error;\n'
    + '}\n'
    + 'window.postMessage({state: "done"}, "*");\n'
    + 'window.parent.postMessage({state: "done"}, "*");\n'
    + '</script>\n'
    + (this.config.postExecuteHtml || '')
    + (this.config.postExecuteScript ? ('<script src="' + this.config.postExecuteScript + '"></script>\n') : '')
    + '</body>\n</html>\n';
  function onDone(event) {
    if (event.data.state == 'done') {
      window.removeEventListener('message', onDone);
      var h = $iframe.get(0).contentWindow.document.body.scrollHeight;
      $iframe.css('height', h + 10 + 'px');
      cb();
    }
  }
  window.addEventListener('message', onDone);
  $iframe.attr('src', 'javascript:window["contents"]');
};
