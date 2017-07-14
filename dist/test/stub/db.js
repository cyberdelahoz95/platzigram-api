'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _fixtures = require('../fixtures/');

var _fixtures2 = _interopRequireDefault(_fixtures);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Db = function () {
  function Db() {
    (0, _classCallCheck3.default)(this, Db);
  }

  (0, _createClass3.default)(Db, [{
    key: 'connect',
    value: function connect() {
      return _promise2.default.resolve(true);
    }
  }, {
    key: 'disconnect',
    value: function disconnect() {
      return _promise2.default.resolve(true);
    }
  }, {
    key: 'getImage',
    value: function getImage(id) {
      return _promise2.default.resolve(_fixtures2.default.getImage());
    }
  }, {
    key: 'getImages',
    value: function getImages() {
      return _promise2.default.resolve(_fixtures2.default.getImages());
    }
  }, {
    key: 'saveImage',
    value: function saveImage(image) {
      return _promise2.default.resolve(_fixtures2.default.getImage());
    }
  }, {
    key: 'likeImage',
    value: function likeImage(id) {
      var image = _fixtures2.default.getImage();
      image.liked = true;
      image.likes = 1;
      return _promise2.default.resolve(image);
    }
  }, {
    key: 'getImagesByTag',
    value: function getImagesByTag(tag) {
      var images = _fixtures2.default.getImagesByTag();
      return _promise2.default.resolve(images);
    }
  }, {
    key: 'saveUser',
    value: function saveUser(user) {
      return _promise2.default.resolve(_fixtures2.default.getUser());
    }
  }, {
    key: 'getUser',
    value: function getUser(username) {
      return _promise2.default.resolve(_fixtures2.default.getUser());
    }
  }, {
    key: 'authenticate',
    value: function authenticate(username, password) {
      return _promise2.default.resolve(true);
    }
  }]);
  return Db;
}();

exports.default = Db;