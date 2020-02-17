/* global module, require, console */
/* jshint globalstrict: true */
'use strict';

var fs = require('fs');
let nj = require('nunjucks');
let baseDir = __dirname;

let Package = function () {};

let content = require('./content');

Package.meta = {
  'name': 'webdev-editor',
  'shortDescription': 'Exercise package using embedded code editor.',
  'description': '',
  'author': 'Teemu Lehtinen',
  'license': 'MIT',
  'version': '0.1.0',
  'url': '',
  'teaserContent': ['sample'],
  'contents': content
};
Package.packageType = 'content';
Package.contentTypeNamespace = 'webdev';
Package.namespace = 'webdev-editor';

Package.register = function (handlers, app, conf) {
  handlers.contentPackages['webdev-editor'] = Package;
  handlers.contentTypes.webdev.installedContentPackages.push(Package);
};

Package.initialize = function (req, params, handlers, cb) {
  let config = content[params.name];
  if (config) {
    let templateDir = baseDir + '/templates/';
    nj.configure(templateDir, { autoescape: false });
    config.addToHead = nj.render(baseDir + '/templates/head.html', {});
    config.html = nj.render(baseDir + '/templates/body.html', {});
    config.verticalLayout = true;
  }
  cb(config);
};

module.exports = Package;
