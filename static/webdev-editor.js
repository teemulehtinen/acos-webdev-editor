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
      self.log({ type: 'editor-ctrl-enter' }, true);
      self.grade();
    }
  });

  var js = ace.createEditSession(this.config.initialJs || '');
  js.setMode('ace/mode/javascript');
  js.on('change', function (delta) {
    self.log({
      type: 'editor-change',
      start: delta.start,
      end: delta.end,
      lines: delta.lines,
      action: delta.action
    });
  });
  this.editor.setSession(js);

  this.$editorOutput = this.$element.find('.exercise .output');

  if (this.config.executeAtStart) {
    this.extendGrade(undefined, function (r) {});
  }

  if (this.config.replay) {
    this.replayIndex = 0;
    this.replayTo(this.config.replay[0].time);
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
    var r = self.config.points(self.$element, self.config, accessor);
    if (self.config.qlcs && (r.points || 0) >= (self.config.qlcs.requirePoints || 0)) {
      self.generateQLCs(r.points || 0);
    }
    cb(r);
  });
};

ACOSWebdev.prototype.extendProtocolFeedback = function (feedback) {
  var $out = $(this.$editorOutput.find('iframe').get(0).contentWindow.document.body);
  $out.find('script').remove();
  var $qlc = $(this.$element.find('.exercise .qlcs')).clone();
  $qlc.find('input').prop('disabled', true);
  var checked = this.$element.find('.exercise .qlcs input').map((i, e) => e.checked).get();
  $qlc.find('input').each((i, e) => {
    if (checked[i]) {
      $(e).attr('checked', true);
    }
  });
  return '<pre><code>' + this.esc(this.editor.getValue()) + '</code></pre><div>'
    + $out.html() + '</div><div>' + $qlc.html() + '</div>';
};

ACOSWebdev.prototype.generateQLCs = function (points) {

  function logQlcOption(option) {
    const data = {
      qlctype: option.type,
      answer: option.answer,
    };
    if (option.correct) {
      data.correct = option.correct;
    }
    return data;
  }

  function logQlc(qlc) {
    return {
      qlctype: qlc.type,
      question: qlc.question,
      options: qlc.options.map(logQlcOption),
    };
  }

  var self = this;
  var qlcContent = qlcjs.generate(
    this.editor.getValue(),
    this.config.qlcs.request,
    this.config.qlcs.input
  );
  self.log({ type: 'qlc-init', qlcs: qlcContent.map(logQlc) });
  var qlcPoints = this.config.qlcs.rewardPoints;
  var lastPoints = points;
  this.$element.find('.exercise .qlcs').html(SimpleQuizForm(
    qlcPoints,
    qlcContent,
    (qlcIndex, optionIndex, isChecked, solved, total) => {
      const opt = qlcContent[qlcIndex].options[optionIndex];
      if (isChecked) {
        self.log({ type: 'qlc-select', qlc: qlcIndex, option: logQlcOption(opt) });
      } else {
        self.log({ type: 'qlc-deselect', qlc: qlcIndex, option: logQlcOption(opt) });
      }
      var newPoints = points + Math.floor(solved / total * qlcPoints);
      if (newPoints != lastPoints) {
        lastPoints = newPoints;
        self.update(newPoints);
      }
    }
  ));
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

ACOSWebdev.prototype.replayTo = function (toTime) {
  if (this.replayTimeout) {
    clearTimeout(this.replayTimeout);
  }
  let event = this.config.replay[this.replayIndex];
  if (toTime > event.time) {
    event = this.config.replay[this.replayIndex + 1];
    while (event && event.time <= toTime) {
      this.replayEventForward(event);
      this.replayIndex += 1;
      event = this.config.replay[this.replayIndex + 1];
    }
  } else if (toTime < event.time) {
    event = this.config.replay[this.replayIndex - 1];
    while (event && event.time >= toTime) {
      this.replayEventBackward(event);
      this.replayIndex -= 1;
      event = this.config.replay[this.replayIndex - 1];
    }
  }
  event = this.config.replay[this.replayIndex + 1];
  if (event) {
    let delay = event.time - toTime;
    if (delay > 10000) {
      let s = Math.round(delay / 1000);
      if (s < 60) {
        this.displayNote(`${s} sec later...`, '50%', '20%');
      } else {
        let m = s / 60;
        if (m < 60) {
          this.displayNote(`${m.toFixed(1)} min later...`, '50%', '20%');
        } else {
          this.displayNote(`${(m / 60).toFixed(1)} hours later...`, '50%', '20%');
        }
      }
      delay = 5000;
    }
    this.replayTimeout = setTimeout(() => this.replayTo(event.time), delay);
  }
};

ACOSWebdev.prototype.replayEventForward = function (event) {
  this.removeNote();
  switch (event.type) {
    case 'mouseClick':
      this.displayNote('click', event.x, event.y);
      break;
    case 'editor-change':
      let session = this.editor.getSession();
      switch (event.action) {
        case 'insert':
          session.insert(event.start, event.lines.join('\n'));
          break;
        case 'remove':
          session.remove({ start: event.start, end: event.end });
          break;
        default:
          console.log('replay', event);
      }
      break;
    default:
      console.log('replay', event);
  }
};

ACOSWebdev.prototype.replayEventBackward = function (event) {
  console.log('TODO backward event', event);
};

ACOSWebdev.prototype.displayNote = function (note, x, y) {
  this.$element.append($('<div class="acos-replay-note"></div>').html(note).css({
    position: 'absolute',
    left: typeof x === 'number' ? `${x}px` : x,
    top: typeof y === 'number' ? `${y}px` : y,
    'z-index': 10,
  }));
};

ACOSWebdev.prototype.removeNote = function () {
  this.$element.find('.acos-replay-note').remove();
}
