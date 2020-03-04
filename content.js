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
    instructions: "Your task is to call <code>alert</code> function with the argument 'I want points!'.",
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
    order: 3
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
    order: 4
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
    order: 5
  },

  string_printing: {
    instructions: "You should print the following message with console.log: <code>\"This is easy\", the student shouted</code>",
    initialJs: '',
    preExecuteJs: 'const originalLog = console.log;\nconsole.log = function(msg) {\n\tdisplay.cmd("Console detected, checking argument:");\n\tif(msg === \'"This is easy", the student shouted\') {\n\t\tdisplay.res("Match!", [true]);\n\t\toriginalLog("Congratulations you got some points for printing: " + msg);\n\t} else {\n\t\tdisplay.res("No match!", [false]);\n\t\toriginalLog("You get any points, your argument was: " + msg);\n\t}\n};',
    executeAtStart: true,
    points: function ($element, config, accessor) {
      var p = accessor.testResults(10, function(i , args, res) {
        return args[0] === true ? 10 : 0;
      });
      return { points: p };
    },
    maxPoints: 10,
    title: "String printing",
    description: "Get some easy points by calling console.log with correct argument",
    concepts: ["JavaScript", "function", "console.log", "strings"],
    order: 6
  },

  conditional_temperature: {
    instructions: "Write a function called <code>readTemperature</code> that takes a temperature value (number) as parameter, and returns 'Cold', when the temperature is 15 degrees celcius or below, 'Moderate' when it is over 15 degrees but less or equal to 25 degrees, and 'Hot' when the temperature is over 25 degrees",
    initialJs: '',
    preExecuteJs: 'let randA = Math.floor((Math.random() * 15) + 1);\n'
    + 'let randB = Math.floor((Math.random() * 26) + 1);\n'
    + 'let randC = Math.floor((Math.random() * 36) + 1);\n'
    + 'let testValues = [25, randA, 15, 24, randB, 16, 14, randC, 26];\n'
    + 'let results = [];\n'
    + 'testValues.forEach(t => {'
    + '  display.cmd("readTemperature(" + t + ")");\n'
    + '  results.push(readTemperature(t));\n'
    + '});\n'
    + 'display.res(results, testValues);',
    executeAtStart: false,
    points: function ($element, config, accessor) {
      var p = accessor.testResults(10, function (i, args, res) {
        let resArray = res.split(",");
        let correct = args.every((t, index) => {
          if(t <= 15) {
            return resArray[index] === 'Cold';
          }
          else if(t > 25) {
            return resArray[index] === 'Hot';
          }
          return resArray[index] === 'Moderate';
        })
        return correct ? 10 : 0
      });
      return { points: p }
    },
    maxPoints: 10,
    title: "Read the temperature",
    description: "Read the temperature and return the correct string",
    concepts: ["JavaScript", "function", "conditional", "strings"],
    order: 7
  },

  while_loop: {
    instructions: "Create a while loop, that counts down from 5 to 0 (print the numbers using console.log), and after the loop it prints \"Lift off!\" to the console",
    initialJs: '',
    preExecuteJs: 'let consolePrint = [];\n'
    + 'const originalLog = console.log; \n'
    + 'console.log = function(msg) {\n'
    + '\toriginalLog(msg);\n'
	  + '\tconsolePrint.push(msg);\n'
    + '};\n'
    + '\tlet correct = consolePrint.every((line,i) => {\n'
    + '\t\treturn i === 6 ? line === \"Lift off!\" : line === consolePrint.length-2 -i\n'
    + '\t});'
    + 'originalLog(\"correct\", correct);'
    + 'display.cmd("Checking log");\n'
    + '\tdisplay.res(consolePrint, correct);\n'
    + 'setTimeout( () => display.cmd(consolePrint), 50 );\n',
    executeAtStart: false,
    points: function ($element, config, accessor) {
      let p = accessor.testResults(10, function(i , args, res) {
        return args === true ? 10 : 0;
      });
      console.log('element', $element);
      return { points: p };
    },
    maxPoints: 10,
    title: "While loop",
    description: "Create a while loop, that counts down from 5 to 0 and after the loop prints \"Lift off!\"",
    concepts: ["JavaScript", "while", "conditional", "strings"],
    order: 8
  }
};

module.exports = Content;
