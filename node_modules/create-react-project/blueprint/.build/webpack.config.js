'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _webpack = require('react-project/webpack');

Object.keys(_webpack).forEach(function (key) {
  if (key === "default") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _webpack[key];
    }
  });
});