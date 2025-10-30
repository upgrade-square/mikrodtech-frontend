# MikrodTech Static Website

A simple static website for **MikrodTech** built with HTML, CSS, and JavaScript. Uses theme colors **white, blue, and black only**.

---

## 📂 Project Structure
```
project-folder/
│
├── index.html     # Main HTML file
├── style.css      # Stylesheet (white, blue, black theme)
├── app.js         # JavaScript (nav toggle + smooth scrolling)
├── logo.png       # MikrodTech logo
└── readme.md      # Documentation
```

---

## 🚀 How to Use

1. Place all files (`index.html`, `style.css`, `app.js`, `logo.png`) in the same folder.
2. Open **index.html** in any modern web browser.
3. The site should load with:
   - Responsive header + navigation.
   - Hero section with logo, tagline, and CTA.
   - About, Services, and Contact sections.
   - Smooth scrolling between sections.

---

## 🖌️ Customization

- **Logo:** Replace `logo.png` with your own logo (keep the filename the same, or update `index.html`).
- **Colors:** The color scheme is defined in `style.css` using white `#ffffff`, blue `#0066cc`, and black `#000000`.
- **Contact Info:** In `index.html`, update:
  ```html
  <p><strong>Email:</strong> you@example.com</p>
  <p><strong>Phone:</strong> +254 7XX XXX XXX</p>
  <p><strong>LinkedIn:</strong> <a href="#" target="_blank">MikrodTech on LinkedIn</a></p>
  ```
- **Form:** The contact form uses a `mailto:` action as a fallback. For production use, integrate with a backend or form service.

---

## 📱 Features
- Responsive navigation menu with mobile toggle.
- Smooth scrolling between sections.
- Modern card layout for services.
- Clean white/blue/black design.

---

## 📄 License
This project is free for personal and business use under the MIT License.
