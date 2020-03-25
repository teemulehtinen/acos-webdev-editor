/* global module, require, console */
/* jshint globalstrict: true */
'use strict';

let Content = {

  array_sum: {
    instructions: "The following JavaScript-function should calculate the sum of all integers given as an array. There seems to be an error and your task is to fix the function.",
    initialJs: 'function arraySum(arr) {\n  var s = 0;\n  for (var i = 1; i <= arr.length; i++) {\n    s += i;\n  }\n  return s;\n}\n',
    postExecuteJs: ';\n'
      + 'for (var i = 0; i < 2; i++) {\n'
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
    preExecuteJs: ''
    + 'const originalAlert = alert;\n'
    + 'alert = function(msg) {\n'
    + '  display.cmd("Alert detected, checking argument:");\n'
    + '  if (msg === "I want points!") {\n'
    + '    display.res("Match!", [true]);\n'
    + '    originalAlert("Congratulations you got some points for saying: " + msg);\n'
    + '  } else {\n'
    + '    display.res("No match!", [false]);\n'
    + '    originalAlert("You didn\'t want points, your argument was: " + msg);\n'
    + '  }\n'
    + '};\n',
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
    postExecuteJs: ';\n display.cmd("apples");\n display.res(apples, "");\n',
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
    postExecuteJs: ';\n display.cmd("message");\n display.res(message, "");\n',
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
    postExecuteJs: ';\n'
    + 'var a = Math.floor((Math.random() * 100) + 1);\n'
    + 'display.cmd("doubleNumber(" + a + ")");\n'
    + 'display.res(doubleNumber(a), [a]);\n',
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
    postExecuteJs: ';\n'
    + 'var a = Math.floor((Math.random() * 100) + 1);\n'
    + 'display.cmd("halveNumber(" + a + ")");\n'
    + 'display.res(halveNumber(a), [a]);\n',
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
    preExecuteJs: ''
    + 'const originalLog = console.log;\n'
    + 'console.log = function(msg) {\n'
    + '  display.cmd("Console detected, checking argument:");\n'
    + '  if (msg === \'"This is easy", the student shouted\') {\n'
    + '    display.res("Match!", [true]);\n'
    + '    originalLog("Congratulations, you got some points for printing: " + msg);\n'
    + '  } else {\n'
    + '    display.res("No match!", [false]);\n'
    + '    originalLog("You didn\'t get any points, your argument was: " + msg);\n'
    + '  }\n'
    + '};\n',
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
    postExecuteJs: ';\n'
    + 'let randA = Math.floor((Math.random() * 15) + 1);\n'
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
    preExecuteJs: ''
    + 'let consolePrint = [];\n'
    + 'const originalLog = console.log;\n'
    + 'console.log = function(msg) {\n'
    + '  originalLog(msg);\n'
	  + '  consolePrint.push(msg);\n'
    + '};\n',
    postExecuteJs: ';\n'
    + 'display.cmd("Console received:");\n'
    + 'display.res(consolePrint.join(", "), consolePrint);\n',
    executeAtStart: false,
    points: function ($element, config, accessor) {
      let correct = [5, 4, 3, 2, 1, 0, 'Lift off!'];
      let p = accessor.testResults(10, function(i , args, res) {
        return correct.every(function (e, i) {
          return args[i] == e;
        }) ? 10 : 0;
      });
      return { points: p };
    },
    maxPoints: 10,
    title: "While loop",
    description: "Create a while loop, that counts down from 5 to 0 and after the loop prints \"Lift off!\"",
    concepts: ["JavaScript", "while", "conditional", "strings"],
    order: 8
  },

  numbers_array: {
    instructions: "Define <code>numbers</code> to be an array that contains positive even integers up to (and including) ten.",
    initialJs: 'let numbers;',
    postExecuteJs: ';\n'
    + 'let indices = [0,1,2,3,4];\n'
    + 'indices.forEach(i => {\n'
    + '  display.cmd("numbers[" + i + "]");\n'
    + '  display.res((numbers || [])[i], i);\n'
    + '});\n',
    executeAtStart: false,
    points: function ($element, config, accessor) {
      var p = accessor.testResults(2, function (i, args, res) {
        return parseInt(args) * 2 + 2 == parseInt(res) ? 2 : 0;
      });
      return { points: p };
    },
    maxPoints: 10,
    title: "Numbers array",
    description: "Define an array that includes even positive integers up to (and including) ten.",
    concepts: ["JavaScript", "variable", "assignment", "array", "integer"],
    order: 9
  },

  define_object: {
    instructions: "Your task is to define an object to the variable myStuff. It should have the following keys <code>fruit</code>, <code>amount</code>, and <code>pinCode</code>. The keys should have the following values (in corresponding order): <code>'apple'</code>, <code>3</code>, and <code>[1,2,3,4]</code>",
    initialJs: 'let myStuff;',
    postExecuteJs: ';\n'
    + 'let keys = ["fruit", "amount", "pinCode"];'
    + 'keys.forEach(k => {'
    + '  display.cmd("myStuff." + k);\n'
    + '  display.res(myStuff[k], myStuff[k] || [false]);\n'
    + '});\n',
    executeAtStart: false,
    points: function ($element, config, accessor) {
      let ans = [ "apple", 3,  [1,2,3,4] ];
      var p = accessor.testResults(4, function (i, args, res) {
        return res == ans[i] ? 4 : 0;
      });
      return { points: p };
    },
    maxPoints: 10,
    title: "Define object",
    description: "Define an object with specific keys and values",
    concepts: ["JavaScript", "variable", "assignment", "object", ],
    order: 10
  },

  note_array: {
    instructions: "Define <code>notes</code> to be an array that contains 7 \"note arrays\" that are pairs of note pitch and it's length, e.g. <code>[\"C5\",\"8n\"]</code>. The array must first have four sixteenth (16n) notes A4, B4, C#4, A4. Then, TWICE the eighth (8n) note E5. And finally, the half (2n) note C#4.",
    initialJs: 'let notes;',
    postExecuteJs: ';\n'
    + 'let notesTimed = [];'
    + 'display.cmd([0,1,2,3,4,5,6].map(i => { return "notes[" + i + "]"; }).join(", "));\n'
    + 'for (var i = 0; i < 7; i++) {\n'
    + '  display.res(JSON.stringify((notes || [])[i]), (notes || [])[i]);\n'
    + '  if (notes && notes[i] && notes[i].length > 1) {\n'
    + '   notesTimed.push(notes[i]);\n'
    + '  }\n'
    + '}\n'
    + 'document.write("<script src=\\"https://cdnjs.cloudflare.com/ajax/libs/tone/14.5.41/Tone.js\\"></"+"script>");\n'
    + 'function music() {\n'
    + '  var synth = new Tone.Synth().toDestination();\n'
    + '  var pattern = new Tone.Pattern(function(time, note) {\n'
    + '    synth.triggerAttackRelease(note[0], note[1]);\n'
    + '  }, notesTimed);\n'
    + '  pattern.start(0);\n'
    + '  Tone.Transport.bpm.value = 160;\n'
    + '  Tone.Transport.start();\n'
    + '}\n'
    + 'if (notesTimed.length > 0) {\n'
    + '  document.write("<button onclick=\\"music();\\">Play music</button>");\n'
    + '}\n',
    executeAtStart: false,
    points: function ($element, config, accessor) {
      var correct = [["A4","16n"],["B4","16n"],["C#4","16n"],["A4","16n"],["E5","8n"],["E5","8n"],["C#4","2n"]];
      var p = accessor.testResults(1, function (i, args, res) {
        if (args !== undefined && args.length > 1) {
          return args[0] == correct[i][0] && args[1] == correct[i][1] ? (i > 3 ? 2 : 1) : 0;
        }
        return 0;
      });
      return { points: p };
    },
    maxPoints: 10,
    title: "Notes array",
    description: "Define an array of arrays.",
    concepts: ["JavaScript", "variable", "assignment", "array", "nested"],
    order: 11
  },

  repeat_note: {
    instructions: 'Create a function called <code>repeatNote</code>, that takes as parameters a <code>note</code> as string and a number <code>n</code>.</br>'
    +'The function returns a string where the given <code>note</code> is repeated <code>n</code> numbers of times, each time separated by a white space,'
    + ' without white space at the end.</br>'
    +'For example calling <code>repeatNote("C#", 3)</code> should return <code>"C# C# C#"</code>.</br>'
    + 'There are a number of ways to achieve this, for example by using the following methods: '
    + '<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat" target="_blank">MDN string.repeat()</a> and '
    + '<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim" target="_blank">MDN string.trim()</a>',
    initialJs: '',
    preExecuteJs: ''
    + 'let scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];\n'
    + 'let rand = Math.floor((Math.random() * 100) + 1);\n'
    + 'let ind = Math.floor((Math.random() * 11) + 1);\n'
    + 'display.cmd("repeatNote(\\"" + scale[ind] + "\\", " + rand + ")");\n'
    + 'display.res(repeatNote(scale[ind], rand), [scale[ind], rand]);\n',
    executeAtStart: false,
    points: function ($element, config, accessor) {
      let p = accessor.testResults(10, function(i , args, res) {
        return res === (args[0] + ' ').repeat(args[1]).trim() ? 10 : 0;
      });
      return { points: p };
    },
    maxPoints: 10,
    title: "Repeat note and trim",
    description: "Create a function that takes a string and repeats it n numbers of times",
    concepts: ["JavaScript", "repeat", "strings"],
    order: 12
  },

  query_selector_all: {
    instructions: `The text of the pizza toppings is wrong, help us fix it.
    Find all the <code>li</code> elements within the <code>ul</code> element with
    <code>id="pizza-toppings"</code> using the <code>document.querySelectorAll()</code>
    method. Then fix the <em>innerText</em> of each element. The grader does not care
    if you are using upper case letters or not, so don't worry about that.
    Finally print the NodeList to the console. For example:<br/>
    <code><br/>
    let toppings = document.querySelectorAll(/*your code here*/);<br/>
    /*Go through the Nodes in the toppings variable and set the right innerText*/<br/>
    /*......*/<br/>
    console.log(toppings);<br/>
    </code><br/>
    If your code is correct, the names in the list below the editor will change.
    Testing with the dev tools console on the exercise itself might not give the
    expected results and might also break the grading. For this reason we advise
    you to copy the following code into an empty HTML file, and test your solution
    in there by opening it within with the browser and using the developer tools
    console:<br/>
    <code><br/>
    &lt;!DOCTYPE html&gt;<br/>
    &lt;html lang="en"&gt;<br/>
    &emsp;&lt;head&gt;<br/>
    &emsp;&emsp;&lt;meta content="text/html;charset=utf-8" http-equiv="Content-Type"&gt;<br/>
    &emsp;&emsp;&lt;meta content="utf-8" http-equiv="encoding"&gt;<br/>
    &emsp;&lt;/head&gt;<br/>
    &emsp;&lt;body&gt;<br/>
    &emsp;&emsp;&lt;h3&gt;Pizza toppings:&lt;/h3&gt;<br/>
    &emsp;&emsp;&lt;ul id="pizza-toppings"&gt;<br/>
    &emsp;&emsp;&emsp;&lt;li&gt;Batsilica&lt;/li&gt;<br/>
    &emsp;&emsp;&emsp;&lt;li&gt;Tomtato&lt;/li&gt;<br/>
    &emsp;&emsp;&emsp;&lt;li&gt;Morezarella&lt;/li&gt;<br/>
    &emsp;&emsp;&emsp;&lt;li&gt;Hamster&lt;/li&gt;<br/>
    &emsp;&emsp;&lt;/ul&gt;<br/>
    &emsp;&lt;/body&gt;<br/>
    &lt;/html&gt;<br/>
    </code> `,
    initialJs: '',
    preExecuteJs:`
    let consolePrint = [];
    const originalLog = console.log;
    console.log = function(msg) {
      originalLog(msg);
      display.res(msg, [msg[0].innerText, msg[1].innerText, msg[2].innerText, msg[3].innerText]);
    };
    let listDiv = document.createElement('div');
    listDiv.innerHTML = '<h3>Pizza toppings:</h3><ul id="pizza-toppings"><li>Batsilica</li><li>Tomtato</li><li>Morezarella</li><li>Hamster</li></ul>'
    document.body.appendChild(listDiv)
    `,
    executeAtStart: true,
    points: function ($element, config, accessor) {
      let toppingsInaccessor = document.querySelectorAll('#pizza-toppings li');
        let correctNames = [ 'BASILICA', 'TOMATO', 'MOZZARELLA', 'HAM'];
        let p = accessor.testResults(10, function(i , args, res) {
          console.log('res:', res);
          console.log('args:', args);
          let points = 0;
          args.forEach((item, i) => {
            console.log('In testResults', item)
            if(item.toUpperCase() === correctNames[i]) {
              points += 2.5;
            }
          });
          return points;
        });
        return { points: p };
    },
    maxPoints: 10,
    title: "Select and modify the right element",
    description: "",
    concepts: ["JavaScript", "querySelectorAll", "id"],
    order: 13
  },

};

module.exports = Content;
