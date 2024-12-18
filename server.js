const jsonServer = require("json-server"); // json-server modülünü çağırıyoruz
const server = jsonServer.create();
const router = jsonServer.router("db.json"); // Kullanmak istediğiniz JSON dosyası
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const port = process.env.PORT || 3001; // Port numarasını belirliyoruz
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
