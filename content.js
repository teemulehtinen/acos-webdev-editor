/* global module, require, console */
/* jshint globalstrict: true */
'use strict';

let Content = {

  sample: {
    instructions: "Here is a code editor. You can edit the code and see the result on the <strong>test</strong>-tab.",
    html: "",
    selector: ".exercise button",
    events: "click",
    points: function ($element, config, event) {
      return {
        points: 10,
        feedback: 'Congratulations!'
      };
    },
    maxPoints: 10,
    title: "Editor sample",
    description: "A sample of creating an editor exercise.",
    concepts: ["Sample"],
    order: 0
  },

};

module.exports = Content;
