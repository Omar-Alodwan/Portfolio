# 🚀 Professional Portfolio

Modern, responsive portfolio website with AI-powered search using Google Gemini API and Netlify serverless functions.

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR-BADGE-ID/deploy-status)](https://app.netlify.com/sites/YOUR-SITE-NAME/deploys)

## ✨ Features

- 🎨 **Dark/Light Mode** - Toggle with theme persistence
- 🤖 **AI-Powered Search** - Ask questions about my experience using Google Gemini
- 📱 **Fully Responsive** - Works on all devices
- ⚡ **Smooth Animations** - Scroll-triggered effects and transitions
- 🔐 **Secure API Key** - Using Netlify serverless functions (no key exposed)
- 🎯 **Interactive UI** - Animated skill bars and hover effects
- 📄 **Downloadable Resume** - PDF format

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **AI Integration**: Google Gemini API
- **Backend**: Netlify Serverless Functions
- **PDF Processing**: PDF.js
- **Hosting**: Netlify
- **Version Control**: Git & GitHub

## 🚀 Quick Start

### Prerequisites

- Node.js (optional, for local development)
- Git
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Omar-Alodwan/Portfolio.git
   cd Portfolio
   ```

2. **Set up configuration** (optional for local dev)
   ```bash
   cp config.template.js config.js
   # Add your API key to config.js
   ```

3. **Run locally**
   ```bash
   # Option 1: Simple HTTP server
   python -m http.server 8000
   
   # Option 2: Using Netlify CLI (to test serverless functions)
   npm install
   npx netlify dev
   ```

4. **Open in browser**
   ```
   http://localhost:8000
   ```

## 🌐 Deployment to Netlify

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Your message"
git push origin main
```

### Step 2: Deploy to Netlify

1. Go to [netlify.com](https://www.netlify.com/)
2. Sign up/login with GitHub
3. Click **"Add new site"** → **"Import from Git"**
4. Select your repository
5. Netlify auto-detects settings (leave as default)
6. Click **"Deploy site"**

### Step 3: Add Environment Variable

1. In Netlify dashboard: **Site settings** → **Environment variables**
2. Add variable:
   ```
   Key: GEMINI_API_KEY
   Value: [your Google Gemini API key]
   ```
3. Go to **Deploys** → **Trigger deploy**

### Step 4: Customize Domain (Optional)

1. **Site settings** → **Domain management**
2. Click **"Edit site name"** or **"Add custom domain"**

🎉 **Done!** Your portfolio is live!

## 📁 Project Structure

```
Portfolio/
├── index.html                    # Main HTML file
├── script.js                     # JavaScript functionality
├── styles.css                    # All styles & themes
├── config.template.js            # API key template (safe)
├── netlify.toml                  # Netlify configuration
├── netlify/
│   └── functions/
│       └── search.js             # Serverless function (secure)
├── package.json                  # Dependencies (optional)
├── .gitignore                    # Git ignore rules
├── .env.example                  # Environment template
└── README.md                     # This file
```

## 🔐 Security

- ✅ API key stored in Netlify environment variables (never in code)
- ✅ Serverless function handles API calls (key stays on server)
- ✅ `.env` and `config.js` are gitignored
- ✅ Users never see or need API key

## 🎨 Customization

### Update Content

1. **Personal Info**: Edit `index.html`
   - Name, bio, contact information
   - Skills and percentages
   - Project details

2. **Styling**: Edit `styles.css`
   - Colors: CSS variables (lines 2-26)
   - Fonts, spacing, animations

3. **CV Context**: Create `cv-context.txt` (gitignored)
   - Add additional information for AI search
   - Not committed to repo for privacy

### Color Scheme

Edit CSS variables in `styles.css`:

```css
:root {
    --bg-primary: #ffffff;
    --text-primary: #1a1a1a;
    --accent-color: #0066cc;
    /* ... more variables */
}
```

## 🔄 Continuous Deployment

Every push to `main` branch automatically deploys to Netlify:

```bash
git add .
git commit -m "Update portfolio"
git push origin main
# Site updates automatically in ~1 minute
```

## 🐛 Troubleshooting

### AI Search Not Working

1. Check Netlify environment variable is set
2. Verify `GEMINI_API_KEY` is correct
3. Check Netlify function logs: **Functions** → **search** → **Logs**
4. Trigger manual deploy after adding key

### Styles Look Broken

1. Clear browser cache (Ctrl+F5)
2. Check browser console for errors
3. Verify all CSS/JS files are committed

### Deployment Fails

1. Check Netlify deploy logs
2. Verify `netlify.toml` is in root directory
3. Ensure `netlify/functions/search.js` exists

## 📊 Performance

- ⚡ Fast load time (~1s)
- 🎯 Optimized assets
- 📱 Mobile-first responsive design
- ♿ Accessible (WCAG AA compliant)

## 🤝 Contributing

This is a personal portfolio, but feel free to:
- Fork for your own use
- Report issues
- Suggest improvements

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

**Omar Alodwan**
- GitHub: [@Omar-Alodwan](https://github.com/Omar-Alodwan)
- Email: omaralodwan1999@gmail.com
- Location: Berlin, Germany

---

⭐ **Star this repo** if you found it helpful!

Built with ❤️ using modern web technologies
