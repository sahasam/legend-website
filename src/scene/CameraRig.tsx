import { useFrame, useThree } from '@react-three/fiber';
import { useSceneStore } from '../state/store';

type Props = {
  /** Max horizontal camera shift in world units at full mouse deflection. */
  shiftX?: number;
  /** Max vertical camera shift in world units. */
  shiftY?: number;
};

/**
 * Translates the camera based on normalized mouse position. Perspective then
 * produces depth-correct parallax for any plane in the scene — closer planes
 * move more in screen space, distant ones move less, automatically.
 */
export function CameraRig({ shiftX = 0.35, shiftY = 0.2 }: Props) {
  const reducedMotion = useSceneStore((s) => s.reducedMotion);
  const baseZ = useThree((s) => s.camera.position.z);

  useFrame((state) => {
    const { mouseX, mouseY } = useSceneStore.getState();
    if (reducedMotion) {
      state.camera.position.x += (0 - state.camera.position.x) * 0.06;
      state.camera.position.y += (0 - state.camera.position.y) * 0.06;
    } else {
      const targetX = mouseX * shiftX;
      const targetY = mouseY * shiftY;
      state.camera.position.x += (targetX - state.camera.position.x) * 0.05;
      state.camera.position.y += (targetY - state.camera.position.y) * 0.05;
    }
    state.camera.position.z = baseZ;
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}
