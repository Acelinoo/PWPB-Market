
const bayar = (harga) => {
  if (confirm("Apakah anda ingin membayar ?") == true) {
    if (saldo < harga) {
      alert("saldo kurang");
    } else {
      saldo = saldo - harga;
      document.getElementById("saldo").innerHTML = formatSaldo(saldo);
    }
  }
};

function barang(id_barang, harga, stock) {
  const inputBarangId = document.getElementById("barang_id");
  const inputHarga = document.getElementById("hargaBarang");
  const jumlah = document.getElementById("jumlah");
  const inputStock = document.getElementById("Stock");
  console.log(stock);
  inputBarangId.value = id_barang;
  inputHarga.value = harga;
  inputStock.value = stock;
  var total = inputHarga.value * jumlah.value;
}

const total_harga = () => {
  const harga = document.getElementById("hargaBarang").value;
  let jumlahInput = document.getElementById("jumlah");
  let jumlah = parseInt(jumlahInput.value);

  const stockInput = document.getElementById("Stock");
  const stock = parseInt(stockInput.value);

  if (jumlah > stock) {
    alert("stock g cukub mas broo");
    jumlahInput.value = stock;
    document.getElementById("new_Stock").value = stock - jumlahInput.value;
    document.getElementById("total").value = harga * jumlahInput.value;
    console.log(harga, jumlah, stock);
  } else {
    console.log(harga, jumlah, stock);
    document.getElementById("new_Stock").value = stock - jumlahInput.value;
    document.getElementById("total").value = harga * jumlahInput.value;
  }
  console.log(harga, jumlah);
};
const validasi_modal1 = () => {
  const harga = document.getElementById("harga").value;
  const save = document.getElementById("save");
  const NamaBarang = document.getElementById("NamaBarang");

  if (NamaBarang.value.length >= 3) {
    if (harga % 500 == 0) {
      if (harga.length >= 3) {
        save.style.display = "block";
      }
    } else {
      alert("Masukan harga dengan banar!");
      save.style.display = "none";
    }
  } else {
    alert("masukan data dengan benar");
    save.style.display = "none";
  }
};

const cancel = (newStock, jumlah, idBarang, idtransaksi) => {
  console.log(newStock, jumlah, idBarang, idtransaksi);
  document.getElementById("barang_id2").value = idBarang;
  document.getElementById("id_transaksi").value = idtransaksi;
  document.getElementById("stockBaru").value =
    parseInt(newStock) + parseInt(jumlah);
};
