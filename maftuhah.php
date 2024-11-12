<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sistem_kasir";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $produk = $_POST['produk'];
    $total = $_POST['total'];
    $tanggal = date('Y-m-d H:i:s'); // Menyimpan waktu transaksi

    // Query untuk menyimpan transaksi
    $sql = "INSERT INTO transaksi (produk, total, tanggal) VALUES ('$produk', '$total', '$tanggal')";
    if ($conn->query($sql) === TRUE) {
        echo "Transaksi berhasil disimpan";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$sql = "SELECT * FROM transaksi ORDER BY id DESC";
$result = $conn->query($sql);

$transaksi = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $transaksi[] = [
            'produk' => $row['produk'],
            'total' => $row['total'],
            'tanggal' => $row['tanggal']
        ];
    }
}

// Mengembalikan daftar transaksi sebagai JSON
header('Content-Type: application/json');
echo json_encode($transaksi);


$conn->close();
?>
