'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _tokenExtractor = require('token-extractor');

var _tokenExtractor2 = _interopRequireDefault(_tokenExtractor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  signToken: function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(payload, secret, options) {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt('return', new _promise2.default(function (resolve, reject) {
                _jsonwebtoken2.default.sign(payload, secret, options, function (err, token) {
                  if (err) return reject(err);

                  resolve(token);
                });
              }));

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function signToken(_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    }

    return signToken;
  }(),
  verifyToken: function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(token, secret, options) {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt('return', new _promise2.default(function (resolve, reject) {
                _jsonwebtoken2.default.verify(token, secret, options, function (err, decoded) {
                  if (err) return reject(err);

                  resolve(decoded);
                });
              }));

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function verifyToken(_x4, _x5, _x6) {
      return _ref2.apply(this, arguments);
    }

    return verifyToken;
  }(),
  extractToken: function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(req) {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt('return', new _promise2.default(function (resolve, reject) {
                (0, _tokenExtractor2.default)(req, function (err, token) {
                  if (err) return reject(err);

                  resolve(token);
                });
              }));

            case 1:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function extractToken(_x7) {
      return _ref3.apply(this, arguments);
    }

    return extractToken;
  }()
};