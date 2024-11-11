<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sistem_kasir";

// Membuat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $produk = $_POST['produk'];
    $total = $_POST['total'];

    // Query untuk menyimpan transaksi
    $sql = "INSERT INTO transaksi (produk, total) VALUES ('$produk', '$total')";
    if ($conn->query($sql) === TRUE) {
        echo "Transaksi berhasil disimpan";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
