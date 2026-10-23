import { TextureLoader, type Texture } from 'three';

// Minimal suspense-cached texture loader — a drop-in for drei's useTexture for
// our single-URL case, without pulling the whole @react-three/drei bundle onto
// the landing-scene critical path. Behavior matches drei's: a plain
// THREE.TextureLoader (ImageLoader requests crossOrigin="anonymous", default
// texture settings), cached per URL and surfaced to React via Suspense.
type Entry = { promise: Promise<void>; texture?: Texture; error?: unknown };

const cache = new Map<string, Entry>();
const loader = new TextureLoader();

export function useSceneTexture(url: string): Texture {
  let entry = cache.get(url);
  if (!entry) {
    const e: Entry = {
      promise: new Promise<void>((resolve) => {
        loader.load(
          url,
          (tex) => {
            e.texture = tex;
            resolve();
          },
          undefined,
          (err) => {
            e.error = err;
            resolve();
          },
        );
      }),
    };
    entry = e;
    cache.set(url, entry);
  }
  if (entry.error) throw entry.error;
  if (!entry.texture) throw entry.promise;
  return entry.texture;
}
