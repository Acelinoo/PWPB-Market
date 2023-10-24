var express = require("express");
let router = express.Router();
const multer = require("multer");
const {
  register,
  registrasi,
  login,
  auth,
  logout,
} = require("../controller/auth.js");

const {
  getMarket,
  tambahJenis,
  hapusJenis,
  getBarang,
  hapusBar,
  tambahBar,
  tambahTransaksi,
  cancel,
  editJenis,
  transaksi,
  shop,
} = require("../controller/market.js");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.get("/market", getMarket);
router.get("/getMarket", getMarket);
router.get("/hapusJenis/:id_JenisBarang", hapusJenis);
router.get("/pilih/:id_JenisBarang", getBarang);
router.post("/tambahJenisBarang", tambahJenis);
router.get("/pilih/:id_JenisBarang", getBarang);
router.post("/tambahBarang", upload.single("photo"), tambahBar);
router.get("/hapusBar/:id_barang", hapusBar);
router.post("/tambahTransaksi", tambahTransaksi);
router.post("/cancelTransaksi", cancel);
router.post("/editJenis", editJenis);
router.get("/transaksi", transaksi);
router.get("/shop/:id", shop);
router.get("/register", register);
router.post("/registrasi", registrasi);
router.get("/", login);
router.post("/auth", auth);
router.get("/logout", logout);
module.exports = router;
