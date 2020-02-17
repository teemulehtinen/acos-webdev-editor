/* jshint globalstrict: true */

"use strict";

ACOSWebdev.prototype.extendReset = function () {
  this.editor = ace.edit(this.$element.find('.exercise .editor').get(0));
  this.editor.setOptions({
    theme: 'ace/theme/tomorrow_night_bright'
  });
  this.editor.commands.addCommand({
    name: 'Execute',
    bindKey: { win: 'Ctrl-Enter', mac: 'Command-Enter' },
    exec: this.editorExecute
  });

  var js = ace.createEditSession('console.log("foo");');
  js.setMode('ace/mode/javascript');
  this.editor.setSession(js);

  this.$editorOutput = this.$element.find('.exercise .output');
  $('.run-button').on('click', this.editorExecute);
};

ACOSWebdev.prototype.editorExecute = function (event) {
  if (event) {
    event.preventDefault();
  }
  var $iframe = $('<iframe src="about:blank"></iframe>');
  this.$editorOutput.empty().append($iframe);
  $iframe.get(0).contentWindow.contents = '<!DOCTYPE html>\n'
    + '<html>\n<head>\n'
    + '<title>Executing editor code</title>\n'
    + '<link href="/static/webdev-editor/webdev-editor.css" rel="stylesheet">\n'
    + '<script src="/static/webdev-editor/webdev-execute.js"></script>\n'
    + '</head>\n<body class="execute">\n'
    + '<script>' + this.editor.getValue() + '</script>\n'
    + '</body>\n</html>\n';
  $iframe.attr('src', 'javascript:window["contents"]');
};

ACOSWebdev.prototype.extendGrade = function (eventOrMutations) {
  var self = this;
  var accessor = {
    code: function () {
      return self.editor.getValue();
    },
    output: function () {
      return this.$editorOutput.find('iframe').get(0); //TODO test contents on console
    }
  };
  return this.config.points(this.$element, this.config, accessor);
};
