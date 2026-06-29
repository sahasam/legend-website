# The deep-sea scene (`src/scene/`)

The WebGL atmosphere behind the site, built on **react-three-fiber**. Read this
before editing anything 3D — the scene is **deliberately restrained** (it serves
the writing, never competes with it). Default to *less* motion/geometry, not more.

## Stack, as used here

- `@react-three/fiber` — `<Canvas>` and the React→Three reconciler.
- `@react-three/drei` — helper components/abstractions.
- `@react-three/postprocessing` + `postprocessing` — `Bloom`, `Vignette`.
- `useFrame` — per-frame updates (camera lerp, particle drift, layer bob/sway).
- Motion is gated by `useReducedMotion`; respect it in any new scene code.

## Landing scene — `LandingScene.tsx`

A `<Canvas>` (camera `position [0,0,6]`, `fov 55`, `dpr [1,1.75]`) over a solid
`#020611` background + fog, composed of:

- **Three parallax depth layers** (`ParallaxImage`, tinted PNGs from `public/scene/`):
  - `background.png` — `z=-5`, dim, anchored top (the abyss).
  - `midground.png` — `z=-2.5`, jellyfish + coral.
  - `foreground.png` — `z=-0.8`, waves, closest/most legible.
  Each layer bobs/sways subtly via `useFrame`.
- **`Particles`** — GPU points as marine snow (`count={180}` in the landing scene;
  the component default is 220).
- **`Effects`** — `Bloom` + `Vignette` via `EffectComposer`.
- **`CameraRig`** — lerps the perspective camera toward normalized mouse position
  (`useMouseParallax`) for the parallax feel.

## Per-post hero accents — `src/scene/heroes/`

A post's frontmatter `hero:` can name a 3D accent resolved through the
`heroes` registry (`heroes/index.ts`). Currently registered: `jellyfish`. To add
one, drop a component under `heroes/` and register it in the map — it's lazy-loaded
so it only ships when a post uses it.

## Standalone creatures — `src/scene/creatures/`

`Nautilus`, `Anglerfish`, `MantaRay` — heavier 3D geometry used as accents on
specific routes, kept rare on purpose.

## Editing rules & gotchas

- **Background gradient lives on `html` (fixed).** Never add a `background-color` to
  `html`/`body` — it paints over this canvas and the page goes flat. (See the
  CSS/`tailwind.css` entry.)
- **Lock scroll per-route on full-frame scenes.** Mobile browser toolbars resize the
  fixed WebGL canvas mid-scroll → layer jitter. The landing route locks scroll for
  this reason; keep it for any new full-frame scene.
- **Headless verification of 3D routes** needs SwiftShader/ANGLE flags, or the
  canvas renders blank. And framer-motion entrances with a `delay` can screenshot as
  invisible under chrome-headless-shell — wait or capture a settled state.
