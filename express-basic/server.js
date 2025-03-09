const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const path = require('path');
const port = 2001;

// Membuat atau membuka database SQLite
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Gagal terkoneksi ke database:', err.message);
    return;
  }
  console.log('Berhasil terkoneksi ke SQLite database.');
});

// Endpoint untuk menampilkan daftar tabel dalam database
app.get('/', (req, res) => {
  db.all("SELECT * FROM users ", (err, rows) => {
    if (err) {
      res.status(500).send('Error saat mengambil data tabel: ' + err.message);
      return;
    }
    res.json(rows);

  });
});

// Endpoint untuk menampilkan data dari tabel 'users'
app.get('/users', (req, res) => {
    const selectQuery = `SELECT * FROM users`;
    db.all(selectQuery, (err, rows) => {
      if (err) {
        res.status(500).send('Error saat mengambil data users: ' + err.message);
        return;
      }
      res.json(rows);
    });
});
  
// Menyajikan file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint API untuk mengambil data users dari database
app.get('/api/users', (req, res) => {
  const selectQuery = `SELECT * FROM users`;
  db.all(selectQuery, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Menjalankan server di port 2001
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
