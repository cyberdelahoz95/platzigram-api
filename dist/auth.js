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

var _utils = require('./lib/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var env = process.env.NODE_ENV || 'production';
var db = new _platzigramDb2.default(_config2.default.db);

if (env === 'test') {
  db = new _db2.default();
}

var hash = (0, _httpHash2.default)();

hash.set('POST /', function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, params) {
    var credentials, auth, token;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _micro.json)(req);

          case 2:
            credentials = _context.sent;
            _context.next = 5;
            return db.connect();

          case 5:
            _context.next = 7;
            return db.authenticate(credentials.username, credentials.password);

          case 7:
            auth = _context.sent;

            if (auth) {
              _context.next = 10;
              break;
            }

            return _context.abrupt('return', (0, _micro.send)(res, 401, { error: 'invalidad credentials' }));

          case 10:
            _context.next = 12;
            return _utils2.default.signToken({
              username: credentials.username
            }, _config2.default.secret);

          case 12:
            token = _context.sent;


            (0, _micro.send)(res, 201, token);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function authenticate(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return authenticate;
}());

exports.default = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res) {
    var method, url, match;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            method = req.method, url = req.url;
            match = hash.get(method.toUpperCase() + ' ' + url); // if there is a matching url that was set previousle, this function returns an object with a function that handlers such url

            if (!match.handler) {
              _context2.next = 13;
              break;
            }

            _context2.prev = 3;
            _context2.next = 6;
            return match.handler(req, res, match.params);

          case 6:
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2['catch'](3);

            (0, _micro.send)(res, 500, { error: _context2.t0.message });

          case 11:
            _context2.next = 14;
            break;

          case 13:
            (0, _micro.send)(res, 404, { error: 'route not found' });

          case 14:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this, [[3, 8]]);
  }));

  function main(_x4, _x5) {
    return _ref2.apply(this, arguments);
  }

  return main;
}();