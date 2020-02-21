/* global module, require, console */
/* jshint globalstrict: true */
'use strict';

let Content = {

  array_sum: {
    instructions: "The following JavaScript-function should calculate the sum of all integers given as an array. There seems to be an error and your task is to fix the function.",
    initialJs: 'function arraySum(arr) {\n  var s = 0;\n  for (var i = 1; i <= arr.length; i++) {\n    s += i;\n  }\n  return s;\n}\n',
    postExecuteJs: 'for (var i = 0; i < 2; i++) {\n'
      + '  var a = rnd.intArray(10, 99, 4);\n'
      + '  display.cmd("arraySum(" + JSON.stringify(a) + "]);");\n'
      + '  display.res(arraySum(a), a);\n'
      + '}\n',
    executeAtStart: true,
    points: function ($element, config, accessor) {
      var p = accessor.testResults(5, function (i, args, res) {
        return args.reduce(function(s, v) { return s + v; }, 0) == parseInt(res) ? 5 : 0;
      });
      console.log('points', p);
      return { points: p };
    },
    maxPoints: 10,
    title: "Array Sum",
    description: "Fix a function that calculates array sum.",
    concepts: ["JavaScript", "function"],
    order: 0
  },

  easy_points: {
    instructions: "Your task is to call <code>alert<code> function with the argument 'I want points!'.",
    initialJs: '',
    preExecuteJs: '\nconst originalAlert = alert;\nvar givePoints = false;\nalert = function(msg) {\n\tif(msg === "I want points!") {\n\t\toriginalAlert("Congratulations you got some points for saying: " + msg);\n\t givePoints = true \n\t} else {\n\t\toriginalAlert("You didn\'t want points, your argument was: " + msg);\n\t}\n};',
    postExecuteJs: '\nconsole.log(givePoints);\n',
    executeAtStart: true,
    points: function ($element, config, accessor) {
      return { points: 0 };
    },
    maxPoints: 10,
    title: "Easy Points",
    description: "Get some easy points by calling alert with correct argument",
    concepts: ["JavaScript", "function"],
    order: 1
  },
  assigning_variables: {
    instructions: "The variable <code>apples</code> should have the value 7.",
    initialJs: 'let apples;',
    postExecuteJs: 'display.cmd(apples); \n display.res(apples, 7);',
    executeAtStart: true,
    points: function ($element, config, accessor) {
      var p = accessor.testResults(5, function (i, args, res) {
        return res == 7 ? 10 : 0;
      });
      console.log('points', p);
      return { points: p };
    },
    maxPoints: 10,
    title: "Variable assignment",
    description: "Assign value 7 to apples variable.",
    concepts: ["JavaScript", "variable", "assignment"],
    order: 2
  },

  string_handling: {
    instructions: "<code>message</code> variable should have the value: <code>\"This is easy\", the student shouted</code>",
    initialJs: 'let message;',
    postExecuteJs: 'display.cmd(message); \n display.res(message, \'"This is easy", the student shouted\');',
    executeAtStart: true,
    points: function ($element, config, accessor) {
      var p = accessor.testResults(5, function (i, args, res) {
        return res == '"This is easy", the student shouted' ? 10 : 0;
      });
      console.log('points', p);
      return { points: p };
    },
    maxPoints: 10,
    title: "String handling",
    description: "Assign a string with quotation marks to a variable",
    concepts: ["JavaScript", "string"],
    order: 2
  },
};

module.exports = Content;
