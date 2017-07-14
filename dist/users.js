'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _micro = require('micro');

var _httpHash = require('http-hash');

var _httpHash2 = _interopRequireDefault(_httpHash);

var _platzigramDb = require('platzigram-db');

var _platzigramDb2 = _interopRequireDefault(_platzigramDb);

var _db = require('./test/stub/db');

var _db2 = _interopRequireDefault(_db);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = process.env.NODE_ENV || 'production';
var db = new _platzigramDb2.default(_config2.default.db);

if (env === 'test') {
  db = new _db2.default();
}

var hash = (0, _httpHash2.default)();

hash.set('POST /', function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, params) {
    var user, created;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _micro.json)(req);

          case 2:
            user = _context.sent;
            _context.next = 5;
            return db.connect();

          case 5:
            _context.next = 7;
            return db.saveUser(user);

          case 7:
            created = _context.sent;
            _context.next = 10;
            return db.disconnect();

          case 10:

            delete created.email;
            delete created.password;

            (0, _micro.send)(res, 201, created);

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function saveUser(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return saveUser;
}());

hash.set('GET /:username', function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, params) {
    var username, user;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            username = params.username;
            _context2.next = 3;
            return db.connect();

          case 3:
            _context2.next = 5;
            return db.getUser(username);

          case 5:
            user = _context2.sent;

            delete user.email;
            delete user.password;

            (0, _micro.send)(res, 200, user);

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  function getUser(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  }

  return getUser;
}());

exports.default = function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res) {
    var method, url, match;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            method = req.method, url = req.url;
            match = hash.get(method.toUpperCase() + ' ' + url); // if there is a matching url that was set previousle, this function returns an object with a function that handlers such url

            if (!match.handler) {
              _context3.next = 13;
              break;
            }

            _context3.prev = 3;
            _context3.next = 6;
            return match.handler(req, res, match.params);

          case 6:
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3['catch'](3);

            (0, _micro.send)(res, 500, { error: _context3.t0.message });

          case 11:
            _context3.next = 14;
            break;

          case 13:
            (0, _micro.send)(res, 404, { error: 'route not found' });

          case 14:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this, [[3, 8]]);
  }));

  function main(_x7, _x8) {
    return _ref3.apply(this, arguments);
  }

  return main;
}();