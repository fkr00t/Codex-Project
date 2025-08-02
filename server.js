require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

// Vercel specific configuration
const isVercel = process.env.VERCEL === '1';

// Konfigurasi Nodemailer untuk Zoho Mail
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.zoho.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true untuk 465, false untuk port lain
    auth: {
        user: process.env.EMAIL_USER || 'your-email@zoho.com',
        pass: process.env.EMAIL_PASS || 'your-zoho-password'
    }
});

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

// Vercel specific: Serve static files from root
if (isVercel) {
    app.use('/', express.static(path.join(__dirname)));
}

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Fungsi sanitasi server-side
function sanitizeInput(input) {
    if (!input) return '';
    
    // Hapus karakter berbahaya
    const dangerousPatterns = [
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi,
        /<iframe/gi,
        /<object/gi,
        /<embed/gi,
        /<form/gi,
        /<input/gi,
        /<textarea/gi,
        /<select/gi,
        /<button/gi
    ];
    
    let sanitized = input.toString();
    dangerousPatterns.forEach(pattern => {
        sanitized = sanitized.replace(pattern, '');
    });
    
    return sanitized.trim();
}

// API endpoint untuk form kontak
app.post('/api/contact', async (req, res) => {
    const { name, email, whatsapp, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: 'Mohon lengkapi semua field yang diperlukan'
        });
    }
    
    // Sanitasi input server-side
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedWhatsapp = sanitizeInput(whatsapp);
    const sanitizedMessage = sanitizeInput(message);
    
    // Validasi tambahan
    if (sanitizedName.length < 2) {
        return res.status(400).json({
            success: false,
            message: 'Nama harus minimal 2 karakter'
        });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitizedEmail)) {
        return res.status(400).json({
            success: false,
            message: 'Format email tidak valid'
        });
    }
    
    if (sanitizedMessage.length < 10) {
        return res.status(400).json({
            success: false,
            message: 'Pesan harus minimal 10 karakter'
        });
    }

    console.log('Pesan baru diterima:');
    console.log('Nama:', sanitizedName);
    console.log('Email:', sanitizedEmail);
    console.log('WhatsApp:', sanitizedWhatsapp);
    console.log('Pesan:', sanitizedMessage);

    try {
        // Konfigurasi email
        const mailOptions = {
            from: process.env.EMAIL_USER || 'your-email@gmail.com',
            to: 'support@codexproject.dev', // Email tujuan
            subject: `Pesan Baru dari ${sanitizedName} - Codex.Project`,
            html: `
                <!DOCTYPE html>
                <html lang="id">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Pesan Baru - Codex.Project</title>
                </head>
                <body style="margin: 0; padding: 0; background-color: #f5f5f5; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                        
                        <!-- Header -->
                        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                            <div style="background: rgba(255, 255, 255, 0.1); border-radius: 50%; width: 80px; height: 80px; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="white"/>
                                </svg>
                            </div>
                            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">Pesan Baru</h1>
                            <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 16px;">Codex.Project Contact Form</p>
                        </div>

                        <!-- Content -->
                        <div style="padding: 40px 30px;">
                            
                            <!-- Sender Info Card -->
                            <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 16px; padding: 30px; margin-bottom: 30px; border-left: 4px solid #667eea;">
                                <h2 style="color: #2d3748; margin: 0 0 20px; font-size: 20px; font-weight: 600; display: flex; align-items: center;">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 10px;">
                                        <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#667eea"/>
                                    </svg>
                                    Detail Pengirim
                                </h2>
                                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                                    <div style="background: white; padding: 15px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                                        <p style="margin: 0; color: #718096; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Nama</p>
                                        <p style="margin: 5px 0 0; color: #2d3748; font-size: 16px; font-weight: 500;">${sanitizedName}</p>
                                    </div>
                                    <div style="background: white; padding: 15px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                                        <p style="margin: 0; color: #718096; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Email</p>
                                        <p style="margin: 5px 0 0; color: #2d3748; font-size: 16px; font-weight: 500;">${sanitizedEmail}</p>
                                    </div>
                                    <div style="background: white; padding: 15px; border-radius: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); grid-column: 1 / -1;">
                                        <p style="margin: 0; color: #718096; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">WhatsApp</p>
                                        <p style="margin: 5px 0 0; color: #2d3748; font-size: 16px; font-weight: 500;">${sanitizedWhatsapp || 'Tidak diisi'}</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Message Card -->
                            <div style="background: white; border-radius: 16px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
                                <h2 style="color: #2d3748; margin: 0 0 20px; font-size: 20px; font-weight: 600; display: flex; align-items: center;">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 10px;">
                                        <path d="M20 2H4C2.9 2 2 2.9 2 4V22L6 18H20C21.1 18 22 17.1 22 16V4C22 2.9 21.1 2 20 2ZM20 16H6L4 18V4H20V16Z" fill="#667eea"/>
                                    </svg>
                                    Pesan
                                </h2>
                                <div style="background: #f7fafc; border-radius: 12px; padding: 20px; border-left: 4px solid #667eea;">
                                    <p style="margin: 0; color: #4a5568; font-size: 16px; line-height: 1.7; white-space: pre-wrap;">${sanitizedMessage}</p>
                                </div>
                            </div>

                            <!-- Footer -->
                            <div style="margin-top: 30px; padding: 20px; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); border-radius: 12px; text-align: center;">
                                <p style="margin: 0; color: #718096; font-size: 14px; display: flex; align-items: center; justify-content: center;">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 8px;">
                                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z" fill="#718096"/>
                                    </svg>
                                    Dikirim pada ${new Date().toLocaleString('id-ID', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric', 
                                        hour: '2-digit', 
                                        minute: '2-digit' 
                                    })}
                                </p>
                            </div>

                        </div>

                        <!-- Bottom Bar -->
                        <div style="background: #2d3748; padding: 20px; text-align: center; border-radius: 0 0 8px 8px;">
                            <p style="margin: 0; color: #a0aec0; font-size: 14px;">
                                © 2024 Codex.Project. Semua hak dilindungi.
                            </p>
                        </div>

                    </div>
                </body>
                </html>
            `
        };

        // Kirim email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email berhasil dikirim:', info.messageId);

        res.json({
            success: true,
            message: 'Terima kasih! Pesan Anda telah terkirim. Kami akan menghubungi Anda segera.'
        });

    } catch (error) {
        console.error('Error mengirim email:', error);
        res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi nanti.'
        });
    }
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
if (!isVercel) {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server berjalan di http://0.0.0.0:${PORT}`);
    });
}

// Export for Vercel
module.exports = app;
