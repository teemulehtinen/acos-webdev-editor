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
        return { $li: $li, result: $li.html(), args: JSON.parse($li.attr('data-args')) };
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
  this.editorExecute();
  setTimeout(function () {
    cb(self.config.points(self.$element, self.config, accessor));
  }, 100);
};

ACOSWebdev.prototype.extendProtocolFeedback = function (feedback) {
  var $out = $(this.$editorOutput.find('iframe').get(0).contentWindow.document.body);
  $out.find('script').remove();
  return '<pre><code>' + this.editor.getValue() + '</code></pre><div>' + $out.html() + '</div>';
};

ACOSWebdev.prototype.editorExecute = function () {
  var $iframe = $('<iframe src="about:blank"></iframe>');
  this.$editorOutput.empty().append($iframe);
  $iframe.get(0).contentWindow.contents = '<!DOCTYPE html>\n'
    + '<html>\n<head>\n'
    + '<title>Executing editor code</title>\n'
    + '<link href="/static/webdev-editor/webdev-editor.css" rel="stylesheet">\n'
    + '<script src="/static/webdev-editor/webdev-execute.js"></script>\n'
    + '</head>\n<body class="execute">\n'
    + (this.config.preExecuteHtml || '')
    + '<script>' + (this.config.preExecuteJs || '')
    + this.editor.getValue()
    + (this.config.postExecuteJs || '') + '</script>\n'
    + '</body>\n</html>\n';
  $iframe.attr('src', 'javascript:window["contents"]');
};
