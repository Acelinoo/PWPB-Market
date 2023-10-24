var express = require("express");
var bodyparser = require("body-parser");
var router = require("./router/router.js");
const path = require("path");
const session = require("express-session"); //untuk waktu seorang user agar bisa mengakses aplikasi
const MySqlStore = require("express-mysql-session")(session); //Mendeteksi siapa yang login, Agar tidak perlu login lagi
const db = require("./connect.js");

var app = express();
const port = 8000;

//bodyparser di gunakan untuk req.body
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

const sessionStore = new MySqlStore(
  {
    expiration: 24 * 60 * 60 * 1000,
    clearExpired: true,
    createDatabaseTable: true,
  },
  db
);
app.use(
  session({
    secret: "secret-key",
    store: sessionStore,
    resave: false,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");
app.set("views", "view");
//jika filenya berakhir dengan css maka set headernya akan di atur dengan css,
//jika filenya berakhir dengan js maka set headernya akan di atur dengan js,

app.use(
  express.static(path.join(__dirname, "public"), {
    setHeaders: (res, path) => {
      if (path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/CSS");
      } else if (path.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      }
    },
  })
);

app.use(router);

app.listen(port, () => {
  console.log("server telah berjalan");
});
