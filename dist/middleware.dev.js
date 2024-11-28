"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.middleware = middleware;
exports.config = void 0;

var _server = require("next/server");

var _edgeConfig = require("@vercel/edge-config");

var config = {
  matcher: '/welcome'
};
exports.config = config;

function middleware() {
  var greeting;
  return regeneratorRuntime.async(function middleware$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _edgeConfig.get)('greeting'));

        case 2:
          greeting = _context.sent;
          return _context.abrupt("return", _server.NextResponse.json(greeting));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}