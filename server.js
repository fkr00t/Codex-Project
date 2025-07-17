const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ Serve static files (utama)
app.use(express.static(path.join(__dirname)));
// ✅ Serve src folder (gambar, JS, dll)
app.use('/src', express.static(path.join(__dirname, 'src')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API endpoint untuk form kontak
app.post('/api/contact', (req, res) => {
    const { name, company, email, phone, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: 'Mohon lengkapi semua field yang diperlukan'
        });
    }

    console.log('Pesan baru diterima:');
    console.log('Nama:', name);
    console.log('Perusahaan:', company);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Pesan:', message);

    setTimeout(() => {
        res.json({
            success: true,
            message: 'Terima kasih! Pesan Anda telah terkirim. Kami akan menghubungi Anda segera.'
        });
    }, 1000);
});

// API tambahan
app.get('/api/stats', (req, res) => {
    res.json({
        clients: 500,
        satisfaction: 4.9,
        projects: 1000
    });
});

// Handle 404
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Terjadi kesalahan pada server'
    });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server berjalan di http://0.0.0.0:${PORT}`);
});
