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

hash.set('GET /list', function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(req, res, params) {
    var images;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return db.connect();

          case 2:
            _context.next = 4;
            return db.getImages();

          case 4:
            images = _context.sent;
            _context.next = 7;
            return db.disconnect();

          case 7:
            (0, _micro.send)(res, 200, images);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function list(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  }

  return list;
}());

hash.set('GET /tag/:tag', function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(req, res, params) {
    var tag, images;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            tag = params.tag;
            _context2.next = 3;
            return db.connect();

          case 3:
            _context2.next = 5;
            return db.getImagesByTag(tag);

          case 5:
            images = _context2.sent;
            _context2.next = 8;
            return db.disconnect();

          case 8:
            (0, _micro.send)(res, 200, images);

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  function byTag(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  }

  return byTag;
}());

hash.set('GET /:id', function () {
  var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req, res, params) {
    var id, image;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = params.id;
            _context3.next = 3;
            return db.connect();

          case 3:
            _context3.next = 5;
            return db.getImage(id);

          case 5:
            image = _context3.sent;
            _context3.next = 8;
            return db.disconnect();

          case 8:
            (0, _micro.send)(res, 200, image);

          case 9:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  function getPicture(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  }

  return getPicture;
}());

hash.set('POST /', function () {
  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(req, res, params) {
    var image, token, created;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return (0, _micro.json)(req);

          case 2:
            image = _context4.sent;
            _context4.prev = 3;
            _context4.next = 6;
            return _utils2.default.extractToken(req);

          case 6:
            token = _context4.sent;
            _context4.next = 9;
            return _utils2.default.verifyToken(token, _config2.default.secret);

          case 9:
            _context4.next = 14;
            break;

          case 11:
            _context4.prev = 11;
            _context4.t0 = _context4['catch'](3);
            return _context4.abrupt('return', (0, _micro.send)(res, 401, { error: 'invalid token' }));

          case 14:
            _context4.next = 16;
            return db.connect();

          case 16:
            _context4.next = 18;
            return db.saveImage(image);

          case 18:
            created = _context4.sent;
            _context4.next = 21;
            return db.disconnect();

          case 21:
            (0, _micro.send)(res, 201, created);

          case 22:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this, [[3, 11]]);
  }));

  function postPicture(_x10, _x11, _x12) {
    return _ref4.apply(this, arguments);
  }

  return postPicture;
}());

hash.set('POST /:id/like', function () {
  var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(req, res, params) {
    var id, image;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = params.id;
            _context5.next = 3;
            return db.connect();

          case 3:
            _context5.next = 5;
            return db.likeImage(id);

          case 5:
            image = _context5.sent;
            _context5.next = 8;
            return db.disconnect();

          case 8:
            (0, _micro.send)(res, 200, image);

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  function likePicture(_x13, _x14, _x15) {
    return _ref5.apply(this, arguments);
  }

  return likePicture;
}());

exports.default = function () {
  var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(req, res) {
    var method, url, match;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            method = req.method, url = req.url;
            match = hash.get(method.toUpperCase() + ' ' + url); // if there is a matching url that was set previousle, this function returns an object with a function that handlers such url

            if (!match.handler) {
              _context6.next = 13;
              break;
            }

            _context6.prev = 3;
            _context6.next = 6;
            return match.handler(req, res, match.params);

          case 6:
            _context6.next = 11;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6['catch'](3);

            (0, _micro.send)(res, 500, { error: _context6.t0.message });

          case 11:
            _context6.next = 14;
            break;

          case 13:
            (0, _micro.send)(res, 404, { error: 'route not found' });

          case 14:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this, [[3, 8]]);
  }));

  function main(_x16, _x17) {
    return _ref6.apply(this, arguments);
  }

  return main;
}();