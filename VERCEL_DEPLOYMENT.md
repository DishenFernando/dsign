# Deploy D-SIGN DESIGNERS to Vercel

## Option A: GitHub → Vercel (recommended)

```powershell
# Run from the website root in PowerShell
npm install
npm run build

git init
git add .
git commit -m "Initial D-SIGN DESIGNERS React website"
git branch -M main
# Add your actual GitHub repository URL, replacing the placeholder below:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Go to https://vercel.com/new, choose **Import Git Repository**, select your repository, and deploy with:

- **Framework Preset:** Vite
- **Root Directory:** `./` (unless files are in a subdirectory)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

No environment variables are required.

## Option B: Vercel CLI

```powershell
npm install
npm run build
npm install -g vercel
vercel login
vercel
vercel --prod
```

Choose the existing project or create a new project when prompted. Use Vite and `dist` output.

## Domain

In Vercel Project → Settings → Domains, add your owned domain. Follow the DNS instructions shown by Vercel, then test HTTPS, canonical URL, redirects and social previews.

## Post-deployment check

1. Open the live site on a phone and a desktop.
2. Test the menu, Work filters, FAQ accordion and all buttons.
3. Submit a **test** quotation and verify WhatsApp opens with the correct phone and text.
4. Verify mobile layouts, metadata, page speed, SSL and Vercel logs.
5. Update social metadata to use your actual domain.

**Note:** The project files are ready to deploy, but no live deployment or `npm install` was performed in the creation environment.
