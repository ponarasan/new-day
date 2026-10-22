# For Grace — A New Beginning 💗

A cinematic, interactive love letter made for **Grace Delighty** on her first day as a **Software Developer at Capgemini**.

This is not a portfolio or a generic greeting card. It is a small, self-contained universe: a moonlit opening, a sunrise celebration, a sealed letter that writes itself, two scenes to explore, and a promise written in the stars.

---

## The experience

1. **The opening** — a midnight sky, drifting hearts, and a cinematic reveal.
2. **Her moment** — a sunrise celebration and a glass achievement card.
3. **The letter** — a 3D envelope, wax seal, and a personal letter revealed line by line.
4. **A new beginning** — an arched sunrise, flowers, and a quiet message for the road ahead.
5. **A sky full of promises** — tap the constellation stars to open a promise.
6. **Always** — a closing note, a little heart burst, and a way back to the beginning.

Details throughout: floating petals, golden dust, glowing stars, a cursor glow, chapter navigation, scroll progress, film grain, reduced-motion support, and layouts designed for phones as well as desktops.

---

## Tech stack

- **React 18 + Vite**
- **Tailwind CSS**
- **Framer Motion**
- **Lucide React**
- Locally bundled **Cormorant Garamond**, **Great Vibes**, and **Manrope** fonts
- Hand-built CSS/SVG artwork — no external image dependencies

---

## Run it locally

You will need **Node.js 18 or newer** and npm.

```bash
npm install
npm run dev
```

Open the local URL printed in the terminal (usually `http://localhost:5173`).

To check the production build locally:

```bash
npm run build
npm run preview
```

> On Windows, run these commands in **PowerShell**, **Command Prompt**, or the VS Code terminal from the project folder.

---

## Personalize it

Nearly all of the words live in one place:

```text
src/config.js
```

There you can edit:

- Grace's name, role, and company
- The opening lines and button label
- The celebration copy
- Every paragraph of the letter
- The constellation promises
- The finale and footer

### Change the sender

The sender appears in the letter signature and in a few closing lines. You can set it without touching the code:

1. Copy `.env.example` to `.env.local`.
2. Update the value:

```env
VITE_SENDER_NAME="Your Name"
```

3. Restart `npm run dev` (or rebuild for deployment).

If you deploy with Vercel or Netlify, add `VITE_SENDER_NAME` as an environment variable in the project settings before the build. If it is not set, the site falls back to **"Your Favorite Person."**

> The site intentionally uses text only for Capgemini — there is no corporate logo anywhere.

---

## Deploy for free

The project is a standard static Vite site. Both Vercel and Netlify work with zero routing configuration.

### Vercel

**Option A — from GitHub (recommended)**

1. Create a new repository on GitHub and push this folder.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel will detect **Vite**. Confirm:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Add `VITE_SENDER_NAME` under **Environment Variables** if you want a custom sender.
5. Click **Deploy**.

**Option B — from the terminal**

```bash
npx vercel
```

Follow the prompts. For production:

```bash
npx vercel --prod
```

### Netlify

**Option A — drag and drop**

1. Run `npm run build`.
2. Open [app.netlify.com/drop](https://app.netlify.com/drop).
3. Drag the generated `dist` folder onto the page.

For a custom sender, create `.env.local` with `VITE_SENDER_NAME` **before** running the build.

**Option B — from GitHub**

1. Push this folder to a GitHub repository.
2. In Netlify, choose **Add new site → Import an existing project**.
3. Select the repository. The included `netlify.toml` already sets:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Add `VITE_SENDER_NAME` under **Site configuration → Environment variables** if desired.
5. Deploy.

**Option C — from the terminal**

```bash
npm run build
npx netlify-cli deploy --prod --dir=dist
```

---

## Project structure

```text
wish/
├─ public/
│  └─ favicon.svg
├─ src/
│  ├─ components/
│  │  ├─ effects/        # stars, petals, dust, floating hearts
│  │  ├─ Botanicals.jsx  # hand-drawn roses and florals
│  │  ├─ Chrome.jsx      # chapter rail, scroll bar, cursor glow
│  │  ├─ Moon.jsx
│  │  ├─ OpeningExperience.jsx
│  │  └─ Ui.jsx
│  ├─ sections/
│  │  ├─ scenes/         # the two journey scenes
│  │  ├─ Celebration.jsx
│  │  ├─ Letter.jsx
│  │  └─ Finale.jsx
│  ├─ App.jsx
│  ├─ config.js          # all personal copy
│  ├─ index.css          # palette, glass, paper, animations
│  └─ main.jsx
├─ .env.example
├─ netlify.toml
├─ tailwind.config.js
└─ vite.config.js
```

---

## A few thoughtful details

- **Reduced motion:** animations are softened or skipped when the visitor's system asks for less movement.
- **Keyboard friendly:** the envelope, letter reveal, constellation stars, and navigation are real buttons and links.
- **Screen readers:** the full letter is available as hidden text while the visible copy types itself out.
- **No tracking, no backend, no external assets:** the whole experience is static, private, and free to host.
- **Responsive:** tested from small phones through desktop, including tablet layouts.

---

Made with love, a few sleepless nights, and a very full heart. 💌
