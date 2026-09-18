# Portfolio UX/UI refresh

## V3 mobile + interactive update

- Added a mobile quick-navigation dock for About, Experience, Projects, and Contact.
- Added scroll progress indicator.
- Improved mobile spacing, card sizing, touch scrolling, and safe-area handling.
- Added interactive project detail modal.
- Added keyboard support for project cards and Escape-to-close modal.
- Kept the existing bilingual EN/TH rendering and project sorting.
- Added GitHub Pages Actions workflow at `.github/workflows/pages.yml`.
- No build step is required; this is a static GitHub Pages site.

## GitHub Pages deployment

1. Replace the files in the repository with this folder's contents.
2. Push to the `main` branch.
3. In GitHub, open **Settings → Pages** and select **GitHub Actions** as the source if it is not already selected.
4. The workflow will deploy the site automatically after each push to `main`.

The existing `assets/`, `data/`, and portfolio content are preserved.
