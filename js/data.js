/* ==========================================================================
   IMAGE DATA
   -----------------------------------------------------------------------
   This is the ONLY file you need to touch to add or change photos.

   1. Drop your image files into the matching folder inside /images/
   2. Add a line below with the filename and a title
   3. Save — the carousel, galleries and lightboxes update automatically

   Until a file exists at the given path, that spot will show a small
   placeholder tile so you can still see the layout.
   ========================================================================== */

// Homepage hero — full-screen image behind your name
const HERO_IMAGE = "images/hero/hero.jpg";

// About / Contact / Prints pages — shared darkened background
const PAGE_BG_IMAGE = "images/backgrounds/night-sky.jpg";

// About page — portrait of you
const ABOUT_PHOTO = "images/about/josh.jpg";

// Galleries hub — the 3 category cover tiles
const GALLERY_COVERS = {
  astrophotography: "images/gallery-covers/astrophotography.jpg",
  landscape: "images/gallery-covers/landscape.jpg",
  glowworms: "images/gallery-covers/glowworms.jpg",
};

// Homepage — looping carousel (12 images, mixed aspect ratios, same height)
const CAROUSEL_IMAGES = [
  { src: "images/carousel/01.jpg", title: "Aoraki Under the Milky Way" },
  { src: "images/carousel/02.jpg", title: "Church of the Good Shepherd" },
  { src: "images/carousel/03.jpg", title: "Lake Tekapo Reflections" },
  { src: "images/carousel/04.jpg", title: "Aurora Australis, Twizel" },
  { src: "images/carousel/05.jpg", title: "Roys Peak at Dawn" },
  { src: "images/carousel/06.jpg", title: "Milky Way over Pukaki" },
  { src: "images/carousel/07.jpg", title: "Fiordland Mist" },
  { src: "images/carousel/08.jpg", title: "Mackenzie Basin Starscape" },
  { src: "images/carousel/09.jpg", title: "Wanaka Tree, Blue Hour" },
  { src: "images/carousel/10.jpg", title: "Southern Alps Snowfall" },
  { src: "images/carousel/11.jpg", title: "Moeraki Boulders, Long Exposure" },
  { src: "images/carousel/12.jpg", title: "Galaxy Core Rising" },
];

// Gallery pages — one array per category. Add as many as you like.
const GALLERY_IMAGES = {
  astrophotography: [
    { src: "images/galleries/astrophotography/01.jpg", title: "Milky Way Core, Mackenzie Basin" },
    { src: "images/galleries/astrophotography/02.jpg", title: "Star Trails over Aoraki" },
    { src: "images/galleries/astrophotography/03.jpg", title: "Aurora Australis, Lake Tekapo" },
    { src: "images/galleries/astrophotography/04.jpg", title: "The Galactic Centre, Twizel" },
    { src: "images/galleries/astrophotography/05.jpg", title: "Church of the Good Shepherd at Night" },
    { src: "images/galleries/astrophotography/06.jpg", title: "Meteor over Pukaki" },
    { src: "images/galleries/astrophotography/07.jpg", title: "Orion Rising" },
    { src: "images/galleries/astrophotography/08.jpg", title: "Zodiacal Light, Mackenzie Country" },
    { src: "images/galleries/astrophotography/09.jpg", title: "Moonlit Alps" },
    { src: "images/galleries/astrophotography/10.jpg", title: "Southern Cross over the Basin" },
  ],
  landscape: [
    { src: "images/galleries/landscape/01.jpg", title: "Roys Peak, First Light" },
    { src: "images/galleries/landscape/02.jpg", title: "Fiordland in Mist" },
    { src: "images/galleries/landscape/03.jpg", title: "Lake Wanaka, Blue Hour" },
    { src: "images/galleries/landscape/04.jpg", title: "Southern Alps from the Air" },
    { src: "images/galleries/landscape/05.jpg", title: "Moeraki Boulders" },
    { src: "images/galleries/landscape/06.jpg", title: "Tekapo Autumn Colour" },
    { src: "images/galleries/landscape/07.jpg", title: "Canterbury High Country" },
    { src: "images/galleries/landscape/08.jpg", title: "West Coast Storm Light" },
    { src: "images/galleries/landscape/09.jpg", title: "Mackenzie Basin, Snow" },
  ],
  glowworms: [
    { src: "images/galleries/glowworms/01.jpg", title: "Glowworm Grotto" },
    { src: "images/galleries/glowworms/02.jpg", title: "Waitomo Cave Ceiling" },
    { src: "images/galleries/glowworms/03.jpg", title: "Bioluminescent Gully" },
    { src: "images/galleries/glowworms/04.jpg", title: "Cave Stream, Long Exposure" },
    { src: "images/galleries/glowworms/05.jpg", title: "Glowworm Constellation" },
    { src: "images/galleries/glowworms/06.jpg", title: "Forest Glow, South Island" },
  ],
};

const GALLERY_META = {
  astrophotography: {
    title: "Astrophotography",
    blurb: "Long-exposure images of the night sky, captured across New Zealand's darkest corners.",
  },
  landscape: {
    title: "Landscape",
    blurb: "New Zealand's dramatic scenery, from the Mackenzie Basin to the Fiordland coast.",
  },
  glowworms: {
    title: "Glowworms",
    blurb: "New Zealand's bioluminescent glowworms, photographed in their natural habitat.",
  },
};
