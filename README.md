# Mother's Birthday Animated Tribute

A cinematic birthday tribute website built with HTML, CSS, vanilla JavaScript, and GSAP.

## Project structure

- `index.html` — page structure and all eight scenes
- `style.css` — premium cinematic styling and responsive layout
- `script.js` — scene sequencing, particle effects, music toggle, and interactions
- `assets/photos/` — replaceable mother/family photos
- `assets/music/emotional-music.mp3` — optional background music

## Customize names and text

Edit the `config` object near the top of `script.js`:

```js
const config = {
  motherName: "Lakshmi Bhavani",
  childName: "Vaibhav",
  themeTitle: "Lakshmi Bhavani's Birthday Movie",
};
```

You can also replace the default letter text there.

## Run locally in VS Code

1. Open the project folder in VS Code.
2. Install the Live Server extension if needed.
3. Right-click `index.html` and choose `Open with Live Server`.
4. Or run a simple static server:

```bash
cd d:/notes/mother-birthday
python -m http.server 8000
```

Then open `http://localhost:8000` in the browser.

## Notes

- The project gracefully handles missing images or music.
- The page attempts to start the music when it opens. Browsers that block autoplay start it on the first page interaction instead.
- The design is responsive and supports reduced motion settings.

## Photo replacement

Replace files inside `assets/photos/` with your own images using the same names:

- `best-mom.jpg`
- `mom1.jpg`
- `mom2.jpg`
- `mom3.jpg`
- `family1.jpg`
- `childhood.jpg`

## Music

Place your own emotional instrumental track in:

`assets/music/emotional-music.mp3`

If the file is missing, the app will keep working without breaking the experience.
