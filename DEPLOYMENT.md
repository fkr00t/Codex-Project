# Deployment Guide - Codex.Project

## Deploy ke Vercel

### 1. Prerequisites
- Akun Vercel (gratis)
- Project sudah di GitHub/GitLab
- Environment variables sudah disiapkan

### 2. Setup Environment Variables di Vercel

Setelah deploy, tambahkan environment variables di Vercel Dashboard:

```
EMAIL_USER=your-email@zoho.com
EMAIL_PASS=your-zoho-password
EMAIL_HOST=smtp.zoho.com
EMAIL_PORT=587
NODE_ENV=production
```

### 3. Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login ke Vercel
vercel login

# Deploy
vercel

# Deploy ke production
vercel --prod
```

### 4. Deploy via Vercel Dashboard

1. Buka [vercel.com](https://vercel.com)
2. Klik "New Project"
3. Import repository dari GitHub/GitLab
4. Konfigurasi:
   - **Framework Preset**: Node.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `./`
   - **Install Command**: `npm install`

### 5. Environment Variables Setup

Di Vercel Dashboard → Project Settings → Environment Variables:

| Variable | Value | Environment |
|----------|-------|-------------|
| `EMAIL_USER` | your-email@zoho.com | Production |
| `EMAIL_PASS` | your-zoho-password | Production |
| `EMAIL_HOST` | smtp.zoho.com | Production |
| `EMAIL_PORT` | 587 | Production |
| `NODE_ENV` | production | Production |

### 6. Domain Setup

1. Vercel akan memberikan domain: `your-project.vercel.app`
2. Untuk custom domain:
   - Vercel Dashboard → Domains
   - Add domain
   - Update DNS records

### 7. Post-Deployment Checklist

- ✅ Environment variables sudah diset
- ✅ Form contact sudah ditest
- ✅ Email notification sudah ditest
- ✅ Chatbot sudah ditest
- ✅ Mobile responsive sudah ditest
- ✅ SSL certificate aktif
- ✅ Performance sudah optimal

### 8. Monitoring

- **Vercel Analytics**: Monitor traffic dan performance
- **Function Logs**: Monitor API calls
- **Email Logs**: Monitor form submissions

### 9. Troubleshooting

#### Email tidak terkirim:
- Cek environment variables
- Cek Zoho Mail credentials
- Cek Vercel function logs

#### Static files tidak load:
- Cek file paths di HTML
- Cek vercel.json routes
- Cek build output

#### API errors:
- Cek server.js logs
- Cek environment variables
- Cek Vercel function timeout

### 10. Performance Optimization

- ✅ Static files cached
- ✅ API responses optimized
- ✅ Images compressed
- ✅ CSS/JS minified
- ✅ CDN enabled

---

**Status**: Ready for Production 🚀
**Last Updated**: 2024 