import { useEffect, useState } from "react";

/**
 * A hook that returns true when the component is mounted.
 * @returns A boolean that is `true` when the component is mounted.
 */
export function useLoaded() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => setLoaded(true), []);

  return loaded;
}
