// Daftar produk
let produk = [
    { id: 1, nama: 'Produk 1', harga: 5000 },
    { id: 2, nama: 'Produk 2', harga: 3500 },
    { id: 3, nama: 'Produk 3', harga: 7000 }
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

tampilkanProduk();
