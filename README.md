# Dourwe Leba Achille — Portfolio

A responsive, animated personal portfolio built with plain HTML, CSS and JavaScript — no build step, no framework, no backend required. Open `index.html` in a browser and it works.

```
portfolio/
├── index.html
├── README.md
├── assets/
│   ├── icons/favicon.svg
│   └── images/
│       ├── profile.svg              ← placeholder, replace with your photo
│       ├── projects/                ← project screenshots
│       └── designs/                 ← graphic design work
├── css/style.css
└── js/
    ├── main.js        ← navigation, animations, rendering logic
    ├── projects.js     ← EDIT THIS to add/remove projects
    └── designs.js       ← EDIT THIS to add/remove designs
```

## 1. Add a new project

Open `js/projects.js` and add an object to the `projects` array:

```js
{
  title: "My New Project",
  category: "AI",   // ALL | WEB | DESKTOP | MOBILE | AI | AUTOMATION | DATABASE
  image: "assets/images/projects/my-new-project.jpg",
  description: "Short description of the project.",
  technologies: ["Python", "AI", "PostgreSQL"],
  github: "https://github.com/ACHILLE0LEBA/my-new-project", // or "" if none
  demo: "https://my-new-project.example.com"                 // or "" if none
}
```

Save the file — the card appears automatically, and the "Projects Delivered" counter on the About section updates itself since it counts the array.

## 2. Add a new design

Same idea, in `js/designs.js`:

```js
{
  title: "My New Design",
  category: "BRANDING", // POSTER | SOCIAL MEDIA | BRANDING | LOGO | FLYER | ADVERTISEMENT | UI DESIGN | OTHER
  image: "assets/images/designs/my-new-design.jpg",
  description: "Description of the design.",
  software: "Adobe Illustrator" // optional
}
```

## 3. Replace your profile photo

Add your photo to `assets/images/profile.jpg` (or `.png`), then in `index.html` find:

```html
<!-- PLACE YOUR PROFILE IMAGE HERE -->
<img src="assets/images/profile.svg" ...>
```

and change `src` to your file's path, e.g. `assets/images/profile.jpg`.

## 4. Replace project images

Put the image in `assets/images/projects/` and update the `image` field of that project in `js/projects.js`. If an image fails to load, the site automatically falls back to the placeholder graphic, so nothing breaks while you're still adding photos.

## 5. Replace design images

Same as above, inside `assets/images/designs/` and `js/designs.js`.

## 6–8. Add Facebook, LinkedIn, Instagram

In `index.html`, search for these comments (they appear in both the Contact section and the Footer):

```html
<!-- ADD YOUR FACEBOOK LINK HERE -->
<!-- ADD YOUR LINKEDIN LINK HERE -->
<!-- ADD YOUR INSTAGRAM LINK HERE -->
```

Replace the `href="#"` on the matching `<a>` tag with your real profile URL.

## 9. Change your WhatsApp number

The WhatsApp link uses the format `https://wa.me/<countrycode><number>` (no `+`, no spaces). It currently appears in several places: the navbar, hero, contact section, footer, and the floating button. The fastest way to update all of them is to find-and-replace `237671089681` across `index.html` with your new number.

## 10. Add your email address

Search `index.html` for:

```html
<!-- ADD YOUR EMAIL ADDRESS HERE -->
<a href="mailto:youremail@example.com">youremail@example.com</a>
```

and replace both the `mailto:` link and the visible text with your real email.

## 11. Connect the contact form

The contact form currently only shows a confirmation message in the browser — no message is actually sent anywhere. To receive real messages, connect it to a service like [Formspree](https://formspree.io) or [EmailJS](https://www.emailjs.com), or point it at your own backend endpoint. The relevant code is in `js/main.js`, inside the `contactForm` submit handler.

## 12. Deploy the website

Since this is a static site with no backend, you can deploy it for free on any of these:

- **GitHub Pages** — push this folder to a GitHub repo, then enable Pages in the repo settings (Settings → Pages → deploy from the `main` branch).
- **Netlify** — drag and drop the `portfolio` folder onto [app.netlify.com/drop](https://app.netlify.com/drop).
- **Vercel** — run `vercel` inside this folder with the [Vercel CLI](https://vercel.com/cli), or import the repo from your Vercel dashboard.

No build step is required for any of these — they can serve `index.html` directly.

## Notes

- Dark mode is the default; the toggle in the navbar remembers the visitor's choice.
- The GitHub stats block on the GitHub section calls the public GitHub API and hides itself gracefully if the API is unreachable — the "Explore My GitHub" button always works regardless.
- All animations respect `prefers-reduced-motion` for visitors who have that setting enabled.
