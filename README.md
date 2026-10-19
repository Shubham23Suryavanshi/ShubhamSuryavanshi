# Shubham Suryavanshi: Portfolio

A static portfolio site (HTML, CSS, JavaScript). No build step and no dependencies.

## Structure

```
shubham-portfolio/
├── index.html              Page markup and sections
├── README.md
└── assets/
    ├── css/style.css       All styles, light and dark themes
    ├── js/main.js          Terminal, projects, blog quests, avatar, animations
    └── images/
        ├── avatar.jpg      Reacting avatar (your photo)
        └── favicon.png
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Deploy

Upload the whole folder to GitHub Pages, Netlify, or an Apache document root (for example `/var/www/html/`).

## Edit your content

- **Projects, skills, blog posts, logos:** the data arrays in `assets/js/main.js` (`P`, `S`, `B`, `L`).
- **Experience, education, contact details:** `index.html`.
- **Resume link:** the "Download resume" button in `index.html`.
- **Avatar photo:** replace `assets/images/avatar.jpg` (square, about 176 px).
- **Colours and fonts:** CSS variables at the top of `assets/css/style.css`.

## Notes

- On a normal host, blog likes are saved per browser (localStorage). Shared likes and comments need a backend.
- Blog uploads are switched off (`UPLOAD_ON=false` in `main.js`) until a backend is added.
- Fonts load from Google Fonts, so they need an internet connection.


git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/Shubham23Suryavanshi/ShubhamSuryavanshi
git push -u origin main