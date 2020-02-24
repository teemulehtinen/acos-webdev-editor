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
    preExecuteJs: '\nconst originalAlert = alert;\nalert = function(msg) {\n\tdisplay.cmd("Alert detected, checking argument:");\n\tif(msg === "I want points!") {\n\t\tdisplay.res("Match!", [true]);\n\t\toriginalAlert("Congratulations you got some points for saying: " + msg);\n\t} else {\n\t\tdisplay.res("No match!", [false]);\n\t\toriginalAlert("You didn\'t want points, your argument was: " + msg);\n\t}\n};',
    points: function ($element, config, accessor) {
      var p = accessor.testResults(10, function(i , args, res) {
        return args[0] === true ? 10 : 0;
      });
      return { points: p };
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
    postExecuteJs: 'display.cmd("apples"); \n display.res(apples, 7);',
    executeAtStart: true,
    points: function ($element, config, accessor) {
      var p = accessor.testResults(10, function (i, args, res) {
        return res == 7 ? 10 : 0;
      });
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
    postExecuteJs: 'display.cmd("message"); \n display.res(message, \'"This is easy", the student shouted\');',
    executeAtStart: true,
    points: function ($element, config, accessor) {
      var p = accessor.testResults(10, function (i, args, res) {
        return res == '"This is easy", the student shouted' ? 10 : 0;
      });
      return { points: p };
    },
    maxPoints: 10,
    title: "String handling",
    description: "Assign a string with quotation marks to a variable",
    concepts: ["JavaScript", "string"],
    order: 2
  },
  double_number_function: {
    instructions: "Define a function called <code>doubleNumber</code>, that takes a number as parameter and returns the given number multiplied by 2",
    initialJs: '',
    postExecuteJs: 'var a = Math.floor((Math.random() * 100) + 1);\n'
    + 'display.cmd("doubleNumber(" + a + ")");\n'
    + 'display.res(doubleNumber(a), [a]);',
    executeAtStart: false,
    points: function ($element, config, accessor) {
      var p = accessor.testResults(10, function (i, args, res) {
        return parseInt(res) === args[0]*2 ? 10 : 0;
      });
      return { points: p }
    },
    maxPoints: 10,
    title: "declare doubleNumber function",
    concepts: ["JavaScrit", "function declaration"],
    order: 3
  },
  half_number_function: {
    instructions: "Define a function called <code>halveNumber</code>, that takes a number as parameter and returns the given number divided by 2",
    initialJs: '',
    postExecuteJs: 'var a = Math.floor((Math.random() * 100) + 1);\n'
    + 'display.cmd("halveNumber(" + a + ")");\n'
    + 'display.res(halveNumber(a), [a]);',
    executeAtStart: false,
    points: function ($element, config, accessor) {
      var p = accessor.testResults(10, function (i, args, res) {
        return parseFloat(res) === args[0]/2 ? 10 : 0;
      });
      return { points: p }
    },
    maxPoints: 10,
    title: "declare halveNumber function",
    concepts: ["JavaScrit", "function declaration"],
    order: 3
  }
};

module.exports = Content;
