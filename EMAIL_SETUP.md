# Setup Email untuk Form Contact (Zoho Mail)

## Langkah-langkah Konfigurasi Email

### 1. Setup Zoho Mail
1. Login ke [Zoho Mail](https://mail.zoho.com/)
2. Buka Settings → Mail Accounts
3. Catat email dan password Anda
4. Pastikan SMTP sudah diaktifkan

### 2. File .env sudah dibuat
File `.env` di root project dengan isi:
```
EMAIL_USER=your-email@zoho.com
EMAIL_PASS=your-zoho-password
EMAIL_HOST=smtp.zoho.com
EMAIL_PORT=587
PORT=3000
```

### 3. Ganti dengan Email Zoho Anda
- Ganti `your-email@zoho.com` dengan email Zoho Anda
- Ganti `your-zoho-password` dengan password Zoho Anda

### 4. Restart Server
```bash
npm run dev
```

## Cara Kerja
1. User mengisi form contact
2. Data dikirim ke endpoint `/api/contact`
3. Server mengirim email ke `support@codexproject.dev`
4. Email berisi detail pengirim dan pesan dengan desain modern

## Fitur Email Template
- ✅ **Desain modern** dengan gradient header
- ✅ **Layout responsive** untuk mobile dan desktop
- ✅ **Icon SVG** untuk visual yang menarik
- ✅ **Card-based design** untuk informasi yang terorganisir
- ✅ **Color scheme** yang profesional
- ✅ **Typography** yang mudah dibaca
- ✅ **Timestamp** dengan format Indonesia

## Troubleshooting
- Pastikan 2FA aktif di Gmail
- Pastikan app password benar
- Cek console server untuk error 