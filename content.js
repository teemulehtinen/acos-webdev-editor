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
    postExecuteJs: ';'
      + 'window["sequence"] = [];\n'
      + 'display.cmd([0,1,2,3,4,5,6].map(i => { return "notes[" + i + "]"; }).join(", "));\n'
      + 'for (var i = 0; i < 7; i++) {\n'
      + '  display.res(JSON.stringify((notes || [])[i]), (notes || [])[i]);\n'
      + '  if (notes && notes[i] && notes[i].length > 1) {\n'
      + '    window["sequence"].push(notes[i]);\n'
      + '  }\n'
      + '}\n',
    postExecuteHtml: '<button class="tone-play-sequence">Play music</button>\n',
    postExecuteScript: '/static/webdev/augment-tone.js',
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

  find_the_right_element: {
    instructions: `
    We have some really amazing blogs, but not as amazing web developers... They are trying to write a function that given a blog <code>id</code>
    returns the elements that has <code>className</code> <code>"content"</code> and is child of the <code>div</code> with the given blog <code>id</code>.</br></br>

    They have managed to write part of the function but they are still missing something, can you help us to get it working?. Belowe here is the HTML code of the page with our amazing blogs,
    if you want to do some tests you can also copy-paste it to your own file and test with it in the developer console. Click "Run & Grade" When you think 
    that your function is ready. 
    <pre><code>
    &lt;!DOCTYPE html&gt;
    &lt;html lang="en"&gt;
    &emsp;&lt;head&gt;
    &emsp;&emsp;&lt;meta content="text/html;charset=utf-8" http-equiv="Content-Type"&gt;
    &emsp;&emsp;&lt;meta content="utf-8" http-equiv="encoding"&gt;
    &emsp;&lt;/head&gt;
    &emsp;&lt;body&gt;
    &emsp;&emsp;&lt;h2&gt;Our Amazing Blogs&lt;/h2&gt;
    &emsp;&emsp;&lt;div id="blog-1"&gt;
    &emsp;&emsp;&emsp;&lt;h3&gt;How to prepare the perfect pizza&lt;/h3&gt;
    &emsp;&emsp;&emsp;&lt;p class="content"&gt;
    The secret for preparing the perfect pizza is.... #!/*?@, and ####@@@!&lt/br&gt;
    So you just have to $%!?#**- it!
    &emsp;&emsp;&emsp;&lt;/p&gt;
    &emsp;&emsp;&emsp;&lt;p class="content"&gt;
    &lt;u&gt;Upgrade to Pro to uncover the full post&lt;/u&gt;
    &emsp;&emsp;&emsp;&lt;/p&gt;
    &emsp;&emsp;&lt;/div&gt;
    &emsp;&emsp;&lt;div id="blog-2"&gt;
    &emsp;&emsp;&emsp;&lt;h3&gt;My life as a shrimp&lt;/h3&gt;
    &emsp;&emsp;&emsp;&lt;p class="content"&gt;
    Few years back I got tired of all the pressure put on me just for the fact of being a human being.
    Why does society expect you to behave like a person just for the fact of being one?!
    So I decided to turn myself into a shrimp and what happend next is amazing...
    &emsp;&emsp;&emsp;&lt;/p&gt;
    &emsp;&emsp;&emsp;&lt;p class="content"&gt;
    &lt;u&gt;Upgrade to Pro to uncover the full post&lt;/u&gt;
    &emsp;&emsp;&emsp;&lt;/p&gt;
    &emsp;&emsp;&lt;/div&gt;
    &emsp;&lt;/body&gt;
    &lt;/html&gt;
    </code></pre>`,
    initialJs: 'function getContentFromBlog(blogId) {\n'
    + '\t// Get the right div according to the given blogid\n'
    + '\tlet blog = "Replace this string with the expression to get the blog div";\n'
    + '\t// Get all elements with content class from the blog div\n'
    + '\tlet content = "Replace this string with the expression to get the elements with \'content\' class from the blog div";\n'
    + '\t// Write the return statement to return content\n'
    + '}',
    preExecuteJs:`
    let heading = document.createElement('h2');
    heading.innerText = 'Our Amazing Blogs:'

    let blog1 = document.createElement('div');
    blog1.id = 'blog-1';

    let title1 = document.createElement('h3');
    title1.innerText = 'How to prepare the perfect pizza';
    blog1.appendChild(title1);

    let content1 = document.createElement('p');
    content1.className = 'content';
    let content1InnerHTML = 'The secret for preparing the perfect pizza is.... #!/*?@, and ####@@@!</br>So you just have to $%!?#**! it!';
    content1.innerHTML = content1InnerHTML;
    blog1.appendChild(content1);


    let content1_2 = document.createElement('p');
    content1_2.className = 'content';
    let content1_2InnerHTML =  '....';
    content1_2.innerHTML = content1_2InnerHTML;
    blog1.appendChild(content1_2);

    let underlined1 = document.createElement('p');
    underlined1.innerHTML = '<u>Upgrade to Pro to uncover the full post</u>';
    blog1.appendChild(underlined1);

    let blog2 = document.createElement('div');
    blog2.id = 'blog-2';

    let title2 = document.createElement('h3');
    title2.innerText = 'My life as a shrimp';
    blog2.appendChild(title2);

    let content2 = document.createElement('p');
    content2.className = 'content';
    let content2InnerHTML = 'Few years back I got tired of all the pressure put on me just for the fact of being a human being. Why does society expect you to behave like a person just for the fact of being one?! So I decided to turn myself into a shrimp and what happend next is amazing...';
    content2.innerHTML = content2InnerHTML
    blog2.appendChild(content2);
    
    let underlined2 = document.createElement('p');
    underlined2.innerHTML = '<u>Upgrade to Pro to uncover the full post</u>';
    blog2.appendChild(underlined2);

    document.body.appendChild(heading);
    document.body.appendChild(blog1);
    document.body.appendChild(blog2);

    let returnedContent1 = getContentFromBlog(blog1.id);
    let returnedContent2 = getContentFromBlog(blog2.id);

    let functionReturns = returnedContent1 || returnedContent2

    if (functionReturns) {
      let returnedContentsInnerHTML = [ returnedContent1[0].innerHTML, returnedContent1[1].innerHTML, returnedContent2[0].innerHTML];
      let expectedinnerHTML = [ content1InnerHTML, content1_2InnerHTML, content2InnerHTML ]
      display.res("At least one function is returning a value. Testing content... Open the developer tools console to see the logs", [returnedContentsInnerHTML, expectedinnerHTML]);
    } else {
      display.cmd("Complete the function and remember to add the return statement at the end")
    }`,
    executeAtStart: true,
    points: function ($element, config, accessor) {
        let p = accessor.testResults(10, function(i , args, res) {
          let points = 0;
          args[0].forEach( (arg, i) => {
            console.log('Testing content', i);   
            let received = arg;
            let expected = args[1][i];
            if(received === expected) {
              console.log('Content tested succesfully');
              points += config.maxPoints/args[0].length
            } else {
              console.warn('Testing content failed');
              console.warn('Expected: ', expected);
              console.warn('Received: ', received);
            }
          })
          return points;
        });
        return { points: p };
    },
    maxPoints: 10,
    title: "Find the right element",
    description: "",
    concepts: ["JavaScript", "querySelectorAll", "getElementById", "id"],
    order: 13
  },

  remove_element: {
    instructions: `Our virtual piano does not work properly, there seems to be a
    wrong key in it. Can you help us to complete the function that removes a key according to the given <code>keyValue</code>?</br></br>

    Try first getting the <code>div</code> with <code>id</code> "piano-keyboard", then get the <code>childNodes</code> from it.
    Once you have the NodeList containing the  <code>childNodes</code>, you can remove the one with <code>value</code> corresponding to the <code>keyValue</code>
    parameter. Remember that the NodeList is an object.</br></br>

    For some refresher on how to get keys and values from objects you can check these: 
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries">Object.entries()</a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values">Object.values()</a></br></br>

    Testing with the dev tools console on the exercise itself might not give the
    expected results and might also break the grading. For this reason we advise
    you to copy the following code into an empty HTML file, and test your solution
    in there by opening it within with the browser and using the developer tools
    console:
    <pre><code>
    &lt;!DOCTYPE html&gt;
    &lt;html lang="en" dir="ltr"&gt;
    &emsp;&lt;head&gt;
    &emsp;&emsp;&lt;meta charset="utf-8"&gt;
    &emsp;&lt;/head&gt;
    &emsp;&lt;body&gt;
    &emsp;&emsp;&lt;div id="piano-keyboard"&gt;
    &emsp;&emsp;&emsp;&lt;button type="button" value="C" style="width: 50px; height: 120px; padding: 2px;"&gt;C&lt;/button&gt;
    &emsp;&emsp;&emsp;&lt;button type="button" value="C#" style="width: 50px; height: 100px; background-color: #000; color: #8C8A93; padding: 2px; line-height: 10;"&gt;C#&lt;/button&gt;
    &emsp;&emsp;&emsp;&lt;button type="button" value="D♭" style="width: 50px; height: 100px; background-color: #000; color: #8C8A93; padding: 2px; line-height: 10;"&gt;D♭&lt;/button&gt;
    &emsp;&emsp;&emsp;&lt;button type="button" value="D" style="width: 50px; height: 120px; padding: 2px;"&gt;D&lt;/button&gt;
    &emsp;&emsp;&emsp;&lt;button type="button" value="D#" style="width: 50px; height: 100px; background-color: #000; color: #8C8A93; padding: 2px; line-height: 10;"&gt;D#&lt;/button&gt;
    &emsp;&emsp;&emsp;&lt;button type="button" value="E" style="width: 50px; height: 120px; padding: 2px;"&gt;E&lt;/button&gt;
    &emsp;&emsp;&lt;/div&gt;
    &emsp;&lt;/body&gt;
    &lt;/html&gt;
    </code></pre>`,
    initialJs: 'function removePianoKey(keyValue) {\n'
    + '\t// Get the piano keyboard div using its id\n'
    + '\tlet keyboard = "Replace this string with the expression to get the keyboard div";\n'
    + '\t// Get the childNodes of the keyboard\n'
    + '\tlet keys = "Replace this string with the expression to get the childNodes of the keyboard";\n'
    + '\t// Then find and remove the key from the childNodes array using the keyValue argument\n'
    + '\t\n'
    + '\treturn keyboard;\n'
    + '}',
    preExecuteJs:`
    let pianoDivInConf = document.createElement('div');
    pianoDivInConf.id = 'piano-keyboard';
    pianoDivInConf.style = 'text-align: center';
    let keys = ['C', 'C#', 'D♭', 'D', 'D#', 'E'];
    keys.forEach(key => {
      let keyButton = document.createElement('button');
      keyButton.value = key;
      keyButton.innerText = key;
      keyButton.style = key.length === 1? 'width: 50px; height: 120px; padding: 2px; background-color: #FFFFFF;' : 'width: 50px; height: 100px; background-color: #000;color: #FFFFFF; padding: 2px; line-height: 10;';
      pianoDivInConf.appendChild(keyButton);
    });
    document.body.appendChild(pianoDivInConf);

    let returnedKeyBoard = removePianoKey('D♭');
    let correctKeyRemoved = Object.values(returnedKeyBoard.childNodes).every(key => key.value !== 'D♭');

    const checkWithAllKeys = () => {
      display.cmd("Testing with other keys...");
      keys.splice(keys.findIndex(item => item === 'D♭'), 1);
      return keys.map(item => {
        return Object.values(removePianoKey(item).childNodes).map(key => key.value)
      });
    }

    if (correctKeyRemoved) {
      display.cmd("Correct key removed");
      display.res("Checking the keyboard keys... Open the developer tools console to see the logs", checkWithAllKeys());
      display.cmd("Hups, did we remove a bit too many keys... No problem");
    } else {
      display.cmd("Did yuu remove the key using the keyValue parameter and returned the keyboard div?");
    }`,
    executeAtStart: true,
    points: function ($element, config, accessor) {
        let p = accessor.testResults(10, function(i , args, res) {
          let correctKeys = ['C', 'C#', 'D', 'D#', 'E'];
          console.log('Checking that the correct keys have been removed');
          let points = args.every((item, i) => item.every(key => key !== correctKeys[i]))? 10 : 0;
          if(points === 0) {
            let wrongKeyboards = args.filter((item, i) => item.some(key => key === correctKeys[i]));
            console.warn('Some of the keyboards returned the wrong keys', wrongKeyboards);
          }
          return points;
        });
        return { points: p };
    },
    maxPoints: 10,
    title: "Select and remove the right element",
    description: "",
    concepts: ["JavaScript", "getElementById", "childNodes", "innerText", "remove"],
    order: 14
  },

  modify_element_innerText: {
    instructions: `
    Our virtual piano now has lost the notes from the keys and it is very sad. There should be C, C#, D, D#, E, etc... 
    but instead there is just ":(". Can you help us write a function, that given an array containing the key values, sets them to be the <code>value</code> 
    and <code>innerText</code> of the keys?</br></br>

    Try first getting the div with id="piano-keyboard", then get the childNodes from it. Once you have the NodeList containing the childNodes, 
    you can set the correct <code>value</code> and <code>innerText</code> attributes of each key (childNode) accoring to the given keysValues parameter. 
    Finally return the keyboard div element. Remember that the NodeList is an object.</br></br>

    For some refresher on how to get keys and values from objects you can check these: 
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries">Object.entries()</a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values">Object.values()</a></br></br>

    Testing with the dev tools console on the exercise itself might not give the
    expected results and might also break the grading. For this reason we advise
    you to copy the following code into an empty HTML file, and test your solution
    in there by opening it within with the browser and using the developer tools
    console:
    <pre><code>
    &lt;!DOCTYPE html&gt;
    &lt;html lang="en" dir="ltr"&gt;
    &emsp;&lt;head&gt;
    &emsp;&emsp;&lt;meta charset="utf-8"&gt;
    &emsp;&lt;/head&gt;
    &emsp;&lt;body&gt;
    &emsp;&emsp;&lt;div id="piano-keyboard"&gt;
    &emsp;&emsp;&emsp;&lt;button type="button" style="width: 50px; height: 120px; padding: 2px;"&gt;:(&lt;/button&gt;
    &emsp;&emsp;&emsp;&lt;button type="button" style="width: 50px; height: 100px; background-color: #000;color: #FFFFFF; padding: 2px; line-height: 10;"&gt;:(&lt;/button&gt;
    &emsp;&emsp;&emsp;&lt;button type="button" style="width: 50px; height: 120px; padding: 2px;"&gt;:(&lt;/button&gt;
    &emsp;&emsp;&emsp;&lt;button type="button" style="width: 50px; height: 100px; background-color: #000;color: #FFFFFF; padding: 2px; line-height: 10;"&gt;:(&lt;/button&gt;
    &emsp;&emsp;&emsp;&lt;button type="button" style="width: 50px; height: 120px; padding: 2px;"&gt;:(&lt;/button&gt;
    &emsp;&emsp;&lt;/div&gt;
    &emsp;&lt;/body&gt;
    &lt;/html&gt;
    </code></pre>`,
    initialJs: 'function setKeyboard(keysValues) {\n'
    + '\t// Get the piano keyboard div using its id\n'
    + '\tlet keyboard = "Replace this string with the expression to get the keyboard div";\n'
    + '\t// Get the childNodes of the keyboard\n'
    + '\tlet keys = "Replace this string with the expression to get the childNodes of the keyboard";\n'
    + '\t// Set the both the value and the innerText attributes of the keys to the given keyValues argument\n'
    + '\t\n'
    + '\treturn keyboard;\n'
    + '}',
    preExecuteJs:`
    let pianoDivInConf = document.createElement('div');
    pianoDivInConf.id = 'piano-keyboard';
    pianoDivInConf.style = 'text-align: center';
    let keys = [':(', ':(', ':(', ':(', ':('];
    keys.forEach((key, i) => {
      let keyButton = document.createElement('button');
      keyButton.value = keys[i];
      keyButton.innerText = keys[i];
      keyButton.style = (i+1)%2 === 1? 'width: 50px; height: 120px; padding: 2px; background-color: #FFFFFF;' : 'width: 50px; height: 100px; background-color: #000;color: #FFFFFF; padding: 2px; line-height: 10;';
      pianoDivInConf.appendChild(keyButton);
    });
    document.body.appendChild(pianoDivInConf);

    let correctKeys1 = ['C', 'C#', 'D', 'D#', 'E'];
    let correctKeys2 = ['F', 'F#', 'G', 'G#', 'A'];

    display.cmd('Testing with keys: ' + correctKeys1);
    let returnedKeyboard = setKeyboard(correctKeys1);
    try {
      var returnedKeysValues1 = Object.values(returnedKeyboard.childNodes).map(item => item.value);
      var returnedKeysInnertext1 = Object.values(returnedKeyboard.childNodes).map(item => item.innerText);
    } catch (err) {
      display.cmd('Did you return the keyboard div element?')
      console.log(err);
    }

    display.cmd('Testing with keys: ' + correctKeys2);
    returnedKeyboard = setKeyboard(correctKeys2);
    try {
      var returnedKeysValues2 = Object.values(returnedKeyboard.childNodes).map(item => item.value);
      var returnedKeysInnertext2 = Object.values(returnedKeyboard.childNodes).map(item => item.innerText);
    } catch (err) {
      display.cmd('Did you return the keyboard div element?')
      console.log(err);
    }

    let returnedKeysValues = [ returnedKeysValues1, returnedKeysValues2];
    let returnedKeysInnertext = [ returnedKeysInnertext1, returnedKeysInnertext2 ];

    if (returnedKeysValues.some(key => key.length > 0) || returnedKeysInnertext.some(key => key.length > 0)) {
      display.res("Checking the keyboard keys... Open the developer tools console to see the logs", [returnedKeysValues, returnedKeysInnertext]);
    } else {
      display.cmd("Did yuu return the keyboard div?")
    }`,
    executeAtStart: true,
    points: function ($element, config, accessor) {
        let p = accessor.testResults(10, function(i , args, res) {
          let points = 0;
          let correctKeys1 = ['C', 'C#', 'D', 'D#', 'E'];
          let correctKeys2 = ['F', 'F#', 'G', 'G#', 'A'];
          let correctValues1 = args[0][0].every((item, i) => item === correctKeys1[i]);
          let correctValues2 = args[0][1].every((item, i) => item === correctKeys2[i]);

          let correctInnerText1 = args[1][0].every((item, i) => item === correctKeys1[i]);
          let correctInnerText2 = args[1][1].every((item, i) => item === correctKeys2[i]);

          console.log('Checking if keys value is set correctly');
          if (correctValues1 && correctValues2) {
            points += config.maxPoints / 2;
          } else {
            console.warn(`Did you change all the values of the keyboard keys according to the given keysValues parameter? 
            \nExpected: \n${correctKeys1} \n${correctKeys2} \nReceived: \n${args[0][0]} \n${args[0][1]}`);
          }
          console.log('Checking if keys innerText are set correctly');
          if (correctInnerText1 && correctInnerText2) {
            points += config.maxPoints / 2;
          } else {
            console.warn(`Did you change all the innerTexts of the keyboard keys according to the given keysValues parameter? 
            \nExpected: \n${correctInnerText1} \n${correctInnerText2} \nReceived: \n${args[1][0]} \n${args[1][1]}`);
          }
          return points;
        });
        return { points: p };
    },
    maxPoints: 10,
    title: "Select and modify the right element",
    description: "",
    concepts: ["JavaScript", "getElementById", "childNodes", "innerText", "modify"],
    order: 14
  },

  'adjust_css_classes': {
    instructions: 'Whenever a button is clicked the function onPlay(id) that is'
      + ' given below is called. As the parameter <code>id</code> it receives'
      + ' the attribute id of the button that was just clicked. You can use this'
      + ' id to decide which of the button elements was clicked. Your task is to'
      + ' edit the function body so that you set a CSS class <code>last-played</code>'
      + ' to the last button that was clicked. Note, that multiple buttons can be'
      + ' clicked and only the last one should have the class at any time.'
      + ' Once you click "Run & Grade" the automatic grader clicks some buttons'
      + ' to check the result. After that, you can also click the buttons yourself'
      + ' to see how your code behaves.',
    preExecuteHtml: '<div id="keyboard" class="tone-keyboard">\n'
      + '  <button id="C4">C4</button>\n'
      + '  <button id="C#4" class="black">C#4</button>\n'
      + '  <button id="D4">D4</button>\n'
      + '  <button id="D#4" class="black">D#4</button>\n'
      + '  <button id="E4">E4</button>\n'
      + '</div>\n',
    initialJs: 'function onPlay(id) {\n  console.log(id);\n}\n',
    postExecuteJs: ';'
      + 'document.querySelectorAll("#keyboard button").forEach(function (button) {\n'
      + '  button.addEventListener("click", function (event) {\n'
      + '    onPlay(event.target.getAttribute("id"));\n'
      + '    display.showCode("keyboard");\n'
      + '  });\n'
      + '});\n'
      + 'display.showCode("keyboard");\n'
      + 'display.cmd("Automatically test clicking keys C4, D4, D#4, C#4, E4.")',
    postExecuteScript: '/static/webdev/augment-tone.js',
    executeAtStart: true,
    points: function ($element, config, accessor) {
      let doc = accessor.doc();
      let p = 0;
      ['C4', 'D4', 'D#4', 'C#4', 'E4'].forEach(function (id) {
        let b = doc.getElementById(id);
        if (b) {
          b.click();
          p += b.classList.contains('last-played') ? 1 : 0;
          p += doc.querySelectorAll('.last-played').length == 1 ? 1 : 0;
        }
      });
      return { points: p };
    },
    maxPoints: 10,
    title: "Adjust CSS classes",
    description: "Set CSS classes for elements based on a given element id.",
    concepts: ["JavaScript", "classList", "childNodes", "getElementById"],
    order: 15
  },

  'events': {
    instructions: `Now we want to upgrade our keyboard. We would like to show the
    note names on the buttons only when the mouse pointer enters the button, and remove them
    when the mouse pointer leaves the button. For this purpose we can use the events "mouseenter"
    and "mouseleave". Complete the code below so the on "mouseenter" event the
    <code>innerText</code> is set, and on "mouseleave" the <code>innerText</code> is removed.
    After running the code you can hover over the buttons to see what happens.  `,
    initialJs: `let buttonsIds = ['C', 'C#', 'D', 'D#', 'E'];
for(let i = 0; i < buttonsIds.length; i++) {
    let noteButton = document.getElementById(buttonsIds[i]);
    let innerText = buttonsIds[i];
    noteButton.addEventListener('add the right event type here', function(e) {
        /* Add the innerText to the note button */
    });
    noteButton.addEventListener('add the right event type here', function(e) {
        /* Remove the innerText to the note button */
    });
}
    `,
    preExecuteJs:`
    let pianoDivInConf = document.createElement('div');
    pianoDivInConf.innerHTML = '<div id="piano-keyboard" style="text-align: center"><button id="C" type="button" style="width: 50px; height: 120px; padding: 2px; background-color: #FFFFFF;"></button><button id="C#" type="button" style="width: 50px; height: 100px; background-color: #000;color: #FFFFFF; padding: 2px; line-height: 10;"></button><button id="D" type="button" style="width: 50px; height: 120px; padding: 2px; background-color: #FFFFFF;"></button><button id="D#" type="button" style="width: 50px; height: 100px; background-color: #000;color: #FFFFFF; padding: 2px; line-height: 10;"></button><button id="E" type="button" style="width: 50px; height: 120px; padding: 2px; background-color: #FFFFFF;"></button></div>';
    document.body.appendChild(pianoDivInConf);
    display.res('Trying events');
    `,
    executeAtStart: true,
    points: function ($element, config, accessor) {
        let outputDiv =  document.getElementsByClassName('execute');
        if(outputDiv.length) outputDiv.style.height = '400px';
        let buttonsIdsInConfig = ['C', 'C#', 'D', 'D#', 'E'];
        let buttonsInConfig = buttonsIdsInConfig.map( (button, i) => {
          return accessor.doc().getElementById(buttonsIdsInConfig[i]);
        })
        var mouseenterEvent = new MouseEvent('mouseenter', {
          'view': window,
          'bubbles': true,
          'cancelable': true
        });
        var mouseleaveEvent = new MouseEvent('mouseleave', {
          'view': window,
          'bubbles': true,
          'cancelable': true
        });
        let p = accessor.testResults(10, function(i , args, res) {
          res++
          let points = 0;
          buttonsInConfig.forEach((button, i) => {
            button.dispatchEvent(mouseenterEvent);
            if(button.innerText === buttonsIdsInConfig[i]) points++;
            button.dispatchEvent(mouseleaveEvent);
            if(button.innerText === '') points++;
          });
          return points;
        });
        return { points: p };
    },
    maxPoints: 10,
    title: "Modify the elements on mouseenter and mouseleave events",
    description: "",
    concepts: ["JavaScript", "mouseenter", "mouseleave"],
    order: 16
  },

  'add_event_listener': {
    instructions: 'Create a new function and add it as an event listener'
      + ' for the button below. The HTML of the button is also presented.'
      + ' The new function must call function <code>playMusic</code>.'
      + ' Try for example <code>playMusic(["E4","D4","C4","D4","E4","E4"]);</code>',
    preExecuteScript: '/static/webdev/augment-tone.js',
    preExecuteHtml: '<button id="music-button">Play music</button>\n',
    preExecuteJs: ''
      + 'display.showCode("music-button");\n'
      + 'function playMusic(notes) {\n'
      + '  display.res("Playing music!", ["music"]);\n'
      + '  ToneJsLib.playMusic(notes);\n'
      + '}\n',
    executeAtStart: true,
    points: function ($element, config, accessor) {
      let preclick = accessor.testResults(10, function(i , args, res) {
        return args[0] == 'music' ? 1 : 0;
      });
      accessor.doc().getElementById('music-button').click();
      let p = accessor.testResults(10, function(i, args, res) {
        return i >= preclick ? 10 : 0;
      });
      return { points: p };
    },
    maxPoints: 10,
    title: "Add event listener",
    description: "Create function and add as an event listener.",
    concepts: ["JavaScript", "addEventListener", "getElementById", "function"],
    order: 17
  }
};

module.exports = Content;
