// Daftar produk
let produk = [
    { id: 1, nama: 'Gamis ', harga: 250.000 },
    { id: 2, nama: 'Kebaya ', harga: 200.000 },
    { id: 3, nama: 'Blazer ', harga: 195.000 },
    { id: 1, nama: 'baju batik ', harga: 100.000 },
    { id: 2, nama: 'hijab turkey ', harga: 150.000 },
    { id: 3, nama: 'sepatu ', harga: 355.000 },
];
let keranjang = [];

// Menampilkan daftar produk
function tampilkanProduk() {
    const daftarProduk = document.getElementById('daftar-produk');
    produk.forEach(item => {
        const produkDiv = document.createElement('div');
        produkDiv.innerHTML = `<p>${item.nama} - Rp${item.harga.toFixed(2)} 
        <button onclick="tambahKeKeranjang(${item.id})">Tambah ke Keranjang</button></p>`;
        daftarProduk.appendChild(produkDiv);
    });
}

// Menambah produk ke keranjang
function tambahKeKeranjang(id) {
    const item = produk.find(p => p.id === id);
    keranjang.push(item);
    perbaruiKeranjang();
}

// Memperbarui tampilan keranjang
function perbaruiKeranjang() {
    const itemKeranjang = document.getElementById('item-keranjang');
    itemKeranjang.innerHTML = '';
    let total = 0;
    keranjang.forEach((item, index) => {
        itemKeranjang.innerHTML += `<p>${item.nama} - Rp${item.harga.toFixed(2)} 
        <button onclick="hapusDariKeranjang(${index})">Hapus</button></p>`;
        total += item.harga;
    });
    document.getElementById('total').innerText = total.toFixed(2);
}

// Menghapus item dari keranjang
function hapusDariKeranjang(index) {
    keranjang.splice(index, 1);
    perbaruiKeranjang();
}

// Fungsi checkout
function checkout() {
    const total = document.getElementById('total').innerText;
    const daftarProduk = keranjang.map(item => item.nama).join(', ');

    fetch('simpan_transaksi.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `produk=${daftarProduk}&total=${total}`
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        keranjang = [];
        perbaruiKeranjang();
    });
}

// Fungsi menyimpan transaksi
function simpanTransaksi() {
    const total = document.getElementById('total').innerText;
    const daftarProduk = keranjang.map(item => item.nama).join(',');

    fetch('simpan_transaksi.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `produk=${daftarProduk}&total=${total}`
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Pesan konfirmasi dari server
        keranjang = []; // Kosongkan keranjang setelah disimpan
        perbaruiKeranjang();
        tampilkanTransaksi(); // Tampilkan daftar transaksi setelah disimpan
    });
}

// Fungsi menampilkan transaksi
function tampilkanTransaksi() {
    fetch('ambil_transaksi.php')
    .then(response => response.json())
    .then(data => {
        const daftarTransaksi = document.getElementById('daftar-transaksi');
        daftarTransaksi.innerHTML = ''; // Kosongkan daftar transaksi sebelum diperbarui

        data.forEach(transaksi => {
            daftarTransaksi.innerHTML += `<p>Produk: ${transaksi.produk} | Total: Rp${transaksi.total} | Tanggal: ${transaksi.tanggal}</p>`;
        });
    });
}
function showTransactionMessage() {
    const messageElement = document.getElementById("message");
    messageElement.textContent = "Selamat!! Transaksi anda sedang diproses";
}

// Panggil fungsi saat halaman dimuat
window.onload = tampilkanTransaksi;
tampilkanProduk();
