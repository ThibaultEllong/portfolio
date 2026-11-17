// How much the settled front photo grows. All ring scales stay at or below 1 / ENLARGE,
// so the enlarged photo reaches exactly full size and is never upscaled (which would blur it).
export const ENLARGE = 1.6;

// Position of a photo on the ring: angle 0 is front and center (lowest), π is the back (highest).
export function ringPose(angle: number) {
  const depth = (Math.cos(angle) + 1) / 2;
  return {
    x: Math.sin(angle),
    y: Math.cos(angle),
    scale: (0.4 + 0.6 * depth) / ENLARGE,
    depth,
    z: Math.round(depth * 100),
  };
}
