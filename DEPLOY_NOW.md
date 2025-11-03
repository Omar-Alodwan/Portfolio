# 🚀 Deploy to Netlify - Quick Guide

## ⚡ 5-Minute Setup

### 1️⃣ Create Netlify Account (1 min)

1. Go to [netlify.com](https://www.netlify.com/)
2. Click **"Sign up with GitHub"**
3. Authorize Netlify

### 2️⃣ Import Repository (2 min)

1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **"Deploy with GitHub"**
3. Select **"Omar-Alodwan/Portfolio"**
4. Settings (auto-detected):
   ```
   Build command: (leave empty)
   Publish directory: .
   Functions directory: netlify/functions
   ```
5. Click **"Deploy site"**

### 3️⃣ Add API Key (1 min)

1. **Site settings** → **Environment variables**
2. Click **"Add a variable"**
3. Enter:
   ```
   Key:   GEMINI_API_KEY
   Value: [your Google Gemini API key]
   ```
4. Get key from: https://makersuite.google.com/app/apikey

### 4️⃣ Redeploy (1 min)

1. Go to **Deploys** tab
2. Click **"Trigger deploy"** → **"Deploy site"**
3. Wait ~2 minutes

## ✅ Done!

Your site is live at: `https://[random-name].netlify.app`

### Customize Domain

**Site settings** → **Domain management** → **Edit site name**

Change to: `your-name-portfolio.netlify.app`

## 🔄 Auto-Deploy

Every `git push` to GitHub automatically deploys to Netlify!

```bash
git add .
git commit -m "Update"
git push origin main
# Updates in ~1 minute
```

## 🆘 Troubleshooting

**Search not working?**
- Check environment variable is set
- Verify API key is correct
- Check function logs in Netlify dashboard

**Deploy failed?**
- Check deploy logs in Netlify
- Verify all files are committed
- Trigger manual redeploy

## 📱 Test Your Site

1. Visit your Netlify URL
2. Test dark mode toggle
3. Try AI search: "What programming languages do you know?"
4. Check on mobile device
5. Test all links

🎉 **Congratulations! Your portfolio is live!**
