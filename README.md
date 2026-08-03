# Siripak Chattanupakorn — Professional Portfolio

A responsive, static professional portfolio website designed in a navy and blue theme. It is ready for automatic deployment with GitHub Pages.

## Project structure

```text
siripak-portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── assets/
│   ├── cert-uncertainty.jpg
│   ├── favicon.svg
│   ├── profile.png
│   ├── staff-engagement.png
│   └── workshop-passport.png
├── .nojekyll
├── 404.html
├── index.html
├── script.js
├── styles.css
└── README.md
```

## Deploy with GitHub Pages

### Method A — upload through the GitHub website

1. Sign in to GitHub and create a new **Public** repository, for example `siripak-portfolio`.
2. Open the repository and choose **Add file → Upload files**.
3. Upload every file and folder in this project. Make sure the hidden `.github` folder is included.
4. Commit the files to the `main` branch.
5. Open **Settings → Pages**.
6. Under **Build and deployment → Source**, select **GitHub Actions**.
7. Open the **Actions** tab and wait for `Deploy portfolio to GitHub Pages` to finish.
8. The site URL will be shown in the successful workflow and in **Settings → Pages**.

Typical URL:

```text
https://YOUR-USERNAME.github.io/siripak-portfolio/
```

### Method B — command line

```bash
git init
git add .
git commit -m "Create professional portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/siripak-portfolio.git
git push -u origin main
```

Then set **Settings → Pages → Source → GitHub Actions**.

## Update the website

- Edit personal content and project descriptions in `index.html`.
- Edit colors, spacing and responsive layouts in `styles.css`.
- Edit activities and interactions in `script.js`.
- Replace images inside `assets/` while keeping the same filenames, or update their paths in `index.html`.

Every push to `main` automatically redeploys the website.

```bash
git add .
git commit -m "Update portfolio content"
git push
```

## Optional custom domain

1. Open **Settings → Pages → Custom domain**.
2. Enter the domain or subdomain you own.
3. Configure DNS with your domain provider using the records GitHub shows.
4. Enable **Enforce HTTPS** after DNS verification completes.

## Important privacy check

The website excludes national ID, house registration, transcript details and phone number. Before publishing, review all Google Drive links and set only the portfolio files you want visitors to see to **Anyone with the link → Viewer**.

## Local preview

You can double-click `index.html`, or run a local server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.
