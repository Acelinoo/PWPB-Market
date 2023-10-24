var mysql = require("mysql");
//cara mengkoneksikan db
var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "market_acel",
});

db.connect(function (error) {
  if (error) throw error;
  console.log("connect");
});
module.exports = db;
