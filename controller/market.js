const db = require("../connect");

const getMarket = (req, res) => {
  const sql = "SELECT * FROM jenisbarang";
  db.query(sql, (error, result) => {
    const jenisbarang = JSON.parse(JSON.stringify(result));
    if (error) throw error;
    //jika terdapat user yang login atau terdapat data pada session
    if (req.session.user) {
      const sql = `SELECT * FROM user WHERE username = '${req.session.user.username}'`;
      db.query(sql, (err, result) => {
        const user = result[0];
        if (err) throw err;
        res.render("jenisbarang", { jenis: jenisbarang, user: user });
      });
    } else {
      res.render("jenisbarang", { jenis: jenisbarang, user: "" });
    }
  });
};

const tambahJenis = (req, res) => {
  const sql = `INSERT INTO jenisbarang(jenisbarang) VALUES ('${req.body.jenisbarang}')`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.redirect("/");
  });
};

const hapusJenis = (req, res) => {
  const id = req.params.id_JenisBarang;
  const sql = "DELETE FROM jenisbarang WHERE id_JenisBarang = ?";
  db.query(sql, id, (error, result) => {
    if (error) throw error;
    res.redirect("back");
  });
};
//Barang
const getBarang = (req, res) => {
  const id = req.params.id_JenisBarang;
  const sql = `SELECT * FROM barang WHERE id_JenisBarang = ${id}`;
  db.query(sql, (error, result) => {
    const barang = JSON.parse(JSON.stringify(result));
    if (error) throw error;

    const uang = (rupiah) => {
      return rupiah.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      });
    };
    if (req.session.user) {
      const sql = `SELECT * FROM user WHERE username = '${req.session.user.username}'`;
      db.query(sql, (err, result) => {
        const user = result[0];
        if (err) throw err;
        console.log(user);
        res.render("barang", {
          produk: barang,
          id: id,
          transaksi: transaksi,
          uang,
          user: user,
        });
      });
    } else {
      res.render("barang", {
        produk: barang,
        id: id,
        transaksi: transaksi,
        uang,
        user: "",
      });
    }
  });
};

const tambahBar = (req, res) => {
  const image = req.file ? req.file.filename : null;
  const sql = `INSERT INTO barang(Nama_Barang, id_JenisBarang, harga,new_stock, image) VALUES 
      ('${req.body.NamaBarang}', '${req.body.id_JenisBarang}','${req.body.harga}', '${req.body.new_stock}', '${image}')`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    res.redirect(`back`);
    console.log(sql);
  });
};

const hapusBar = (req, res) => {
  const idBar = req.params.id_barang;
  const sqlBar = "DELETE FROM barang WHERE id_barang = ?";
  db.query(sqlBar, idBar, (error, result) => {
    if (error) throw error;
    res.redirect("back");
  });
};
//tambah transaksi
const tambahTransaksi = (req, res) => {
  if (req.session.user) {
    const jumlah = req.body.jumlah;
    const total = req.body.total;
    const sql = `INSERT INTO transaksi(id_barang,jumlah,total_harga, status, id_user) VALUES ('${req.body.barang_id}','${jumlah}','${total}, '0', ${req.session.user.id})`;
    db.query(sql, (error, result) => {
      if (error) throw error;
      const sql2 = `UPDATE barang SET new_stock = '${req.body.new_Stock}' WHERE id_barang = '${req.body.barang_id}' `;
      db.query(sql2, (error, result) => {
        if (error) throw error;
        res.redirect("back");
      });
    });
  } else {
    res.render("login", { pesan: "anda harus login", clas: "danger" });
  }
};

const cancel = (req, res) => {
  const sql = `UPDATE barang SET new_stock = ${req.body.stockBaru} WHERE id_barang = ${req.body.barang_id2}`;
  db.query(sql, (error, result) => {
    if (error) throw error;
    const sql2 = `DELETE FROM transaksi WHERE id_transaksi = ${req.body.id_transaksi}`;
    db.query(sql2, (error, result) => {
      if (error) throw error;
      res.redirect("back");
    });
  });
};

const editJenis = (req, res) => {
  //ubah tabel jenis barang,dengan kolom jenis barang dengan isi yang ada di formulir/form edit
  const sql = `UPDATE jenisbarang SET jenisbarang = '${req.body.Jenis}' WHERE id_JenisBarang = ${req.body.id_jenis}`;

  db.query(sql, (error, result) => {
    if (error) throw error;
    res.redirect("back");
  });
};

const transaksi = (req, res) => {
  const id = req.params.id;
  const sql2 = `SELECT *
        FROM barang JOIN transaksi ON barang.id_barang WHERE status = 0 AND id_user = ${req.session.user.id}`;
  db.query(sql2, (error, result2) => {
    if (error) throw error;
    const transaksi = result2;
    const sql3 = `SELECT SUM(total_harga) AS total FROM transaksi JOIN barang ON transaksi.id_barang = barang.Id_barang WHERE status = 0 AND id_user = ${req.session.user.id};`; //SELECT SUM(total_harga) AS allHarga FROM transaksi;
    db.query(sql3, (error, result3) => {
      const total = result3;
      const uang = (rupiah) => {
        return rupiah.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
          minimumFractionDigits: 0,
        });
      };
      res.render("transaksi", {
        transaksi,
        idJbar: id,
        total,
        uang,
      });
    });
  });
};

const shop = (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM barang WHERE id_JenisBarang = ${id}`;
  db.query(sql, (error, result) => {
    const barang = JSON.parse(JSON.stringify(result));
    if (error) throw error;

    const uang = (rupiah) => {
      return rupiah.toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      });
    };
    res.render("shop", {
      bar: barang,
      idJbar: id,
      transaksi: transaksi,
      uang,
    });
  });
};

module.exports = {
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
};
