"use strict";

var jsonServer = require("json-server"); // json-server modülünü çağırıyoruz


var server = jsonServer.create();
var router = jsonServer.router("db.json"); // Kullanmak istediğiniz JSON dosyası

var middlewares = jsonServer.defaults();
server.use(middlewares);
server.use(router);
var port = process.env.PORT || 3001; // Port numarasını belirliyoruz

server.listen(port, function () {
  console.log("JSON Server is running on port ".concat(port));
});