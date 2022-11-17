# acos-webdev-editor

A content package for [Acos-servers](https://github.com/acos-server/acos-server)
that provides exercises where students are asked to create small JavaScript
programs in an online [Ace-editor](https://ace.c9.io/). The programming tasks
are of introductory level.

Additionally, the exercises support automated generation of followup
questionnaires about the program that the student creates (QLCs).
* [The QLC library to analyse programs and generate questions](https://github.com/teemulehtinen/qlcjs)
* [TODO: Add link to a related research article](#)

The system logs all student activity in the task so that their work can be
validated. This also opens up possibilities for research designs that examine
the program writing process.

## Exercise samples

The following Acos installation is running content to test and learn the
system. Consult the server owner for any production use.
* https://acos.cs.aalto.fi/html/webdev/webdev-editor/half_number_function
* https://acos.cs.aalto.fi/html/webdev/webdev-editor/while_loop
* https://acos.cs.aalto.fi/html/webdev/webdev-editor/travel_array
* https://acos.cs.aalto.fi/html/webdev/webdev-editor/repeat_note

## Installation

The exercises run on [Acos-server](https://github.com/acos-server/acos-server)
which can be run on the Node.js-platform. See the project for more information
and installation instructions.

When Acos-server is started it automatically discovers and loads content
packages that have been installed using npm, e.g.
`npm install github:teemulehtinen/acos-webdev-editor`

## Development

The programming exercises are defined in the `content.js` which defines a
JavaScript object. The object has a feel of JSON-format but it includes
JavaScript function declarations too. Each exercise can have test functions
that produce the feedback and grading of the exercises. The way they
work and are run is close to unit testing systems.

The different fields are not documented but there are plenty of examples that
can act as a starting point for adapted or completely new programming tasks.
