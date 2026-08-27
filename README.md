# Josh McGuigan Photography — Website

A static site (plain HTML/CSS/JS, no build step) built around an Apple-style
"liquid glass" look: frosted, blurred panels over a slow-drifting aurora
background, used for the nav, buttons, hero text, and forms.

## What changed in this round

- **Header fade-in on the homepage** — the wordmark (top-left) and the
  social icons (top-right) now both start hidden and gently blurred, and
  ease in slowly together as you scroll, instead of snapping in. On every
  other page they're just always visible.
- **About page** — reverted back to the original layout: your photo on
  the left, text on the right. (Everything else — the seamless background,
  the centred title above it — stayed as it was.)
- **Homepage carousel**
  - Rebuilt the scrolling engine so the hover-to-slow-down effect is a
    smooth, gradual ease rather than a jump — the old version changed a
    CSS animation's speed directly, which snaps; this one runs off
    `requestAnimationFrame` and eases the speed each frame instead.
  - Images are still all cropped to the same **height** and left at
    their natural **width**, so a mix of portrait, square and wide shots
    will visibly read as mixed widths in one row (this also applies to
    the gallery grid pages). The placeholder tiles now vary in width too,
    so you can see this working even before real photos are added.
- **Buttons above the carousel** — more vertical breathing room (their
  own clearly separated block) and a much wider gap between the two
  buttons.
- **Scroll cue** — removed the "Scroll" label, kept the arrow.
- **Homepage name** — "Josh McGuigan" is no longer inside a glass box;
  the letters themselves are now the glass — see-through, blurring
  whatever's behind them, same as the rest of the liquid-glass system.
  Set to the display font's boldest weight with a subtle stroke for
  extra presence. (In older browsers that don't support this specific
  effect, it gracefully falls back to solid, fully legible text.)
- **Footer** — the Site Index column is now centred.
- **Favicon + social share previews** — see below.

## What a "social share preview" is

When someone pastes your site's link into iMessage, WhatsApp, Slack,
Facebook, X/Twitter, LinkedIn etc., most of those apps don't just show the
bare link — they show a small preview card with a title, a short
description, and an image, so it looks inviting rather than just a plain
blue link. That card isn't automatic: it's built from a handful of meta
tags in the page's `<head>` (the "Open Graph" tags, `og:title`,
`og:description`, `og:image`, plus matching `twitter:` tags for X). I've
added these to every page, pointing at a preview image I generated at
`images/meta/social-preview.jpg` — swap that file for a real photo (ideally
1200×630px) whenever you'd like a different one, no code changes needed.

## Favicon

The small icon that shows up in a browser tab, bookmarks, and on a phone's
home screen if someone saves the site. I've added a simple placeholder
mark (a ring with two dots, in your teal/violet accent colours) at
`images/meta/` in all the sizes browsers ask for. Swap any of these files
for your own logo mark whenever you have one — same filenames, same
folder, nothing else to change:

```
images/meta/
  favicon.ico            → classic favicon
  favicon-16.png / favicon-32.png   → browser tab icon
  apple-touch-icon.png    → iOS "Add to Home Screen" icon
  icon-192.png / icon-512.png       → Android / PWA icon
  social-preview.jpg      → the link-preview image described above
```

## Adding your images — the only file you need to edit

Open **`js/data.js`**. Every image on the site (hero, carousel, gallery
covers, gallery grids, about photo, page backgrounds) is listed there with a
path and a title. To add or change a photo:

1. Drop the image file into the matching folder inside `/images/`
   (folders already exist for you — see the map below).
2. Update the filename/title in `js/data.js` (or add a new line to a list —
   the carousel and gallery grids just loop over whatever's in the array,
   so you can add as many images as you like).
3. Save and refresh. That's it — no other file needs to change.

Until a real file exists at a given path, that spot shows a small labelled
placeholder tile so you can still preview the layout.

```
images/
  hero/                    → homepage full-screen hero image
  backgrounds/             → shared darkened background for About/Contact/Prints
  about/                   → your portrait on the About page
  gallery-covers/          → the 3 cover tiles on the Galleries hub
  carousel/                → the 12 homepage carousel images
  galleries/astrophotography/
  galleries/landscape/
  galleries/glowworms/     → the full gallery grids
  meta/                    → favicon + social-preview image, see above
```

**Image tips:**
- Carousel and gallery-grid images are cropped to the same *height* only —
  upload them at whatever aspect ratio they naturally are; wide images will
  end up wider, tall ones narrower, exactly as intended.
- Keep files reasonably web-sized (long edge ~2000px, compressed JPEGs) so
  the site stays fast — full-resolution camera exports will load slowly.

## Pages

| Page | File |
|---|---|
| Home | `index.html` |
| Galleries hub | `galleries.html` |
| Astrophotography gallery | `gallery-astrophotography.html` |
| Landscape gallery | `gallery-landscape.html` |
| Glowworms gallery | `gallery-glowworms.html` |
| About | `about.html` |
| Contact | `contact.html` |
| Prints | `prints.html` |

The nav and footer markup is duplicated at the top/bottom of every page
(there's no templating step on GitHub Pages) — if you ever change the nav
links or footer, update it in each HTML file. Everything else (image
lists, animations, lightbox, carousel behaviour) lives centrally in
`js/data.js` and `js/main.js`, so you only edit those once.

## The contact & print forms

GitHub Pages only serves static files — it can't receive form submissions
on its own. Right now, submitting either form just shows a "Sent" state in
the browser for demonstration, but the message isn't actually going
anywhere. The easiest options to make them real:

- **[Formspree](https://formspree.io)** — add `action="https://formspree.io/f/yourFormID"`
  and `method="POST"` to the `<form class="glass-form">` tag in
  `contact.html` / `prints.html`.
- **Netlify Forms** (if you move hosting to Netlify) — add a `netlify`
  attribute to the form.

Let me know which you'd like and I can wire it up properly.

## Deploying to GitHub Pages

1. Create a new GitHub repository and push everything in this folder to it
   (keep the folder structure as-is — `index.html` needs to sit at the
   repository root).
2. In the repo, go to **Settings → Pages**, set **Source** to your default
   branch (e.g. `main`) and root folder.
3. GitHub will give you a live URL a minute or two later.
4. Once you have a real domain, update the `og:url` / `og:image` /
   `twitter:image` addresses in each page's `<head>` — right now they
   point at a placeholder `joshmcguiganphotography.com` address.

## Notes / possible next steps (flagging, not adding without asking)

- **Real email + social links** — swap the placeholder handles
  (`josh@joshmcguiganphotography.com`, `instagram.com/`, etc.) for your
  real ones in the header/footer of each page.
- **Analytics** — if you want to track visits (e.g. Plausible or GA).
- **A real form backend**, as above.
- **A real logo mark** to replace the placeholder favicon whenever you
  have one designed.
